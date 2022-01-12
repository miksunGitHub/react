import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import GlobalStyles from "../utils/GlobalStyles";
import PropTypes from 'prop-types';

const ListItem = (props) =>{

  console.log(props);
  return (
    <TouchableOpacity style={GlobalStyles.ListItem}>
      <Image
        source={{uri: props.singleMedia.thumbnails.w160}}
        style={GlobalStyles.Image}
      />
      <View>
        <Text style={GlobalStyles.HeadLine}>{props.singleMedia.title}</Text>
        <Text style={GlobalStyles.Text}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
