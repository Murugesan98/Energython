import {EncryptionAndDecryption} from '../EncryptionAndDecryption';
import {putData} from '../DynamoOperations';
import { v4 as uuid } from 'uuid';

let encryptAndDecrypt:EncryptionAndDecryption  = new EncryptionAndDecryption();

const userTable = process.env.TableName_user_ev;

const cardTable = process.env.TableName_user_ev_cards;

export const resolvers = {

    Query: {
      get: (root, args) => {
        console.log(root+ args);
      }
    },
    Mutation: {
      addEvOwnerRegistration :  async(_, data) => {
      
        let password = encryptAndDecrypt.encrypt(data.input.new_password);
    
           const userDetails = {
              TableName: userTable,
              Item: {
                  ID               :  uuid(), 
                  User_name        :  data.input.user_name,
                  Mobile_number    :  data.input.mobile_number,
                  Mail             :  data.input.mail,
                  Password         :  password
              }
           };
           const cardDetails = {
              TableName: cardTable,
              Item: {
                  ID               :  uuid(),
                  Name_on_card     :  data.input.name_on_card,
                  Card_no          :  data.input.card_no, 
                  Expiry_date      :  data.input.expiry_date
              }
           };
            
      
              await putData.putItem(userDetails);
              await putData.putItem(cardDetails);
          
    
        
          
            return {
               Id               :  data.input.id, 
               user_name        :  data.input.user_name,
               mobile_number    :  data.input.mobile_number,
               mail             :  data.input.mail
            }
      }
    }
    };