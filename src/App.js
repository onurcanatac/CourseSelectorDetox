import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {UserDataProvider} from './context/UserDataContext';

function App() {
  return (
    <UserDataProvider>
      <SafeAreaView style={{flex: 1}}>
        <AppNavigator />
      </SafeAreaView>
    </UserDataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
