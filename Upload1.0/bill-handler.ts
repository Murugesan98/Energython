const { ApolloServer, gql } = require('apollo-server-lambda');

import {resolvers} from './src/resolvers/bill-details-resolver'

const typeDefs = gql`
type BillDetails {
    Consumption     : String
    Duration        : String
    UnitPrice       : String
    ConsumptionCost : String
    Tax             : String
    Discount        : String
    TotalBill       : String
}
type Query {
  bill(CpId: String, Start_date: String, End_date: String, From: String, To: String, Ratedpower: Int, Price: Int): BillDetails
}
`;


const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    tracing: true
    
  });

exports.graphqlHandler = server.createHandler();