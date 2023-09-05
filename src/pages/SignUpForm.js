import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import AccInfo from '../data/AccInfo';
import TakenCourseData from '../data/TakenCourseData';

const SignUpForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [username, setUsername] = useState('');
  const [displayText, setDisplayText] = useState('');

  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  const handleSignUp = () => {
    const user = AccInfo.find(account => account.Mail === email);

    if (!user) {
      //push new courseList for the new user
      const newCourses = [];
      TakenCourseData.push(newCourses);

      //create the new user object
      const newUser = {
        // Assign an ID based on the array length
        id: AccInfo.length,
        AccUsername: username,
        AccPassword: password,
        Department: department,
        Semester: semester,
        Mail: email,
        SelectedImage: 'none',
        takenCourses: [],
      };

      // Update AccInfo array with the new user object
      AccInfo.push(newUser);

      // Set the takenCourses property
      newUser.takenCourses = TakenCourseData[newUser.id];

      setShowModal(true);
    } else {
      setDisplayText('You already have an account.');
    }
  };

  const goToLoginPage = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    // Clear fields when the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
      setDisplayText('');
      setDepartment('');
      setSemester('');
      setUsername('');
    });

    return unsubscribe;
  }, [navigation]);

  const renderSignUpSection = () => {
    return (
      <View>
        <TouchableOpacity
          testID="signupButton"
          onPress={handleSignUp}
          style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={hideModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Account created successfully!
              </Text>
              <TouchableOpacity
                onPress={(hideModal, goToLoginPage)}
                style={styles.modalButton}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text testID="loginHeader" style={styles.loginHeader}>
          Sign Up
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Complete Name"
          value={username}
          testID="usernameField"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="E-Mail"
          value={email}
          testID="emailField"
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Department"
          value={department}
          testID="departmentField"
          onChangeText={setDepartment}
        />
        <TextInput
          style={styles.input}
          placeholder="Semester"
          value={semester}
          testID="semesterField"
          onChangeText={setSemester}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          testID="passwordField"
          onChangeText={setPassword}
        />

        {displayText !== '' && (
          <Text style={styles.resultText}>{displayText}</Text>
        )}
        {renderSignUpSection()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 0,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flexGrow: 1, // Allow content to scroll when the keyboard is open
    justifyContent: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpForm;
