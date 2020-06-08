import {Module} from '@nestjs/common';
import {CpUserService} from './cp-user-service';
import {CpUserResolvers} from './cp-user-resolvers'

@Module({
  providers: [CpUserResolvers,CpUserService],
  
})
export class CpUserModule {}


