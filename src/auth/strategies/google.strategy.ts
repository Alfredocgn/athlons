import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { OAuthUserDto } from '../dto/oauth-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, name, emails, photos } = profile;
    const oauthUser = new OAuthUserDto({
      email: emails[0].value,
      provider: 'google',
      providerId: id,
      firstName: name.givenName || 'User',
      lastName: name.familyName || '',
      profileImg: photos && photos.length > 0 ? photos[0].value : undefined,
    });

    const user = await this.authService.validateOAuthLogin(oauthUser);
    done(null, user);
  }
}
