import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { API_URL } from "@/app/api/config";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${API_URL}/graphql`,
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
