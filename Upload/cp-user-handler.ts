
import {resolvers} from './src/resolvers/cp_registration_resolver';
const {ApolloServer,gql} = require('apollo-server-lambda');


const typeDefs = gql`


type CpOwner {
  Id                 : String
  username           : String
  mobile             : Int
  mail               : String
  new_password       : String
  confirm_password   : String
  connector_type     : [String]
  current_type       : String
  availablity        : String          
  price              : String
  amenities          : [String]
  Location           : String
}

type Query {
  get(user_name: String): CpOwner!
}


input AddCpOwner {
    Id                 : String
    username           : String!
    mobile             : Int!
    mail               : String!
    new_password       : String!
    confirm_password   : String!
    connector_type     : [String]!
    current_type       : String!
    availablity        : String!    
    price              : String!
    amenities          : [String]!
    Location           : String
}

type Mutation {
  addCpOwnerRegistration(input: AddCpOwner): CpOwner
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