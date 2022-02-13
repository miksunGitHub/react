import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/Variables';
import {Card, Button, Text, Avatar, ListItem} from 'react-native-elements';
import {PropTypes} from 'prop-types';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/640');
  const {getFilesByTag} = useTag();

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };

  // temp testing
  // this is not needed yet
  /*
  const createAvatar = async (mediaId) => {

    const data= {
      file_id: mediaId,
      tag: 'avatar ' + user.user_id,
    };

    try {
      const result = await postTag(data, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozOCwidXNlcm5hbWUiOiJIb3JzdCIsImVtYWlsIjoibWlra28uc3Vob25lbkBtZXRyb3BvbGlhLmZpIiwiZnVsbF9uYW1lIjpudWxsLCJpc19hZG1pbiI6bnVsbCwidGltZV9jcmVhdGVkIjoiMjAyMi0wMS0xMlQxMjoyNjowOC4wMDBaIiwiaWF0IjoxNjQzMTgxMzUwLCJleHAiOjE2NDMyNjc3NTB9.odcL2zN-WuUjZ3Ie1IlkdviphXVQ2wO1bfAoJz0-dlQ');
      console.log(result);
    } catch (error) {

      console.error(error);
    }
  };*/

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <ScrollView>
      <Card style={styles.Card}>
        <Card.Title h1 style={styles.HeadLine}>
          User profile: {user.username}
        </Card.Title>
        <Card.Image
          source={{uri: avatar}}
          style={styles.Image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <ListItem>
          <Avatar icon={{name: 'email', color: 'black'}} />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem>
          <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
          <Text>{user.full_name}</Text>
        </ListItem>
        <Button
          style={styles.Button}
          title="Log out!"
          onPress={async () => {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
          }}
        />
        <Button
          title="Modify user"
          onPress={() => {
            navigation.navigate('Modify user');
          }}
        />
        <Button
          title="My files"
          onPress={() => {
            navigation.navigate('My files');
          }}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  Image: {
    width: 200,
    height: 200,
    padding: 50,
  },
  Card: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  HeadLine: {
    paddingBottom: 5,
  },
  Text: {
    margin: 0,
    paddingTop: 20,
    fontSize: 18,
  },
  Button: {
    margin: 20,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
