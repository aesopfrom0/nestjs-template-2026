import { Module, DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { AppleStrategy } from './strategies/apple.strategy';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    const providers = [AuthService, JwtStrategy];

    // Google OAuth가 설정되어 있으면 GoogleStrategy 추가
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
      providers.push(GoogleStrategy);
    }

    // Apple Sign In이 설정되어 있으면 AppleStrategy 추가
    if (process.env.APPLE_CLIENT_ID) {
      providers.push(AppleStrategy);
    }

    return {
      module: AuthModule,
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('jwt.secret'),
            signOptions: { expiresIn: '7d' },
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers,
      exports: [AuthService],
    };
  }
}
