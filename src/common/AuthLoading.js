import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Spinner } from './index';

class AuthLoading extends Component {
    constructor(){
        super()
        this.loadApp()
    }

    loadApp = async() => {
        const userToken = await AsyncStorage.getItem('userToken')

        this.props.navigation.navigate(userToken ? 'AlbumList' : 'Auth')
    }

    render() {
        return (
            <View>
                <Spinner />
            </View>
        );
    }
}

export default AuthLoading;