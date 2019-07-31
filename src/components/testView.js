import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { withNavigation } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';

class testView extends Component {

    logOut(){
        this.removeItemValue();
    }

    async removeItemValue() {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('data');
        this.props.navigation.navigate('Login')
    }

    navigateBack(){
        this.props.navigation.navigate('Dashboard')
    }

    render(){
        const { backGround,container,textStyle,logOutButtons } = styles
        return (
            <View style={backGround}>
                <ImageBackground source={require('../../assets/png/Group.png')} style={{width: '100%', height: '100%'}} />
                <View style={container}>
                    <Text style={textStyle}>Are you sure you want to log out</Text>
                    <View style={logOutButtons}>
                        <TouchableOpacity onPress={() => this.navigateBack()}>
                            <Text>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.logOut()}>
                            <Text>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};

const styles = {
    backGround:{
        backgroundColor: "#4A90E2",
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        padding: 20,
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'TitilliumWeb-Regular'
    },
    logOutButtons: {
        marginTop: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 150
    }
}

export default withNavigation(testView);