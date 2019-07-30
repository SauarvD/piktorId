import React, {Component} from 'react';
import { ScrollView, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from "react-navigation";
import AlbumDetails from './AlbumDetails';
import { Spinner } from '../common';

class AlbumList extends Component {
    _isMounted = false;
    state = { albums: []};

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){
            axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => this.setState({albums: response.data}));
        }
    }

    renderAlbums(){
        if(this.state.albums.length > 0){
            return this.state.albums.map(album => 
                <AlbumDetails key={album.title} album={album}/>
            );
        } else {
            return <Spinner />
        }
    }

    async removeItemValue() {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Login')
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <ScrollView>
                <Button title="Log Out" onPress={()=> this.removeItemValue()}>
                    Log Out
                </Button>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}

export default withNavigation(AlbumList);