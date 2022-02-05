import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/Variables';
import {useFonts, Poppins_400Regular} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

const Single = ({route}) => {
  const [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const {file} = route.params;
  console.log('route', route);
  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title h4 style={styles.title}>
          {file.title}
        </Card.Title>

        <Card.Image
          source={{uri: uploadsUrl + file.filename}}
          style={styles.image}
        />

        <Card.Title style={styles.description}>{file.description}</Card.Title>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {},
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins_400Regular',
  },
  description: {
    fontFamily: 'Poppins_400Regular',
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
