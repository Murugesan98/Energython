
const connectionTable = process.env.TableName_cp_detail;
const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();
const userTable = process.env.TableName_user_cp;




export const resolvers:any = {

    Query: {
       search: async(_,data) =>{
      
        const params = {
            TableName : connectionTable,
      
          FilterExpression: 'Availablity_from >= :Availablity_from AND Availablity_to <= :Availablity_to AND Address =:Address',
          ExpressionAttributeValues: {   
           ':Availablity_from': data.Start_date,
           ':Availablity_to': data.End_date,
           ':Address' : data.Location
          }   
       }
  
   const cpConnectionDetails:any =  await dynamodb.scan(params).promise();
   if(!cpConnectionDetails)
   {
     return {Location: "Not Found!!"};
   }
   let item:String[] = data.Type; 
   item = item.sort();
  
  const connectorTypeDetails:any = cpConnectionDetails.Items.map(element => {
     let connector = element.Connector_type.sort();
     if(connector.some(e => item.indexOf(e)>0)){
      return element;
     }
  });
  
  
  if(connectorTypeDetails){
  var result:any  = connectorTypeDetails[0]; 
  }
  if(result){
  let ID:string = result.ID;
    var para:any =  {
      userTable,
      Key:{
        ID
    }
    };
  }
  else
  {
    return { 
      Location        : "NO result found!!"
    };
  }
  
  
     let userDetails:any = await dynamodb.get(para).promise();
     result["username"] = userDetails.username;
  
  return{
    Price           : result.Price,
    Owner_name      : result.Username,
    Connector_type  : result.Connector_type,
    Current_type    : result.Current_type,
    Amentities      : result.Amenities,
    Location        : result.Location,
    CpId            : result.Id
  
  }
  
  
      }
     
    }
  }