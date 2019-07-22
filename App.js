/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View } from 'react-native';
import { Header } from './src/common';
import AlbumList from './src/components/AlbumList';
import LoginForm from './src/components/LoginForm';
// import { LoginFlow } from "./src/router";

const App = () => (
  <View style={{ flex: 1 }}>
    <Header headerText={'Piktorlabs'}/>
    <LoginForm />
  </View>
);

export default App;