import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://lxtre98vz1.execute-api.ap-southeast-1.amazonaws.com/graphql'
});

export default client;
