/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import LoginForm from './src/components/LoginForm';
import Dashboard from './src/components/Dashboard';
import testView from './src/components/testView';
import HolidayList from './src/components/HolidayList';
import Leave from './src/components/Leave';
import WFH from './src/components/WFH';

const AuthStackNavigator = createStackNavigator(
  {
    Dashboard: { screen: Dashboard},
    testView: { screen: testView},
    HolidayList: { screen: HolidayList},
    Leave: { screen: Leave},
    WFH: { screen: WFH}
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