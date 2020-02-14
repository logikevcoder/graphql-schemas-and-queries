import { GraphQLServer } from 'graphql-yoga';

// 5 Scalar Types in GraphQl - String, Boolean, Int, Float, ID
// NonScalar type would be objects or arrays

// Type Definitions (schema)
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int!
    rating: Float!
    inStock: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    title() {
      return 'Macbook Pro';
    },
    price() {
      return 2300.0;
    },
    releaseYear() {
      return 2020;
    },
    rating() {
      return 88.9;
    },
    inStock() {
      return true;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up');
});
