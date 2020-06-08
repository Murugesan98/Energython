
import { InputType,Field,Int } from "@nestjs/graphql";

@InputType()
export class BillInputs{
@Field()
ID               :  string;
@Field() 
CpId             :  string;
@Field()
StartDate        :  string;
@Field()
EndDate          :  string;
@Field()
From: String;
@Field()
To: String;
@Field(type => Int)
Ratedpower       : number;
@Field(type => Int)
Price            : number;
}
 