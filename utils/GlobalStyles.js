import {StyleSheet, Platform, StatusBar} from 'react-native';

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  ListItem: {
    flexDirection: "row",
    backgroundColor: "#b2beb5",
    marginBottom: 10,
  },
  Image: {
    margin: 10,
  },
  TextView: {
    flex: 2,
  },
  HeadLine: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  Text: {
    padding: 10,
  }
});
