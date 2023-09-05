import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from '../pages/MainPage';
import CoursesPage from '../pages/CoursesPage';
import LoginForm from '../pages/LoginForm';
import SignUpForm from '../pages/SignUpForm';
import CourseDetails from '../pages/CourseDetails';
import ProfilePage from '../pages/ProfilePage';
import SecurityImageChange from '../pages/SecurityImageChange';
import SecurityImagePick from '../pages/SecurityImagePick';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Sign Up" component={SignUpForm} />
        <Stack.Screen name="Image Pick" component={SecurityImagePick} />
        <Stack.Screen name="Home" component={MainPage} />
        <Stack.Screen name="Courses" component={CoursesPage} />
        <Stack.Screen name="Course Details" component={CourseDetails} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Image Change" component={SecurityImageChange} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
