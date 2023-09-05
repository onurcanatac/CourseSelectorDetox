import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MainPage = ({navigation}) => {
  const goToCourses = () => {
    navigation.navigate('Courses');
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View>
      <Text testID="CoursesPageText" style={styles.welcomeHeader}>
        Welcome!
      </Text>
      <View>
        <TouchableOpacity
          testID="anotherButton"
          style={styles.coursesButton}
          onPress={goToCourses}>
          <Text style={styles.buttonText}>My Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={goToProfile}>
          <Text style={styles.buttonText}>My Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 20,
    textAlign: 'center',
  },
  coursesButton: {
    marginTop: 16,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  profileButton: {
    marginTop: 8,
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
});

export default MainPage;
