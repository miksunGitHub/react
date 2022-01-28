import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import GlobalStyles from "../utils/GlobalStyles";
import List from "../Components/List";
import PropTypes from "prop-types";

const Home = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <List navigation={navigation}/>
      </SafeAreaView>
    </>
  )
}

Home.propTypes = {
  navigation: PropTypes.object,
};

const styles= StyleSheet.create({

})

export default Home;
