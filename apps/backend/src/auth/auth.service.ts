import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterInput } from './dto/inputs/register.input';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/inputs/login.input';
import { OAuthUserDto } from './dto/oauth-user.dto';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import * as crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async register(registerInput: RegisterInput) {
    const { email, password, firstName, lastName } = registerInput;

    const existingUser = await this.prisma.authUser.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassowrd = await bcrypt.hash(password, 10);

    return this.prisma.$transaction(async (prisma) => {
      const authUser = await prisma.authUser.create({
        data: {
          email,
          password: hashedPassowrd,
          isVerified: false,
        },
      });
      const user = await prisma.user.create({
        data: {
          id: authUser.id,
          firstName,
          lastName,
        },
      });
      const token = this.generateToken(authUser.id);
      const refreshToken = await this.generateRefreshToken(authUser.id, prisma);

      const verificationToken = this.jwtService.sign(
        { sub: authUser.id, purpose: 'email-verification' },
        { expiresIn: '24h' },
      );

      await this.emailService.sendVerificationEmail(email, verificationToken);

      return {
        accessToken: token,
        refreshToken,
        user,
      };
    });
  }

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;

    const authUser = await this.prisma.authUser.findUnique({
      where: { email },
      include: { user: true },
    });

    if (!authUser || !authUser.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, authUser.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentiaals');
    }

    const token = this.generateToken(authUser.id);
    const refreshToken = await this.generateRefreshToken(authUser.id);

    return {
      accessToken: token,
      refreshToken,
      user: authUser.user,
    };
  }

  async validateOAuthLogin(oauthUserDto: OAuthUserDto) {
    const { email, provider, providerId, firstName, lastName, profileImg } =
      oauthUserDto;
    const authUser = await this.prisma.authUser.findUnique({
      where: { email },
      include: { user: true },
    });
    if (!authUser) {
      return this.prisma.$transaction(async (prisma) => {
        const newAuthUser = await prisma.authUser.create({
          data: {
            email,
            provider,
            providerId,
            isVerified: true,
          },
        });
        const user = await prisma.user.create({
          data: {
            id: newAuthUser.id,
            firstName,
            lastName,
            profileImg,
          },
        });
        const token = this.generateToken(newAuthUser.id);
        return {
          accessToken: token,
          user,
        };
      });
    } else {
      if (!authUser.provider || !authUser.providerId) {
        await this.prisma.authUser.update({
          where: { id: authUser.id },
          data: {
            provider,
            providerId,
            isVerified: true,
          },
        });
      }
      if (profileImg && !authUser.user.profileImg) {
        await this.prisma.user.update({
          where: { id: authUser.id },
          data: {
            profileImg,
          },
        });
      }
      const token = this.generateToken(authUser.id);
      return {
        accessToken: token,
        user: authUser.user,
      };
    }
  }
  async sendVerificationEmail(userId: string, email: string) {
    const token = this.jwtService.sign(
      { sub: userId, purpose: 'email-verification' },
      { expiresIn: '24h' },
    );

    const verificationUrl = `${this.configService.get('API_URL')}/api/auth/verify-email/${token}`;

    console.log(`Email verification URL for ${email}: ${verificationUrl}`);

    return true;
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      if (payload.purpose !== 'email-verification') {
        throw new UnauthorizedException('Token inválido');
      }

      await this.prisma.authUser.update({
        where: { id: payload.sub },
        data: { isVerified: true },
      });

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado', error);
    }
  }

  async sendPasswordResetEmail(email: string) {
    const authUser = await this.prisma.authUser.findUnique({
      where: { email },
    });

    if (!authUser) {
      return true;
    }

    const token = this.jwtService.sign(
      { sub: authUser.id, purpose: 'password-reset' },
      { expiresIn: '1h' },
    );

    const resetUrl = `${this.configService.get('API_URL')}/api/auth/reset-password/${token}`;

    console.log(`Password reset URL for ${email}: ${resetUrl}`);

    return true;
  }

  validateResetToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      if (payload.purpose !== 'password-reset') {
        throw new UnauthorizedException('Token inválido');
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado', error);
    }
  }

  async resetPassword(token: string, newPassword: string) {
    const payload = this.validateResetToken(token);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.authUser.update({
      where: { id: payload.sub },
      data: { password: hashedPassword },
    });

    return { success: true };
  }

  async validateUser(userId: string) {
    return this.usersService.findOne(userId);
  }

  generateToken(userId: string) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(
    userId: string,
    prismaClient: PrismaClient | any = this.prisma,
  ) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    const token = crypto.randomBytes(40).toString('hex');

    await prismaClient.refreshToken.create({
      data: {
        token,
        expiresAt,
        isRevoked: false,
        userId,
      },
    });

    return token;
  }

  async refreshAccessToken(refreshToken: string) {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (
      !tokenRecord ||
      tokenRecord.isRevoked ||
      tokenRecord.expiresAt < new Date()
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessToken = this.generateToken(tokenRecord.userId);

    return { accessToken };
  }

  async logout(refreshToken: string) {
    const tokenExists = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenExists) {
      return true;
    }

    await this.prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { isRevoked: true },
    });

    return true;
  }
}
