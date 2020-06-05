import {EncryptionAndDecryption} from '../EncryptionAndDecryption';
import {putData} from '../DynamoOperations';
import { v4 as uuid } from 'uuid';

let encryptAndDecrypt:EncryptionAndDecryption  = new EncryptionAndDecryption();

const userTable = process.env.TableName_user_cp;

const connectionTable = process.env.TableName_cp_detail;

export const resolvers = {

    Query: {
        get: (root, args) => {
          console.log(root+ args);
        }
      },
      Mutation: {
        addCpOwnerRegistration :  async(_, data) => {
        
          let password:any= encryptAndDecrypt.encrypt(data.input.new_password);
          let availablity:any = JSON.parse(data.input.availablity);
          let key:string = uuid();
             const userData = {
                TableName: userTable,
                Item: {
                    ID               :  key, 
                    Username         :  data.input.username,
                    Mobile           :  data.input.mobile,
                    Mail             :  data.input.mail,
                    Password         :  password,
                   
                }
             };
             const connectionData = {
                TableName: connectionTable,
                Item: {
                    ID               :  key, 
                    Connector_type   :  data.input.connector_type,
                    Current_type     :  data.input.current_type,
                    Availablity_from :  availablity.from,
                    Availablity_to   :  availablity.to,
                    Price            :  data.input.price,
                    Amenities        :  data.input.amenities,
                    Address          :  data.input.Location
                }
             };
          
          
        await putData.putItem(userData);
        await putData.putItem(connectionData);  
    
    
            
              return {
                 Id               :  data.input.id, 
                 username         :  data.input.username,
                 mobile           :  data.input.mobile,
                 mail             :  data.input.mail,
                 availablity      :  data.input.availablity
              }
        }
      }
    
}