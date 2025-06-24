"use client";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/graphql/apolloClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
