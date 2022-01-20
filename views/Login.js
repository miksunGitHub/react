import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from "../context/MainContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from "../hooks/ApiHooks";
import LoginForm from "../Components/LoginForm";

const Login = ({navigation}) => { // props is needed for navigation
  const {setIsLoggedIn} = useContext(MainContext);
  const {getUserByToken}=useUser();

  const checkToken = async ()=>{
    const userToken = await AsyncStorage.getItem('userToken');

    //console.log('token value in async storage', userToken);

    if(!userToken) {
      return;
    }

    try {
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setIsLoggedIn(true);
    } catch (error){
      console.error(error);
    }
  };

  useEffect(() =>{
    checkToken();
  }, []);
/*
  const logIn = async () => {

    const data = {username: 'Horst', password: 'a23Lko2!'};
    try {
      const userData = await postLogin(data);
      const tokenFromApi = userData.token;
      await AsyncStorage.setItem('userToken', tokenFromApi);
      setIsLoggedIn(true);

    } catch {
      console.error(error);
    }
  };*/
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <LoginForm/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
