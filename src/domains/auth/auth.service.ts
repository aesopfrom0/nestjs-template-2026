import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/domains/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthProvider, User } from 'src/domains/users/schemas/user.schema';
import bcrypt from 'bcrypt';
import { getDocumentId } from 'src/common/utils/mongodb.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
      name: registerDto.name,
      provider: AuthProvider.LOCAL,
    });

    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async googleLogin(profile: any) {
    let user = await this.usersService.findByProviderAndId(
      AuthProvider.GOOGLE,
      profile.providerId,
    );

    if (!user) {
      user = await this.usersService.create({
        email: profile.email,
        name: profile.name,
        profileImage: profile.profileImage,
        provider: AuthProvider.GOOGLE,
        providerId: profile.providerId,
      });
    }

    return this.generateTokens(user);
  }

  async appleLogin(profile: any) {
    let user = await this.usersService.findByProviderAndId(
      AuthProvider.APPLE,
      profile.providerId,
    );

    if (!user) {
      user = await this.usersService.create({
        email: profile.email,
        provider: AuthProvider.APPLE,
        providerId: profile.providerId,
      });
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: User) {
    const userId = getDocumentId(user);
    const payload = { sub: userId, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: userId,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
      },
    };
  }
}
