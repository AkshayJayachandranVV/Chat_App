import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),DatabaseModule,UserModule],
  controllers: [AppController],
  providers: [AppService,AppGateway],
})
export class AppModule {}
