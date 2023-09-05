import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useUserData} from '../context/UserDataContext';

import AccInfo from '../data/AccInfo';

const LoginForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayText, setDisplayText] = useState('');

  const {userData, setUserData} = useUserData();

  const handleLogin = () => {
    const user = AccInfo.find(account => account.Mail === email);

    if (user) {
      if (password === user.AccPassword) {
        navigation.navigate('Image Pick');
      }
    } else {
      setDisplayText('Invalid credentials. Please try again.');
    }
    // Set user data
    setUserData(user);
  };

  useEffect(() => {
    // Clear fields when the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
      setDisplayText('');
    });

    // Clean up the listener when navigated
    return unsubscribe;
  }, [navigation]);

  const handleSignUp = () => {
    navigation.navigate('Sign Up');
  };

  const renderSignUpSection = () => {
    return (
      <View>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity
          testID="signupButton"
          onPress={handleSignUp}
          style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View>
        <Text testID="loginHeader" style={styles.loginHeader}>
          Login
        </Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="E-Mail"
          value={email}
          testID="emailField"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          testID="passwordField"
          onChangeText={setPassword}
        />
        <TouchableOpacity
          testID="loginButton"
          onPress={handleLogin}
          style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {displayText !== '' && (
          <Text style={styles.resultText}>{displayText}</Text>
        )}
        {renderSignUpSection()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 70,
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginForm;
