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

const Login = ({navigation}) => { // props is needed for navigation
  const {setIsLoggedIn} = useContext(MainContext);

  const checkToken = async ()=>{
    const userToken =await  AsyncStorage.getItem('userToken');

    console.log('token value in async storage', userToken);

    // dummy validation for user token
    if (userToken==='abc'){

      setIsLoggedIn(true);
    }
  };

  useEffect(() =>{
    checkToken();
  }, []);

  const logIn = async () => {
    console.log('Login button pressed');
    await AsyncStorage.setItem('userToken', 'abc');
    setIsLoggedIn(true);

  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn}/>
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
