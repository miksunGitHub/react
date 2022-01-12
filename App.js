import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, FlatList, Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import GlobalStyles from "./utils/GlobalStyles";
import List from "./Components/List";


const App = () => {
  return (
    <>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <List />
      </SafeAreaView>
    <StatusBar style="auto"/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
