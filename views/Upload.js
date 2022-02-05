import React, {useCallback, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';
import {Card, Button, Text, Input} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {useFocusEffect} from '@react-navigation/native';
import {Video} from 'expo-av';
import {appId} from '../utils/Variables';

const Upload = ({navigation}) => {
  const [image, setImage] = useState('https://place-hold.it/200&text=Choose');
  const [type, setType] = useState('image');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const {postTag} = useTag();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const reset = () => {
    setImage('https://place-hold.it/200&text=Choose');
    setImageSelected(false);
    setValue('title', '');
    setValue('description', '');
    setType('image');
  };

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  const onSubmit = async (data) => {
    if (!imageSelected) {
      Alert.alert('Please select a file');
      return;
    }
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    const fileName = image.split('/').pop();
    let fileExtension = fileName.split('.').pop();

    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('file', {
      uri: image,
      name: fileName,
      type: type + '/' + fileExtension,
    });

    // console.log(formData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);

      console.log('upload response', response);

      const tagResponse = await postTag(
        {
          file_id: response.file_id,
          tag: appId,
        },
        token
      );
      console.log('tag response', tagResponse);
      tagResponse &&
        Alert.alert('File', 'uploaded', [
          {
            text: 'ok',
            onPress: () => {
              setUpdate(update + 1);
              navigation.navigate('Home');
            },
          },
        ]);
    } catch (error) {
      // You should notify the user about problems
      console.log('onSubmit upload image problem');
    }
  };

  return (
    <ScrollView>
      <Card>
        {type === 'image' ? (
          <Card.Image
            source={{uri: image}}
            style={styles.cardImage}
            onPress={pickImage}
          ></Card.Image>
        ) : (
          <Video
            source={{uri: image}}
            style={styles.cardImage}
            useNativeControls={true}
            resizeMode="cover"
            onError={(error) => {
              console.error('video', error);
            }}
          />
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 3,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={{borderWidth: 1, padding: 10}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Title"
              errorMessage={errors.title && 'This is required.'}
            />
          )}
          name="title"
        />

        <Controller
          control={control}
          rules={{
            minLength: 5,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={{borderWidth: 1, padding: 10}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Description"
              errorMessage={errors.description}
            />
          )}
          name="description"
        />

        <Button title="Choose image" onPress={pickImage} />
        <Button
          disabled={!imageSelected}
          title="Upload"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
        <Button title="Reset form" onPress={reset} />
      </Card>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'contain',
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
