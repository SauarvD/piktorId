import React, {Component} from 'react';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { Button, Card, CardSection, Input, Spinner } from '../common';

class LoginForm extends Component{
    state = { error: '', loading: false, loggedIn: false }

    onLoginSuccess() {
        this.setState({ 
            error: '',
            loading: false
        });
    }

    onLoginFail() {
        this.setState({ 
            error: "Authentication Failed",
            loading: false
        });
    }

    renderButton() {
        if(this.state.loading){
            return <Spinner size="small"/>
        } 

        return (
            <Button onPress={this._signIn}>
                Log In
            </Button>
        )
    }

    async componentDidMount() {
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
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          await GoogleSignin.revokeAccess();
          console.log('Success:',userInfo);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // sign in was cancelled
            Alert.alert('cancelled');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation in progress already
            Alert.alert('in progress');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert('play services not available or outdated');
          } else {
            console.log('Something went wrong:',error.toString());
            Alert.alert('Something went wrong', error.toString());
            this.setState({
              error,
            });
          }
        }
    };
    
    render() {
        return (
            <Card>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm