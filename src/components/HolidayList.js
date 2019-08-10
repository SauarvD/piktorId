import React, {Component} from 'react';
import { Text, ScrollView, TouchableOpacity, View, Dimensions } from 'react-native';
import Cards from './Cards';
import HolidayListData from '../data/holiday.json';

class HolidayList extends Component {
    state = { public: true, optional: false };

    publicView(){
        this.setState({ public: true, optional: false })
    }

    optionalView(){
        this.setState({ public: false, optional: true })
    }

    render() {
        const { container, buttons, headerText, buttonContainer, highlighted, publicText, optionalText } = styles;
        return (
            <View style={container}>
                <Text style={headerText}>HOLIDAYS - {new Date().getFullYear()}</Text>
                <View style={buttonContainer}>
                    <TouchableOpacity 
                        onPress={this.publicView.bind(this)} 
                        style={buttons}>
                        <Text style={[highlighted, publicText]}>PUBLIC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={this.optionalView.bind(this)} 
                        style={buttons}>
                    <Text style={[highlighted, optionalText]}>OPTIONAL</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {this.state.public && 
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {HolidayListData.public.map((holidays,i)=>{
                                return(
                                    <Cards key={i} data={holidays} bg={'#3399FF'}/>
                                )
                            })}
                        </ScrollView>
                    }
                    {this.state.optional && 
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {HolidayListData.optional.map((holidays,i)=>{
                                return(
                                    <Cards key={i} data={holidays} bg={'#828282'}/>
                                )
                            })}
                        </ScrollView>
                    }
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 100,
        paddingBottom: 100
    },
    headerText: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 20,
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    buttons: {
        marginRight: 20
    },
    highlighted: {
        fontFamily: 'TitilliumWeb-SemiBold',
        fontSize: 16,
        letterSpacing: 0.8
    },
    publicText:{
        color: '#3399FF'
    },
    optionalText:{
        color: '#333'
    }
}

export default HolidayList;