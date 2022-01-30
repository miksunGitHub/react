import React, {useContext} from "react";
import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {useUser} from "../hooks/ApiHooks";

const RegisterForm = () => {
  const {postUser} = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    }
  });

  const onSubmit = async (data) =>  {
    console.log(data);
    try{
      const userData = await postUser(data);
      console.log('register on submit', userData);
    }catch (error){
      console.error(error);
    }
  }

  return (
    <View style={{width: 200}}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="User name"
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Email"
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            placeholder="Full name"
          />
        )}
        name="full_name"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export default RegisterForm;
