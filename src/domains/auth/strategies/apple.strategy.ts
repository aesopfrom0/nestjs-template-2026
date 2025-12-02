import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Apple Sign In은 클라이언트에서 받은 ID Token을 검증하는 방식으로 구현
// 실제 구현은 apple-signin-auth 라이브러리 사용
@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        return req.body?.idToken || req.query?.idToken;
      },
      // Apple의 공개 키로 검증
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        // apple-signin-auth로 검증 로직 구현 필요
        done(null, configService.get<string>('apple.clientId'));
      },
      issuer: 'https://appleid.apple.com',
      audience: configService.get<string>('apple.clientId'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return {
      providerId: payload.sub,
      email: payload.email,
    };
  }
}
