import {Module} from '@nestjs/common';
import {BillService} from './bill.service';
import {BillResolvers} from './bill.resolvers'

@Module({
  providers: [BillResolvers,BillService],
})
export class BillModule {}


