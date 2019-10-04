import ApolloClient from "apollo-client";
import { from } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const resolvers = {
  Query: {
    search: (_root, { search }, _context) => {
      console.log(search);
      if (search === 0) {
        return "hello";
      } else if (search === 1) {
        return "huh?";
      } else {
        return "goodbye";
      }
    }
  }
};

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id
});

const httpLink = new HttpLink({
  // uri: "https://graphql.org/swapi-graphql/"
});

export const client = new ApolloClient({
  cache,
  link: from([httpLink]),
  resolvers
});
