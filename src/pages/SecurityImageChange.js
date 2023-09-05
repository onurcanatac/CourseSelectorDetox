import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import SecurityImageForm from './SecurityImageForm';
import radioItems from '../data/RadioItems';

import {useUserData} from '../context/UserDataContext';

const SecurityImageChange = ({navigation}) => {
  // Initialize with null
  const [checked, setChecked] = useState(null);

  // Disable confirmation button if no image is selected
  const isConfirmButtonDisabled = checked === null;

  const {userData, setUserData} = useUserData();

  const handleConfirmPress = () => {
    // Update the selected image
    userData.SelectedImage = checked;
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeHeader}>Pick Your New Security Image</Text>
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
        disabled={isConfirmButtonDisabled} // Disable the button if no image is selected
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

export default SecurityImageChange;
