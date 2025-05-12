import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatUsers } from "./entities/users.entitiy";

@Module({
    imports : [
        ConfigModule.forRoot({
            isGlobal : true
        }),
        TypeOrmModule.forRootAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : (configService : ConfigService) => ({
                type : 'postgres',
                host : configService.get<string>('DB_HOST'),
                port : parseInt(configService.get<string>('DB_PORT' , '5432')),
                username : configService.get('DB_USERNAME'),
                password : configService.get('DB_PASSWORD'),
                database : configService.get('DB_DATABASE'),
                entities : [ChatUsers],
                synchronize : true
            })
        })
    ]
})

export class DatabaseModule {}