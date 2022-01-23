import {StyleSheet, Platform, StatusBar} from 'react-native';

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  ListItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  Image: {
    flex: 1,
    margin: 10,
    borderRadius: 6,
  },
  TextView: {
    flex: 2,
    padding: 10,
  },
  HeadLine: {
    paddingBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  Text: {
    padding: 10,
  },
  ImageView: {
    flex: 1,
  },
  TextBox: {
    flex: 2,
    padding: 10,
  }
});
