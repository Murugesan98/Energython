
const connectionTable = process.env.TableName_cp_detail;
const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();
const userTable = process.env.TableName_user_cp;




export const resolvers:any = {

    Query: {
       search: async(_,data) =>{
              let loc:string[]  = data.Location.split(',');
              
        const params = {
            TableName : connectionTable,
      
          FilterExpression: 'Availablity_from >= :Availablity_from AND Availablity_to <= :Availablity_to AND contains(#Address, :Address)',
          ExpressionAttributeNames: {
            "#Address": "Address",
        },
          ExpressionAttributeValues: {   
           ':Availablity_from': data.Start_date,
           ':Availablity_to': data.End_date,
           ':Address' : loc[0]
          }   
       }
  
   const cpConnectionDetails:any =  await dynamodb.scan(params).promise();

   if(!cpConnectionDetails)
   {
     return {Location: "Not charge point found in the location!!"};
   }
   let item:String[] = data.Type; 
   item = item.sort();
  
  const connectorTypeDetails:any = cpConnectionDetails.Items.map(element => {
    
     let connector = element.Connector_type;
    
     if(connector.some(e => item.indexOf(e) == 0)){
       
      return element;
     }
  });
  
  
  if(connectorTypeDetails){
  var result:any  = connectorTypeDetails[0]; 
  }

  if(result){
  const ID:string = result.ID;
  
    var para:any =  {
      TableName: userTable,
      Key:{
        ID
    }
    };
    console.log(para);
  }
  
  else
  {
    return { 
      Location        : "The charge type is not found in the location!!"
    };
  }
  
  
     let userDetails:any = await dynamodb.get(para).promise();
    
     result["username"] = userDetails.Item.Username;
     
  
  return{
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
  }