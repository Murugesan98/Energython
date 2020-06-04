
const moment = require('moment');
const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();
const BillTable = process.env.TableName_usage_detail;
import { v4 as uuid } from 'uuid';

export const resolvers = {


    Query: {
        bill: async(_,data) =>{
        
        let start = data.Start_date + ' ' + data.From;
        let end = data.End_date + ' ' + data.To;
        let format =  ["YYYY-MM-DD hh:mm A"];
        let startDate = moment(start, format);
        let endDate = moment(end, format);

        let ratedPower = data.Ratedpower;
        let duration = endDate.diff(startDate)/3600000;

        let price = data.Price;
        let consumption = ratedPower * duration /1000;
        let chargingCost = consumption * price / 100;
        let tax = chargingCost * 20/100;
        let amount = chargingCost + tax;

        const params = {
            TableName: BillTable,
            Item: {
                ID               :  uuid(), 
                CpId             :  data.cpid,
                StartDate        :  data.Start_date,
                EndDate          :  data.End_date,
                DurationCharged  :  duration,
                Consumption      :  consumption,
                ChargingCost     :  chargingCost,
                tax              :  tax,
                amount           :  amount
           }
         };
         console.log(params);
          await dynamodb.put(params).promise();
        return{
            Consumption     : consumption + ' ' + 'KWh',
            Duration        : duration + ' ' + 'hours',
            UnitPrice       : price + ' ' + 'p per kWh',
            ConsumptionCost : chargingCost + ' ' + '\u20ac',
            Tax             : tax + ' ' + '\u20ac',
            Discount        : '0' + ' ' + '\u20ac',
            TotalBill       : amount + ' ' + '\u20ac'
        }
     }   
        }
}



