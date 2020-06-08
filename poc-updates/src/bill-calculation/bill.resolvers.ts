
import {Args, Query, Resolver} from '@nestjs/graphql';
import {BillService} from './bill.service';
import {Bill} from './Model/bill.result';
import {BillInputs} from './Model/input.type';



@Resolver()
export class BillResolvers {
  constructor(private  billService: BillService) {}


@Query(()=> Bill)
async generateBill(@Args('input') input: BillInputs)
{
  return await this.billService.generateBill(input);
}

}
