import { Injectable } from '@nestjs/common';
import { EvUserType} from './Model/evuser-schema';
import {AddEvUserType} from './Model/mutation.schema';
import { EncryptionAndDecryption } from '../common/EncryptionAndDecryption';
import { v4 as uuid } from 'uuid';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
let encryptAndDecrypt:EncryptionAndDecryption  = new EncryptionAndDecryption();
const userTable = process.env.TableName_user_ev;

const cardTable = process.env.TableName_user_ev_cards;

@Injectable()
export class EvUserService {

 
  constructor() {}

  async createEvUser(EvUser: AddEvUserType): Promise<AddEvUserType> {
    let password = encryptAndDecrypt.encrypt(EvUser.new_password);
    let key:string = uuid();
    
           const userDetails = {
              TableName: userTable,
              Item: {
                  ID               :  key, 
                  User_name        :  EvUser.user_name,
                  Mobile_number    :  EvUser.mobile_number,
                  Mail             :  EvUser.mail,
                  Password         :  password
              }
           };
           const cardDetails = {
              TableName: cardTable,
              Item: {
                  ID               :  key,
                  Name_on_card     :  EvUser.name_on_card,
                  Card_no          :  EvUser.card_no, 
                  Expiry_date      :  EvUser.expiry_date
              }
           };
            
      
              await dynamodb.put(userDetails);
              await dynamodb.put(cardDetails);
     return EvUser;
    
   }

  async findUser( Mail: string): Promise<String> {
    let params = {
      TableName: userTable,
      Key: {
         Mail      
       }
    } 
    const user = await dynamodb.get(params).promise()
       if(user)
          return "The user exists";
       return "The user does not exists";
   }
}
