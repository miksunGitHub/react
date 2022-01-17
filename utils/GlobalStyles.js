import {StyleSheet, Platform, StatusBar} from 'react-native';


export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  FlatList: {
    padding: 10,
    backgroundColor: "rgba(211, 163, 123, 1)",
  },


});
