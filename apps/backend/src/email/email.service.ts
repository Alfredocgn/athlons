// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    if (this.configService.get('NODE_ENV') !== 'production') {
      const testAccount = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log(`Cuenta de prueba Ethereal creada: ${testAccount.user}`);
      console.log(`URL de Ethereal: https://ethereal.email/login`);
      console.log(`Credenciales: ${testAccount.user} / ${testAccount.pass}`);
    } else {
      this.transporter = nodemailer.createTransport({
        host: this.configService.get('EMAIL_HOST'),
        port: this.configService.get('EMAIL_PORT'),
        secure: this.configService.get('EMAIL_SECURE', false),
        auth: {
          user: this.configService.get('EMAIL_USER'),
          pass: this.configService.get('EMAIL_PASSWORD'),
        },
      });
    }
  }

  async sendVerificationEmail(email: string, token: string) {
    const info = await this.transporter.sendMail({
      from: `"AthlonRun" <${this.configService.get('EMAIL_FROM', 'noreply@athlonrun.com')}>`,
      to: email,
      subject: 'Verifica tu cuenta',
      text: `Por favor verifica tu cuenta accediendo a: ${this.configService.get('API_URL')}/api/auth/verify-email/${token}`,
      html: this.getVerificationEmailTemplate(token),
    });

    if (this.configService.get('NODE_ENV') !== 'production') {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Vista previa del email: %s', previewUrl);
      return previewUrl;
    }

    return true;
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const info = await this.transporter.sendMail({
      from: `"AthlonRun" <${this.configService.get('EMAIL_FROM', 'noreply@athlonrun.com')}>`,
      to: email,
      subject: 'Restablece tu contraseña',
      text: `Restablece tu contraseña accediendo a: ${this.configService.get('API_URL')}/api/auth/reset-password/${token}`,
      html: this.getPasswordResetEmailTemplate(token),
    });

    if (this.configService.get('NODE_ENV') !== 'production') {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Vista previa del email: %s', previewUrl);
      return previewUrl;
    }

    return true;
  }

  private getVerificationEmailTemplate(token: string): string {
    const verificationUrl = `${this.configService.get('API_URL')}/api/auth/verify-email/${token}`;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333;">Bienvenido a AthlonRun</h1>
        </div>
        
        <div style="margin: 30px 0; color: #555; line-height: 1.5;">
          <p>¡Gracias por registrarte! Para completar tu registro, necesitamos verificar tu dirección de correo electrónico.</p>
          <p>Por favor, haz clic en el botón de abajo para verificar tu cuenta:</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
            Verificar mi cuenta
          </a>
        </div>
        
        <div style="margin: 30px 0; color: #555; line-height: 1.5;">
          <p>Si no puedes hacer clic en el botón, copia y pega el siguiente enlace en tu navegador:</p>
          <p style="word-break: break-all; color: #2196F3;">${verificationUrl}</p>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e1e1e1; color: #777; font-size: 12px;">
          <p>Si no solicitaste esta verificación, puedes ignorar este mensaje.</p>
        </div>
      </div>
    `;
  }

  private getPasswordResetEmailTemplate(token: string): string {
    const resetUrl = `${this.configService.get('API_URL')}/api/auth/reset-password/${token}`;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333;">Restablece tu contraseña</h1>
        </div>
        
        <div style="margin: 30px 0; color: #555; line-height: 1.5;">
          <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
          <p>Haz clic en el botón de abajo para crear una nueva contraseña:</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #2196F3; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
            Restablecer contraseña
          </a>
        </div>
        
        <div style="margin: 30px 0; color: #555; line-height: 1.5;">
          <p>Si no puedes hacer clic en el botón, copia y pega el siguiente enlace en tu navegador:</p>
          <p style="word-break: break-all; color: #2196F3;">${resetUrl}</p>
          <p style="font-weight: bold;">Este enlace expirará en 1 hora.</p>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e1e1e1; color: #777; font-size: 12px;">
          <p>Si no solicitaste este cambio, puedes ignorar este mensaje y tu contraseña permanecerá sin cambios.</p>
        </div>
      </div>
    `;
  }
}
