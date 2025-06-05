import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:9876/graphql",
    credentials: "include", // ✅ include cookies if available (no error if missing)
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
