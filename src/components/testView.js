import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { withNavigation } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';

class testView extends Component {

    async removeItemValue() {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Login')
    }

    navigateBack(){
        this.props.navigation.navigate('Dashboard')
    }
    
    renderAlert(){
        Alert.alert(
            'Are you sure you want to log out',
            'Think again',
            [
              {text: 'Yes', onPress: () => this.removeItemValue()},
              {
                text: 'Cancel',
                onPress: () => this.navigateBack(),
                style: 'cancel',
              }
            ],
            {cancelable: false},
          );
    }

    render(){
        return (
            <View>
                {this.renderAlert()}
                {/* <Text style={{marginBottom: 100}}>Hello World</Text>
                <Alert onPress={()=> this.removeItemValue()} style={{marginTop: 50, height: 100}}>
                        Log Out
                </Alert> */}
            </View>
        );
    }
};

export default withNavigation(testView);