import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native';
import GlobalStyles from "./utils/GlobalStyles";
import List from "./Components/List";
import {Menu, Settings} from "react-native-feather";
import {useFonts, Poppins_900Black} from "@expo-google-fonts/poppins";
import AppLoading from 'expo-app-loading';

const App = () => {
  let [fontsLoaded]=useFonts({
    Poppins_900Black,
  });

  if (!fontsLoaded){
    return <AppLoading />;
  }

  return (
    <>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <StatusBar barStyle='light-content' backgroundColor="rgba(245, 244, 240, 1)" />
        <View style={styles.Header}>
          <ImageBackground
            source={require('./assets/cat.jpg')}
            style={styles.HeaderImage}
            imageStyle={{borderBottomRightRadius: 90}}
          >

          </ImageBackground>
          <Menu stroke="black" fill="#fff" width={33} height={33} style={styles.MenuIcon}/>
        </View>
        <View style={styles.Element1}>
          <Text style={styles.HeadLine1}>
            Feline Friends
          </Text>
          <Settings stroke="black" fill="rgba(211, 163, 123, 1)" width={20} height={20} style={styles.SettingsIcon}/>
        </View>
        <View style={styles.ListContainer} >
          <List />
        </View>

      </SafeAreaView>
    <StatusBar style="auto"/>
    </>
  )
}

const styles = StyleSheet.create({
  HeaderImage: {
    width: Dimensions.get('window').width,
    height: 190,
    backgroundColor: "rgba(211, 163, 123, 1)",
  },
  MenuIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  Element1: {
    backgroundColor: "rgba(211, 163, 123, 1)",
    flex: 1,
  },
  HeadLine1: {
    fontFamily: "Poppins_900Black",
    fontSize: 28,
    paddingTop: 7,
    textAlign: "center",
  },
  SettingsIcon: {
    position: "absolute",
    right: 10,
    top: 18,
  },
  ListContainer: {
    flex: 11,
    width: Dimensions.get('window').width,
  },
});

export default App;
