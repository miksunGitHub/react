import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, ScrollView, ActivityIndicator} from 'react-native';
import {Avatar, Button, Card, ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/Variables';
import {useFonts, Poppins_400Regular} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import {Video} from 'expo-av';
import {useFavourite, useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';

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
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);

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
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      console.error('fetchLikes() error', error);
    }
  };

  const createLike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file.file_id, token);
      console.log('create favourite response', response);
      response && setUserLike(true);
    } catch (error) {
      console.error('create like error', error);
    }
  };

  const deleteLike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (error) {
      console.error('create unlike error', error);
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      if (avatarArray.length === 0) {
        return;
      }
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
      console.log('single.js avatar ', avatar);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title h4 style={styles.title}>
          {file.title}
        </Card.Title>
        <Card.Title>{file.time_added}</Card.Title>
        <Card.Divider />
        {file.media_type === 'image' ? (
          <Card.Image
            source={{uri: uploadsUrl + file.filename}}
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
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
            useNativeControls={true}
            isLooping
            resizeMode="contain"
            onError={(error) => {
              console.error('video error', error);
            }}
          />
        )}
        <Card.Divider />

        <Card.Title style={styles.description}>{file.description}</Card.Title>
        <ListItem>
          <Avatar source={{uri: avatar}} style={styles.Image} />
          <Text>{owner.username}</Text>
        </ListItem>
        <ListItem>
          <Text>Likes count: {likes.length}</Text>
          <Button
            disabled={userLike}
            title="Like"
            onPress={() => {
              createLike();
            }}
          />
          <Button
            disabled={!userLike}
            title="Unlike"
            onPress={() => {
              deleteLike();
            }}
          />
        </ListItem>
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
  title: {},
  description: {},
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
