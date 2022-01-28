import React from "react";
import {Image, Text, ListItem as RNEListItem, Button} from "react-native-elements";
import{TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from "../utils/Variables";
import {useFonts, Poppins_400Regular} from "@expo-google-fonts/poppins";
import AppLoading from 'expo-app-loading';

const ListItem = ({navigation, singleMedia}) =>{

  let [fontsLoaded]=useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded){
    return <AppLoading />;
  }

  return (
    <TouchableOpacity
      style={styles.ListItem}
      onPress = {() =>{
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <View style={styles.ImageView}>
        <Image
          source={{uri: uploadsUrl+ singleMedia.thumbnails?.w160}}
          style={styles.Image}
        />
      </View>
      <View style={styles.TextBox}>
        <Text style={styles.HeadLine}>{singleMedia.title}</Text>
        <Text style={styles.Text}>{singleMedia.description}</Text>
      </View>
      <Button
        title={'View'}
        onPress= {()=> {
          navigation.navigate('Single', {file: singleMedia})
        }}
        />

    </TouchableOpacity>
  );
}

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  Image:{
    borderRadius: 6,
    width: '80%',
    height: undefined,
    aspectRatio: 1,
  },
  HeadLine:{
    fontSize: 19,
    marginBottom: 2,
    fontFamily: "Poppins_400Regular",
  },
  Text:{
    fontFamily: "Poppins_400Regular",
  },
  TextBox: {
    flex: 2,
  },
  ImageView: {
    flex: 1,
  },
  ListItem: {
    flexDirection: 'row',
    alignItems: "center",
    padding: 20,
    paddingLeft: 25,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#d8dcdf',
  },
})

export default ListItem;
