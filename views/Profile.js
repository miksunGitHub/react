import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import {MainContext} from "../context/MainContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from "../hooks/ApiHooks";
import {uploadsUrl} from "../utils/Variables";
import {Card} from "react-native-elements";

const Profile = () => {

  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/640');
  const {getFilesByTag} = useTag();


  const fetchAvatar = async () => {
    try {


      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);

    } catch(error) {
      console.error(error.message);
    }
  };



  //temp testing
  //this is not needed yet
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

    //createAvatar(95);
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.Card}>
        <Card.Title H1 style={styles.HeadLine}>User profile: {user.username}</Card.Title>

        <Card.Image
          source = {{uri: avatar}}
          style = {styles.Image}
        />

        <Card.Title style={styles.text}>Your email: {user.email}</Card.Title>
        <Card.Title style={styles.text}>Full name: {user.full_name}</Card.Title>
      </Card>
      <Button
        title='Log out!'
        onPress={async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
        />

    </SafeAreaView>
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
  },
  Card: {
    display: "flex",
    alignItems: "center",
  },
  HeadLine: {
    fontFamily: 'Poppins_400Regular',
  },
  Text: {
    fontFamily: 'Poppins_400Regular',
  },
});

export default Profile;
