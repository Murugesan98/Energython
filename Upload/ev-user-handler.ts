import {resolvers} from './src/resolvers/ev_registration_resolver';
const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = gql`
type EvOwner {
  Id                 : String!
  user_name          : String!
  mobile_number      : Int!
  mail               : String!
  new_password       : String!
  confirm_password   : String!
  name_on_card       : String!
  card_no            : Int!
  expiry_date        : String!
}

type Query {
  get(user_name: String): EvOwner!
}

input AddEvOwner {
  Id                 : String,  
  user_name          : String,
  mobile_number      : Int,
  mail               : String,
  new_password       : String,
  confirm_password   : String,
  name_on_card       : String,
  card_no            : Int,
  expiry_date        : String
}

type Mutation {
  addEvOwnerRegistration(input: AddEvOwner): EvOwner
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