import React, {Component} from 'react';
import { View, Image, Button, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, CardSection, Input, Spinner } from '../common';

class LoginForm extends Component{
    state = { error: '', loading: false, loggedIn: false }

    renderButton() {
        if(this.state.loading){
            return (
                <View style={styles.loaderStyle}>
                    <Spinner size="large" color="#fff" />
                </View>
            )
        } else if(this.state.error !== ''){
            return (
                <View style={styles.loaderStyle}>
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={this._signIn} style={styles.buttonStyle}>
                <Image 
                    style={styles.googleStyle}
                    source={require('../../assets/png/Pasted_Image.png')}
                />
                <Text style={styles.buttonTextStyle}>
                    Sign in with Google
                </Text>
            </TouchableOpacity>
        )
    }

    async componentDidMount() {
        const userToken = await AsyncStorage.getItem('userToken')
        this.props.navigation.navigate(userToken ? 'Dashboard' : 'Login')
        this._configureGoogleSignIn();
    }

    _configureGoogleSignIn() {
        GoogleSignin.configure({
          webClientId: '496919880780-2097a9ifbremhvpfe02ud3sgij0a2do2.apps.googleusercontent.com',
          offlineAccess: false,
        });
    }
    
    _signIn = async () => {
        try {
            let self = this;
            this.setState({ loading: true})
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            await GoogleSignin.revokeAccess();
            console.log('Success:',userInfo);
            let domain = userInfo.user.email.split('@')[1];
            if(domain == 'piktorlabs.com'){
                AsyncStorage.setItem('email', userInfo.user.email);
                AsyncStorage.setItem('userToken', userInfo.idToken);
                this.props.navigation.navigate('Dashboard')
            } else {
                this.setState({ loading: false,
                                error: 'Please Sign in using Piktorlabs'})
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                this.setState({ loading: false})
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                this.setState({ loading: false})
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                this.setState({ loading: false})
            } else {
                console.log('Something went wrong:',error.toString());
                this.setState({ loading: false})
                this.setState({
                error,
                });
            }
        }
    };
    
    render() {
        const { loginView, container, thumbnailStyle, textStyle } = styles
        return (
            <View style={loginView}>
                <ImageBackground source={require('../../assets/png/Group.png')} style={{width: '100%', height: '100%'}} />
                <View style={container}>
                    <Image 
                        style={thumbnailStyle}
                        source={require('../../assets/png/Layer_1.png')}
                    />
                    <Text style={textStyle}>
                        Sign in with your Google Account
                    </Text>
                    {this.renderButton()}
                </View>
            </View>
        );
    }
}

const styles = {
    loginView: {
        backgroundColor: "#4A90E2",
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnailStyle: {
        position: 'absolute',
        bottom: 60,
        height: 30
    },
    textStyle: {
        position: 'absolute',
        color: '#fff',
        width: 250,
        textAlign: 'center',
        fontFamily: 'TitilliumWeb-Regular'
    },
    loaderStyle: {
        top: 70
    },
    buttonStyle: {
        top: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderColor: '#fff',
        height: 45,
        width: 250,
        borderRadius: 3,
        margin: 5,
        position: 'relative',
        backgroundColor: '#fff',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2
    },
    googleStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        position: 'absolute',
        left: 6
    },
    buttonTextStyle: {
        fontSize: 14,
        color: '#000',
        marginTop: 4,
        marginBottom: 4,
        marginRight: 20,
        fontFamily: 'TitilliumWeb-Regular'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm