import { GraphQLServer } from 'graphql-yoga';

// 5 Scalar Types in GraphQl - String, Boolean, Int, Float, ID
// NonScalar type would be objects or arrays

// Demo user data
const users = [
  {
    id: '1',
    name: 'John',
    email: 'john@gmail.com',
    age: 18
  },
  {
    id: '2',
    name: 'Chris',
    email: 'chris@gmail.com'
  },
  {
    id: '3',
    name: 'Sarah',
    email: 'sarah@gmail.com',
    age: 25
  }
];

const posts = [
  {
    id: '1',
    title: 'Title 1',
    body: 'This is the first post body',
    published: false
  },
  {
    id: '2',
    title: 'Title 2',
    body: 'This is the second post body',
    published: true
  },
  {
    id: '3',
    title: 'Title 3',
    body: 'This is the third post body',
    published: false
  }
];

// Type Definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

type User {
  id: ID!
  name: String!
  email: String!
  published: Int
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());

        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());

        return isTitleMatch || isBodyMatch;
      });
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
