
const { ApolloServer, gql } = require('apollo-server-lambda');

import {resolvers} from './src/resolvers/cp_search_resolvers'

const typeDefs = gql`
type Query {
  search( Start_date: String, End_date: String, From: String, To: String, Type:[String], Location:String): CpSearchResult
}
type CpSearch {
  Location           :  String
  Start_date         :  String
  End_date           :  String
  From               :  String
  To                 :  String
  Type               : [String]
}
type CpSearchResult {
    Owner_name      : String
    Connector_type  : [String]
    Price           : String
    Current_type    : String
    Amentities      : [String]
    Location        : String
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