
import { InputType,Field } from "@nestjs/graphql";

@InputType()
export class CpSearch{
    @Field()
    Start_date : String;
    @Field()
    End_date   : String;
    @Field()
    From       : String;
    @Field()
    To         : String;
    @Field(type=>[String])
    Type       : String[];
    @Field()
    Location   : String;
    
}