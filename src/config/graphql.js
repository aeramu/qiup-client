import ApolloClient from 'apollo-boost';
import {AsyncStorage} from 'react-native'

const client = new ApolloClient({
    uri: 'https://11kqrmkw35.execute-api.ap-southeast-1.amazonaws.com/graphql',
    request: async (operation) => {
        const token = await AsyncStorage.getItem('token')
        operation.setContext({
          headers: {
            token: token
          }
        })
    }
});

export default client;
