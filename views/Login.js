import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  View,
  ScrollView,
} from 'react-native';
import {ButtonGroup, Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm';
import Logo from '../assets/logo.svg';

const Login = ({navigation}) => {
  // props is needed for navigation
  const [formToggle, setFormToggle] = useState(true);
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token value in async storage', userToken);

    if (!userToken) {
      return;
    }

    try {
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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
        <ScrollView contentContainerStyle={styles.container}>
          <Logo style={styles.logo} />

          <View style={styles.form}>
            <Card>
              <ButtonGroup
                onPress={() => setFormToggle(!formToggle)}
                selectedIndex={formToggle ? 0 : 1}
                buttons={['Login', 'Register']}
              />
            </Card>
            {formToggle ? (
              <Card>
                <Card.Title h3>Login</Card.Title>
                <Card.Divider />
                <LoginForm />
              </Card>
            ) : (
              <Card>
                <Card.Title h3>Register</Card.Title>
                <Card.Divider />
                <RegisterForm setFormToggle={setFormToggle} />
              </Card>
            )}
          </View>
        </ScrollView>
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
  appTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 8,
  },
  logo: {
    marginTop: 20,
    width: 40,
    height: 40,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
