import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {useUserData} from '../context/UserDataContext';

const ProfilePage = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const {userData, setUserData} = useUserData();

  const handleEmailChange = () => {
    userData.Mail = newEmail;
    setModalVisible(false);
  };

  const goToLoginPage = () => {
    setUserData(null);
    navigation.navigate('Login');
  };

  const goToImageSelect = () => {
    navigation.navigate('Image Change');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => goToLoginPage()}
        style={styles.logoutButton}>
        <Text style={styles.logoutButtonText} testID="logoutButton">
          Logout
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.nameHeader}>{userData.AccUsername}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>E-Mail:</Text> {userData.Mail}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Department:</Text>{' '}
            {userData.Department}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Semester:</Text> {userData.Semester}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.changeEmailButton}>
              <Text
                style={styles.changeEmailButtonText}
                testID="ChangeEmailButton">
                Change Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={() => goToImageSelect()}>
              <Text style={styles.changePasswordButtonText}>
                Change Security Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Email</Text>
              <TextInput
                testID="newEmailInput"
                style={styles.modalInput}
                placeholder="Enter new email"
                value={newEmail}
                onChangeText={text => setNewEmail(text)}
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleEmailChange}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  nameHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  changeEmailButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'purple',
    borderRadius: 5,
    marginTop: 10,
  },
  changeEmailButtonText: {
    fontSize: 16,
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'white',
  },
  changePasswordButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginTop: 10,
  },
  changePasswordButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
});

export default ProfilePage;
