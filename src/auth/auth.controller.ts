import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  googleAuthCallback(@Req() req, @Res() res: Response) {
    const { accessToken } = req.user;
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authentication Success</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
          .token-box { background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px auto; max-width: 80%; word-break: break-all; }
          button { padding: 10px; margin: 10px; cursor: pointer; }
        </style>
      </head>
      <body>
        <h1>Authentication Successful!</h1>
        <p>Your access token:</p>
        <div class="token-box">${accessToken}</div>
        
        <p>Copy this token to use in the GraphQL playground.</p>
        <button onclick="copyToken()">Copy Token</button>
        <a href="/graphql"><button>Go to GraphQL Playground</button></a>
        
        <script>
          function copyToken() {
            navigator.clipboard.writeText('${accessToken}')
              .then(() => alert('Token copied to clipboard!'))
              .catch(err => console.error('Error copying token:', err));
          }
        </script>
      </body>
      </html>
    `);

    // const clientUrl = this.configService.get(
    //   'CLIENT_URL',
    //   'http://localhost:5173',
    // );
    // res.redirect(`${clientUrl}/auth/callback?token=${accessToken}`);
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string, @Res() res: Response) {
    try {
      await this.authService.verifyEmail(token);
      // const clientUrl = this.configService.get(
      //   'CLIENT_URL',
      //   'http://localhost:5173',
      // );

      // Si no hay frontend, muestra un mensaje de éxito
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Email verificado</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .success { color: green; }
            .container { max-width: 600px; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="success">¡Email verificado correctamente!</h1>
            <p>Tu cuenta ha sido verificada. Ya puedes iniciar sesión.</p>
            <a href="/graphql">Ir al Playground de GraphQL</a>
          </div>
        </body>
        </html>
      `);
    } catch (error) {
      console.log(error);
      res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Error de verificación</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .error { color: red; }
            .container { max-width: 600px; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="error">Error de verificación</h1>
            <p>El enlace no es válido o ha expirado.</p>
            <a href="/graphql">Ir al Playground de GraphQL</a>
          </div>
        </body>
        </html>
      `);
    }
  }

  @Get('reset-password/:token')
  resetPasswordForm(@Param('token') token: string, @Res() res: Response) {
    // Verificar el token primero (opcional, para mejor UX)
    try {
      this.authService.validateResetToken(token);

      // Si el token es válido, muestra el formulario
      res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Restablecer Contraseña</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .form-container { max-width: 400px; margin: 0 auto; }
          input, button { width: 100%; padding: 10px; margin: 10px 0; }
          .error { color: red; display: none; }
        </style>
      </head>
      <body>
        <div class="form-container">
          <h1>Crear Nueva Contraseña</h1>
          <form id="resetForm">
            <input type="hidden" id="token" value="${token}">
            <div>
              <label for="password">Nueva Contraseña</label>
              <input type="password" id="password" required minlength="8">
            </div>
            <div>
              <label for="confirmPassword">Confirmar Contraseña</label>
              <input type="password" id="confirmPassword" required>
            </div>
            <div class="error" id="errorMsg">Las contraseñas no coinciden</div>
            <button type="submit">Cambiar Contraseña</button>
          </form>
          <div id="successMsg" style="display:none; color:green;">
            ¡Contraseña actualizada con éxito! Puedes iniciar sesión ahora.
          </div>
        </div>
        
        <script>
          document.getElementById('resetForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const token = document.getElementById('token').value;
            const errorMsg = document.getElementById('errorMsg');
            
            if (password !== confirmPassword) {
              errorMsg.style.display = 'block';
              return;
            }
            
            errorMsg.style.display = 'none';
            
            try {
              const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password })
              });
              
              if (response.ok) {
                document.getElementById('resetForm').style.display = 'none';
                document.getElementById('successMsg').style.display = 'block';
              } else {
                const data = await response.json();
                errorMsg.textContent = data.message || 'Error al restablecer la contraseña';
                errorMsg.style.display = 'block';
              }
            } catch (error) {
              errorMsg.textContent = 'Error de conexión';
              errorMsg.style.display = 'block';
            }
          });
        </script>
      </body>
      </html>
    `);
    } catch (error) {
      console.log(error);
      res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Enlace inválido</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .error { color: red; }
        </style>
      </head>
      <body>
        <h1 class="error">Enlace inválido o expirado</h1>
        <p>El enlace para restablecer tu contraseña no es válido o ha expirado.</p>
        <p>Por favor, solicita un nuevo enlace de restablecimiento.</p>
      </body>
      </html>
    `);
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetData: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetData.token,
      resetData.newPassword,
    );
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refreshAccessToken(body.refreshToken);
  }

  @Post('logout')
  async logout(@Body() body: { refreshToken: string }) {
    return this.authService.logout(body.refreshToken);
  }
}
