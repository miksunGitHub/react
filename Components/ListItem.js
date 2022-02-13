import React, {useContext} from 'react';
import {
  ListItem as RNEListItem,
  Avatar,
  ButtonGroup,
} from 'react-native-elements';
import {StyleSheet, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/Variables';
import {useFonts, Poppins_400Regular} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import {MainContext} from '../context/MainContext';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItem = ({navigation, singleMedia, myFilesOnly}) => {
  /*
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }*/
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const doDelete = () => {
    Alert.alert('Delete', 'this file permanently', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(singleMedia.file_id, token);
            response && setUpdate(update + 1);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  return (
    <RNEListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <Avatar
        size="large"
        source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
      />
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle style={styles.Text}>
          {singleMedia.description}
        </RNEListItem.Subtitle>
        {myFilesOnly && (
          <ButtonGroup
            onPress={(index) => {
              if (index === 0) {
                navigation.navigate('Modify', {file: singleMedia});
              } else {
                doDelete();
              }
            }}
            buttons={['Modify', 'Delete']}
            rounded
          />
        )}
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

const styles = StyleSheet.create({
  Image: {
    borderRadius: 6,
    width: '80%',
    height: undefined,
    aspectRatio: 1,
  },
  HeadLine: {
    fontSize: 19,
    marginBottom: 2,
  },
  Text: {},
  TextBox: {
    flex: 2,
  },
  ImageView: {
    flex: 1,
  },
  ListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingLeft: 25,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#d8dcdf',
  },
});

export default ListItem;
