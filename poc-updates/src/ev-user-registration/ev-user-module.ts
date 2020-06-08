import { DynamicModule, Module, Scope } from '@nestjs/common';
import {EvUserService} from './ev-user-service';
import {EvUserResolvers} from './ev-user-resolvers'

@Module({
  providers: [EvUserResolvers,EvUserService],
})
export class EvUserModule {}


