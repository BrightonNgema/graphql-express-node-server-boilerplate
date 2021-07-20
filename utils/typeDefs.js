module.exports = typeDefs = `
####################### Inputs ##############################

input UserInput {
  firstname: String! 
  lastname: String! 
  password: String!
  email: String!
}

input PaymentInput{
  token:String
  amount:Int
}


####################### Types ##############################

type Token {
    token: String!
}

type User {
  _id: ID
  firstname: String! 
  lastname: String! 
  email: String!
  createdDate:String
}


####################### Queries ##############################
  # The "Query" type is the root of all GraphQL queries.
    type Query {
        getCurrentUser: User
    }

####################### Mutations ##############################
  # (A "Mutation" type will be covered later on.)
    type Mutation {
        signinUser(email: String!, password: String!): Token
        signupUser(input:UserInput): Token
        pay(input:PaymentInput!):Boolean
    }

`;