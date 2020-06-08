import { Injectable } from '@nestjs/common';
import { AddCpUserType } from './Model/mutation.schema';
import { EncryptionAndDecryption } from '../common/EncryptionAndDecryption';
import { v4 as uuid } from 'uuid';
import {CpUserLocation} from './Model/cp.user.location';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = process.env.TableName_user_cp;

const connectionTable = process.env.TableName_cp_detail;
let encryptAndDecrypt:EncryptionAndDecryption  = new EncryptionAndDecryption();

@Injectable()
export class CpUserService {


  constructor() {

  }

  async createCpUser(CpUser: AddCpUserType):Promise<AddCpUserType> {
    let password:any= encryptAndDecrypt.encrypt(CpUser.new_password);
    let availablity:any = JSON.parse(CpUser.availability);
    let key:string = uuid();
       const userData = {
          TableName: userTable,
          Item: {
              ID               :  key, 
              Username         :  CpUser.username,
              Mobile           :  CpUser.mobile,
              Mail             :  CpUser.mail,
              Password         :  password,
             
          }
       };
       const connectionData = {
          TableName: connectionTable,
          Item: {
              ID               :  key, 
              Connector_type   :  CpUser.connector_type,
              Current_type     :  CpUser.current_type,
              Availablity_from :  availablity.from,
              Availablity_to   :  availablity.to,
              Price            :  CpUser.price,
              Amenities        :  CpUser.amentities,
              Address          :  CpUser.Location
          }
       };
    
    
    await dynamodb.put(userData).promise();
    await dynamodb.put(connectionData).promise();  


      
        return CpUser;
    }
    async findCpUser(location:string):Promise<CpUserLocation>{
      const params = {
        TableName : connectionTable,
      
        FilterExpression: 'contains(#Address, :Address)',
        ExpressionAttributeNames: {
          "#Address": "Address",
      },
        ExpressionAttributeValues: {   
         ':Address' : location
        }   
      }

      return await dynamodb.scan(params).promise();

    }
}
