import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { validateSchema } from 'src/config/validate-schema';
import { DatabaseModule } from './providers/database/database.module';
import { UsersModule } from './domains/users/users.module';
import { AuthsModule } from './domains/auths/auths.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      load: [configuration],
      validationSchema: validateSchema(),
      validationOptions: {
        abortEarly: true,
      },
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
