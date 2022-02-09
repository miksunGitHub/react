import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View, ScrollView} from 'react-native';
import {Avatar, Button, Card, Image} from 'react-native-elements';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/Variables';
import {useFonts, Poppins_400Regular} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import ListItem from '../Components/ListItem';
import {Video} from 'expo-av';
import {useFavourite, useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route}) => {
  /*
  const [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }*/

  const {file} = route.params;
  const videoRef = useRef(null);
  const {getUserById} = useUser();
  const [owner, setOwner] = useState({username: 'fetching...'});
  const [avatar, setAvatar] = useState('http://placekitten.com/180');
  const {getFilesByTag} = useTag();
  const {postFavourite, getFavouritesByFileId, deleteFavourite} =
    useFavourite();
  const [likes, setLikes] = useState([]);

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setOwner(userData);
    } catch (error) {
      // TODO: how should user be notified?
      console.error('fetch owner error', error);
      setOwner({username: '[not available]'});
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesByFileId(file.file_id);
      setLikes(likesData);
    } catch (error) {
      console.error('fetchLikes() error', error);
    }
  };

  const createLike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavourite(file.file_id, token);
    } catch (error) {
      console.error('create like error', error);
    }
  };

  const deleteLike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(file.file_id, token);
    } catch (error) {
      console.error('create unlike error', error);
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
    fetchLikes();
  }, []);

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title h4 style={styles.title}>
          {file.title}
        </Card.Title>
        {file.media_type === 'image' ? (
          <Card.Image
            source={{uri: uploadsUrl + file.filename}}
            style={styles.image}
          />
        ) : (
          <Video
            ref={videoRef}
            style={styles.image}
            source={{
              uri: uploadsUrl + file.filename,
            }}
            usePoster
            posterSource={{
              uri: uploadsUrl + file.filename,
            }}
            useNativeControls
            isLooping
            resizeMode="contain"
            onError={(error) => {
              console.error('video error', error);
            }}
          />
        )}

        <Card.Title style={styles.description}>{file.description}</Card.Title>
        <View>
          <Image source={{uri: avatar}} style={styles.Image} />
          <Text>{owner.username}</Text>
          <Button
            title="Like"
            onPress={() => {
              createLike();
            }}
          />
          <Button
            title="Unlike"
            onPress={() => {
              deleteLike();
            }}
          />
          <Text>Likes count: {likes.length}</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {},
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins_400Regular',
  },
  description: {
    fontFamily: 'Poppins_400Regular',
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
