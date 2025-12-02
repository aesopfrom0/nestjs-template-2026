import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { idTransformPlugin } from 'src/common/plugins/id-transform.plugin';

export type UserDocument = User &
  Document & {
    id: string; // virtual 필드
  };

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
}

export const UserSchema = SchemaFactory.createForClass(User);

// Plugin 적용: _id를 id로 자동 변환
UserSchema.plugin(idTransformPlugin);

// toJSON 시 비밀번호 제거
UserSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc: any, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password; // 비밀번호는 응답에서 제거
    return ret;
  },
});
