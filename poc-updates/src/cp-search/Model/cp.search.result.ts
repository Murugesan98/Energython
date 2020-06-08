
import { ObjectType,Field } from "@nestjs/graphql";

@ObjectType()
export class CpSearchResult{
    @Field()
     Price               : string;
    @Field()
     Owner_name          : String;
    @Field()
     Connector_type      : String;
    @Field()
     Current_type        : String;
    @Field(type=>[String])
     Amentities          : String[];
    @Field()
    Location             : string;
    @Field()
    CpId                 : String;      
}

