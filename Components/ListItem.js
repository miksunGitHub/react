import React from "react";
import {StyleSheet, Image, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import {ThumbsUp, ThumbsDown} from "react-native-feather";
import {useFonts, Poppins_400Regular} from "@expo-google-fonts/poppins";
import AppLoading from 'expo-app-loading';

const ListItem = (props) =>{
  let [fontsLoaded]=useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded){
    return <AppLoading />;
  }

  return (
    <TouchableOpacity style={styles.ListItem}>
      <Image
        source={{uri: props.singleMedia.thumbnails.w160}}
        style={styles.Image}
      />
      <View style={styles.TextContainer}>
        <ThumbsUp stroke="black" fill="#fff" width={20} height={20} style={styles.ThumbUp}/>
        <Text style={styles.HeadLine2}>{props.singleMedia.title}</Text>
        <ThumbsDown stroke="black" fill="#fff" width={20} height={20} style={styles.ThumbDown}/>
        <Text style={styles.Text}>{props.singleMedia.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

const styles=StyleSheet.create({
  ListItem:{
    marginRight: 10,
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "column",
    backgroundColor: "white",
    width: 250,
  },
  Image: {
    borderRadius: 20,
    marginTop: 33,
    width: 180,
    height: 150,
    margin: 10,
  },
  TextView: {
    flex: 2,
    fontFamily: "Poppins_400Regular",
  },

  HeadLine2: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",

  },
  Text: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "justify",
    lineHeight: 18,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },

  ThumbUp: {
    position: "absolute",
    left: 35,
    top: 4,
  },
  ThumbDown: {
    position: "absolute",
    right: 35,
    top: 4,
  },

});

export default ListItem;
