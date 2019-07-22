import React, {Component} from 'react';
import { Text } from 'react-native';
import Firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from '../common';

class LoginForm extends Component{
    state = { email: '', password: '', error: '', loading: false, loggedIn: false }
    

    onButtonPress() {
        const { email, password } = this.state

        this.setState({ error: '', loading: true });

        Firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this))
        })
    }

    onLoginSuccess() {
        this.setState({ 
            email: '',
            password: '',
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
            <Button onPress={this.onButtonPress.bind(this)}>
                Log In
            </Button>
        )
    }

    componentDidMount(){
        Firebase.initializeApp({
            apiKey: "AIzaSyCPAAJqpgAGTbJr9MaCeo3WQQDvAJ5AW_8",
            authDomain: "idproject-52220.firebaseapp.com",
            databaseURL: "https://idproject-52220.firebaseio.com",
            projectId: "idproject-52220",
            storageBucket: "",
            messagingSenderId: "1058612038385",
            appId: "1:1058612038385:web:eeddf99cfa27ae31"
        });

        Firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return <Button>Log Out</Button>
            default: 
                return <Spinner size="large"/> 
        }
    }
    
    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        placeholder = "user@piktorlabs.com"
                        label = "Email"
                        value = {this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        secureTextEntry
                        placeholder = "password"
                        label = "Password"
                        value = {this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

                <CardSection>
                    {this.renderContent()}
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