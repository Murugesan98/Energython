import { Injectable } from '@nestjs/common';
import {CpSearchResult} from './Model/cp.search.result';
import {CpSearch} from './Model/cp.search';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = process.env.TableName_user_cp;
const connectionTable = process.env.TableName_cp_detail;


@Injectable()
export class CpSearchService {
       constructor() {}

  async SearchCp(searchCp: CpSearch): Promise<CpSearchResult> {
    console.dir(searchCp);
    console.log(searchCp);
    console.log(connectionTable);
    console.log(userTable);

    let loc: string[]  = searchCp.Location.split(',');
              
    const params = {
        TableName :  'cp-details',
        FilterExpression: 'Availablity_from >= :Availablity_from AND Availablity_to <= :Availablity_to AND contains(#Address, :Address)',
        ExpressionAttributeNames: {
        "#Address": "Address",
    },
      ExpressionAttributeValues: {   
       ':Availablity_from': searchCp.Start_date,
       ':Availablity_to': searchCp.End_date,
       ':Address' : loc[0]
      }   
   }
console.log(params);
const cpConnectionDetails:any =  await dynamodb.scan(params).promise();

//console.log(cpConnectionDetails);

let item:String[] = searchCp.Type; 
item = item.sort();

const connectorTypeDetails:any = cpConnectionDetails.Items.map(element => {

 let connector = element.Connector_type;

 if(connector.some(e => item.indexOf(e) == 0)){
   
  return element;
 }
});



var result:any  = connectorTypeDetails[0]; 

const ID:string = result.ID;

var para:any =  {
  TableName: userTable,
  Key:{
    ID
}
};
console.log(para);
let userDetails:any = await dynamodb.get(para).promise();

 result["username"] = userDetails.Item.Username;
console.log(result); 

   return {
    Price           : result.Price,
    Owner_name      : result.username,
    Connector_type  : result.Connector_type,
    Current_type    : result.Current_type,
    Amentities      : result.Amenities,
    Location        : result.Address,
    CpId            : result.ID

   }
  }
}
