import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './src/config/graphql';

import Main from './src/Page/Main';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}
