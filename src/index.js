import { GraphQLServer } from 'graphql-yoga';

// 5 Scalar Types in GraphQl - String, Boolean, Int, Float, ID
// NonScalar type would be objects or arrays

// Type Definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String age: Int profession: String): String!
    me: User!
    post: Post!
  }

type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
}
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      console.log(args);

      if (args.name && args.age && args.profession) {
        return `Hello my name is ${args.name}, I am ${args.age}, and I work as a ${args.profession}.`;
      } else {
        return 'Sorry no name';
      }
    },
    me() {
      return {
        id: '1234098',
        name: 'Kevin',
        email: 'kevin@gmail.com',
        age: '35'
      };
    },
    post() {
      return {
        id: '1234098',
        title: 'Beginner GraphQL',
        body: 'First body of the post',
        published: true
      };
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
