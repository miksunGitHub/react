import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Alert} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';
import {Card, Button, Input} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';

const Modify = ({navigation, route}) => {
  const {file} = route.params;
  const {putMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: file.title,
      description: file.description,
    },
  });

  const onSubmit = async (data) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await putMedia(data, token, file.file_id);
      console.log('modify response', response);
      response &&
        Alert.alert('File', 'modified', [
          {
            text: 'ok',
            onPress: () => {
              setUpdate(update + 1);
              navigation.navigate('My files');
            },
          },
        ]);
    } catch (error) {
      // You should notify the user about problems
      console.log('onSubmit update image problem 2');
    }
  };

  return (
    <ScrollView>
      <Card>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Title"
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
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Description"
              errorMessage={errors.description && 'This is required.'}
            />
          )}
          name="description"
        />
        <Button
          loading={loading}
          title="Save changes"
          onPress={handleSubmit(onSubmit)}
        />
      </Card>
    </ScrollView>
  );
};

Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Modify;
