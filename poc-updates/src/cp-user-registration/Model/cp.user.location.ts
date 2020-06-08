
import { ObjectType,Field } from "@nestjs/graphql";

@ObjectType()
export class CpUserLocation{
 
    connector_type     : String[];
    @Field() 
    current_type       : String;
    @Field() 
    availability       : string;
    @Field()
    price              : String;
    @Field(type=>[String])
    amentities         : String[];
    @Field()
    Location            :string;
}