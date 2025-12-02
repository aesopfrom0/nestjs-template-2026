import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  APPLE = 'apple',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string; // Optional for OAuth users

  @Prop()
  name?: string;

  @Prop()
  profileImage?: string;

  @Prop({ type: String, enum: AuthProvider, default: AuthProvider.LOCAL })
  provider: AuthProvider;

  @Prop()
  providerId?: string; // OAuth provider user ID

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  // MongoDB _id를 id로 변환하는 헬퍼
  toJSON() {
    const obj = this.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    delete obj.password; // 비밀번호는 응답에서 제거
    return obj;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
