import { ObjectType,Field } from "@nestjs/graphql";

@ObjectType()
export class CpUserType{
    @Field()
    Id                 : String;
    @Field() 
    username           : String;
    @Field() 
    mobile             : String;
    @Field() 
    mail               : String;
    @Field() 
    new_password       : String;
    @Field() 
    confirm_password   : String;
    @Field(type=>[String]) 
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

