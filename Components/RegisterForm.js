import React, {useContext} from 'react';
import {View, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, Button, Text} from 'react-native-elements';
import {useUser} from '../hooks/ApiHooks';

// eslint-disable-next-line react/prop-types
const RegisterForm = ({setFormToggle}) => {
  const {postUser, checkUsername} = useUser();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      delete data.confirmPassword;
      const userData = await postUser(data);
      console.log('register on submit', userData);
      if (userData) {
        Alert.alert('Success', 'User created successfully.');
        setFormToggle(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{width: 200}}>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'User name required'},
          minLength: {
            value: 3,
            message: 'User name needs to be at least 3 characters long.',
          },
          validate: async (value) => {
            try {
              const available = await checkUsername(value);
              if (available) {
                return true;
              } else {
                return 'Username is taken';
              }
            } catch (error) {
              throw new Error(error.message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Password required.'},
          minLength: {
            value: 5,
            message: 'Password must be at least 5 characters long',
          },
          /* pattern: {
            value: /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u,
            message: 'Min 8, uppercase number',
          },*/
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Password required'},
          validate: (value) => {
            const {password} = getValues();
            if (value === password) {
              return true;
            } else {
              return 'Passwords do not match';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Confirm Password"
            errorMessage={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
        )}
        name="confirmPassword"
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Email required',
          },
          pattern: {
            value: /\S+@\S+\.\S+$/,
            // value: /^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/,
            message: 'Must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Email"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: 'Full name must be at least 3 characters long',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            placeholder="Full name"
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default RegisterForm;
