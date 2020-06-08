import {Module} from '@nestjs/common';
import {CpSearchService} from './cp-user-service';
import {CpSearchResolvers} from './cp-user-resolvers'

@Module({
  providers: [CpSearchResolvers,CpSearchService],
})
export class CpSearchModule {}


