import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from "prop-types";
import {uploadsUrl} from '../utils/Variables';

const Single = ({route}) => {

  const {file}=route.params;
  console.log('route', route);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: uploadsUrl + file.filename}}
        style={{width: '90%', height: '80%'}}
        resizeMode="contain"
      />

      <Text>{file.title}</Text>
      <Text>{file.description}</Text>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Single.propTypes = {
  route: PropTypes.object,
}

export default Single;
