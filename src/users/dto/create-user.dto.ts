import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { AuthProvider } from '../schemas/user.schema';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsEnum(AuthProvider)
  provider?: AuthProvider;

  @IsOptional()
  @IsString()
  providerId?: string;
}
