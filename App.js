import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './src/config/graphql';
import Navigation from './Navigation'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation/>
    </ApolloProvider>
  );
}
