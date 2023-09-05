import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import SecurityImageForm from './SecurityImageForm';
import radioItems from '../data/RadioItems';

import {useUserData} from '../context/UserDataContext';

const SecurityImagePick = ({navigation}) => {
  const [checked, setChecked] = useState(null);
  const [alertAttempts, setAlertAttempts] = useState(0);

  const isConfirmButtonDisabled = checked === null;
  const {userData, setUserData} = useUserData();

  const handleConfirmPress = () => {
    if (userData.SelectedImage === checked) {
      // Selected image matches the one in userData, navigate to Home
      navigation.navigate('Home');
    } else {
      // Increment the alert attempts
      const newAttempts = alertAttempts + 1;
      setAlertAttempts(newAttempts);

      if (newAttempts >= 2) {
        // Kick the user out after two attempts
        alert(
          'You have exceeded the maximum number of attempts. Please log in again.',
        );
        navigation.navigate('Login');
      } else {
        // Show a warning with remaining attempts
        const attemptsRemaining = 2 - newAttempts;
        alert(
          `Selected security image does not match. ${attemptsRemaining} attempt(s) remaining.`,
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeHeader}>Pick Your Security Image</Text>
      <SecurityImageForm
        radioItems={radioItems}
        checked={checked}
        setChecked={setChecked}
      />
      <TouchableOpacity
        style={[
          styles.confirmButton,
          isConfirmButtonDisabled && styles.disabledButton,
        ]}
        disabled={isConfirmButtonDisabled}
        onPress={handleConfirmPress}>
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeHeader: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listItem: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  radioAndImageContainer: {
    marginLeft: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 30,
  },
  radioButtonImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
});

export default SecurityImagePick;
