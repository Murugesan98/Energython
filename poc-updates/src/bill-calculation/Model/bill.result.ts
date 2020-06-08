
import { ObjectType,Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Bill{
    
            @Field(type=>Int)
            Consumption     : number;
            @Field(type=>Int)
            Duration        : number;
            @Field(type=>Int)
            UnitPrice       : number;
            @Field(type=>Int)
            ConsumptionCost : number;
            @Field(type=>Int)
            Tax             : number;
            @Field(type=>Int)
            Discount        : number;
            @Field(type=>Int)
            TotalBill       : number;
    
}