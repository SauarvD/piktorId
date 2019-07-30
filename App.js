/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import AlbumList from './src/components/AlbumList';
import LoginForm from './src/components/LoginForm';
import Dashboard from './src/components/Dashboard';
import testView from './src/components/testView';

const AuthStackNavigator = createStackNavigator(
  {
    Dashboard: { screen: Dashboard},
    testView: { screen: testView}
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
)

const DrawerNavigator = createDrawerNavigator(
 {
  Home: { screen: AuthStackNavigator},
  LogOut: { screen: testView}
 } 
)

const AuthSwitchNavigator = createSwitchNavigator(
  {
    Login: { screen: LoginForm },
    Dashboard: { screen: DrawerNavigator }
  }
)

export default createAppContainer(AuthSwitchNavigator);