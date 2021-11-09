import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainComponent from './components/MainComponent';
import {Provider} from 'react-redux';
import {Store} from './redux/store';

export default function App() {
  return (
    <Provider store={Store}>
      <View style={styles.container}>
        <MainComponent />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
