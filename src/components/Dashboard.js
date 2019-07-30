import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Barcode from 'react-native-barcode-builder';
import { Spinner } from '../common';

class Dashboard extends Component {

    _isMounted = false;
    state = { data: "" };

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){
            this.getItemValue();
            
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async getItemValue() {
        const email = await AsyncStorage.getItem('email');
        axios.get('https://piktordigitalid.herokuapp.com/api/employee?email='+email)
            .then(response => this.setState({data: response.data},()=>{
                console.log('response', response);
            }));
    }

    renderData(){
        if(this.state.data !== ""){
            return (
                <View>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require("../../assets/png/Piktorlabs_LOGO_Black.png")}/> 
                    </View>
                    <Image 
                        style={styles.profilePic}
                        source={{uri: this.state.data.photoUrl}}
                        resizeMode="cover"
                    />
                    <LinearGradient colors={["transparent", "transparent", "transparent", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.9)", "rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,1)"]}  style={styles.linearStyle} />
                    <Text style={styles.firstName}>{this.state.data.firstName}</Text>
                    <Text style={styles.lastName}>{this.state.data.lastName}</Text>
                    <Text style={styles.otherDetails}>{this.state.data.designation} {this.state.data.employeeId}</Text>
                    <View style={styles.barCodeData}>
                        <Barcode value="Hello World" format="CODE128" height={50} /> 
                    </View>
                </View>
            );
        } else {
            return <Spinner />
        }
    }

    render() {
        return (
            <View style={styles.content}>
                {this.renderData()}
            </View>
        );
    }
}

const styles = {
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        position: 'absolute',
        textAlign: 'center',
        width: 415,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        alignSelf: 'center',
        top: -80,
        height: 30,
        width: 130
    },
    profilePic: {
        height: 515,
        width: 415,
        position: 'relative'
    },
    linearStyle: {
        width: 500,
        height: 300,
        position: 'absolute',
        bottom: 0
    },
    firstName: {
        width: 415,
        textAlign: 'center',
        position: 'absolute',
        bottom: 50,
        fontSize: 39,
        fontWeight: '400',
        letterSpacing: 0.7
    },
    lastName: {
        width: 415,
        textAlign: 'center',
        position: 'absolute',
        bottom: 20,
        fontSize: 26,
        color: '#4f4f4f',
        letterSpacing: 0.7
    },
    otherDetails: {
        width: 415,
        textAlign: 'center',
        position: 'absolute',
        bottom: -10,
        color: "#bdbdbd"
    },
    barCodeData: {
        position: 'absolute',
        textAlign: 'center',
        width: 415,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -100,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.2
    }
}

export default Dashboard