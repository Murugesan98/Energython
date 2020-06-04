

const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

  export const putData = {
    async putItem(params){

      await dynamo.put(params).promise()
      .then(function(data) {
      console.log(data);
   })
   .catch(function(err) {
     console.log(err);
   })
  }
};







