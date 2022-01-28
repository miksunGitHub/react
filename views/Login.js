import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  View,
} from 'react-native';
import {Card, Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MainContext} from "../context/MainContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from "../hooks/ApiHooks";
import LoginForm from "../Components/LoginForm";
import RegisterForm from '../Components/RegisterForm';



const Login = ({navigation}) => { // props is needed for navigation
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async ()=>{
    const userToken = await AsyncStorage.getItem('userToken');

    console.log('token value in async storage', userToken);

    if(!userToken) {
      return;
    }

    try {
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error){
      console.error(error);
    }
  };

  useEffect(() =>{
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}
      >

        <View>
          <Card>
            <Card.Title h4>Login</Card.Title>
            <Card.Divider />
            <LoginForm/>
          </Card>

        </View>
          <View>
            <Card>
              <Card.Title h3>Register</Card.Title>
              <RegisterForm/>
            </Card>
          </View>

      </KeyboardAvoidingView>
    </TouchableOpacity>
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
