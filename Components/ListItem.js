import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

import GlobalStyles from "../utils/GlobalStyles";
import PropTypes from 'prop-types';
import {uploadsUrl} from "../utils/Variables";

const ListItem = ({navigation, singleMedia}) =>{
  return (
    <TouchableOpacity
      style={GlobalStyles.ListItem}
      onPress = {() =>{
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <View style={GlobalStyles.ImageView}>
      <Image
        source={{uri: uploadsUrl+ singleMedia.thumbnails?.w160}}
        style={GlobalStyles.Image}
      />
      </View>
      <View style={GlobalStyles.TextBox}>
        <Text style={GlobalStyles.HeadLine}>{singleMedia.title}</Text>
        <Text style={GlobalStyles.Text}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
