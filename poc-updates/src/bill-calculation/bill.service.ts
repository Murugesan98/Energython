import { Injectable } from '@nestjs/common';
import { BillInputs } from './Model/input.type';
import { Bill } from './Model/bill.result';
import { v4 as uuid } from 'uuid';

const moment = require('moment');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = process.env.TableName_user_cp;
const connectionTable = process.env.TableName_cp_detail;


@Injectable()
export class BillService {
       constructor() {}

  async generateBill(inputs : BillInputs): Promise<Bill> {


    let start = inputs.StartDate + ' ' + inputs.From;
        let end = inputs.EndDate + ' ' + inputs.To;
        let format =  ["YYYY-MM-DD hh:mm A"];
        let startDate = moment(start, format);
        let endDate = moment(end, format);

        let ratedPower = inputs.Ratedpower;
        let duration = endDate.diff(startDate)/3600000;

        let price = inputs.Price;
        let consumption = ratedPower * duration /1000;
        let chargingCost = consumption * price / 100;
        let tax = chargingCost * 20/100;
        let amount = chargingCost + tax;

        const params = {
            TableName: 'Bill_details',
            Item: {
                ID               :  uuid(), 
                CpId             :  inputs.CpId,
                StartDate        :  inputs.StartDate,
                EndDate          :  inputs.EndDate,
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
            Consumption     : consumption,
            Duration        : duration,
            UnitPrice       : price,
            ConsumptionCost : chargingCost,
            Tax             : tax,
            Discount        : 0,
            TotalBill       : amount
        }
     }   


    
    
  }

