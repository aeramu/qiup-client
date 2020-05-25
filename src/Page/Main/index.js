import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import client from '../../config/graphql';
import { StyleSheet, View, Text } from 'react-native';
import { gql } from 'apollo-boost';

const GET_HELLOWORLD = gql`
  query {
    hello
  }
`;

const getHelloWorld = () => {
  client
    .query({
      query: GET_HELLOWORLD
    })
    .then(response => {
      console.log('RESPONSE ==>', response)
    })
    .catch(error => {
      console.log('ERROR ==>', error)
    })
};

export default () => {
  const { loading, error, data } = useQuery(GET_HELLOWORLD);

  useEffect(() => {
    console.log(data)
    getHelloWorld()
  }, [])

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <View style={styles.container}>
      <Text>Apps running</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
