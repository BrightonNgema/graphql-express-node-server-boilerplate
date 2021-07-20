const { ApolloServer, gql } = require("apollo-server");
const { makeExecutableSchema } = require("graphql-tools");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
require("now-env");

const { utils } = require("./utils");
const { models } = require("./models");

const Url  = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';

mongoose
  .connect(Url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Err", err));

const schema = makeExecutableSchema({
  resolvers: utils.resolvers,
  typeDefs: utils.typeDefs
});

const server = new ApolloServer({
  schema,
  introspection: true, // enables introspection of the schema
  playground: true, // enables the actual playground
  cors: {
    origin: '*',			// <- allow request from all domains
    credentials: true
  },
  context: ({ req, res}) => {
    const token = req.headers.authorization
    if (token !== null) {
      try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = currentUser;
        return { ...models, currentUser };
      } catch (error) {
        return {...models};
      }
    }
  }
});

// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
