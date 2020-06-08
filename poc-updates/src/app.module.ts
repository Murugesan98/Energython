import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvUserModule } from './ev-user-registration/ev-user-module';
import { GraphQLModule } from '@nestjs/graphql';
import {ApiModule} from './api-module';
import {CpUserModule} from './cp-user-registration/cp-user-module';
import { CpSearchModule } from './cp-search/cp-user-module';

@Module({
  imports: [
    EvUserModule,
    CpUserModule,
    CpSearchModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
