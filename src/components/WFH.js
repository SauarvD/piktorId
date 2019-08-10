import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'

class WFH extends Component {
    constructor(props){
        super(props);
        this.state={
            personal: true,
            medical: false,
            fromDate: '',
            toDate: '',
            maxDate: ''
        }
    }

    componentDidMount(){
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        this.setState({
            //Setting the value of the date
            fromDate:
                year + '-' + month + '-' + date,
            toDate:
                year + '-' + month + '-' + date,
            maxDate:
                year + '-12-31'
          });
    }

    toggle(data){
        if(data == 'personal'){
            if(!this.state.personal){
                this.setState({ personal: true, 
                                medical: false,
                                vacation: false})
            }
        } else if(data == 'medical'){
            if(!this.state.medical){
                this.setState({ personal: false, 
                                medical: true,
                                vacation: false})
            }
        }
    }

    render(){
        const personalBg = this.state.personal ? styles.defaultBg : styles.containerWidth
        const medicalBg = this.state.medical ? styles.defaultBg : styles.containerWidth
        
        const personalText = this.state.personal ? styles.defaultFont : styles.smallFont
        const medicalText = this.state.medical ? styles.defaultFont : styles.smallFont

        const { 
            parentContainer, container, headerText, topicContainer, 
            topicText, balance, reasonContainer, containerWidth, smallFont, 
            smallHeaderFont, reasonParent, flexContainer, submitBtnContainer,
            submitBtnText } = styles;
        return (
            <View style={parentContainer}>
                <ScrollView style={container}>                    
                    <View style={reasonParent}>
                        <Text style={headerText}>WORK FROM HOME</Text>
                        <View style={reasonContainer}>
                            <TouchableOpacity style={[topicContainer, containerWidth, personalBg]} onPress={()=>this.toggle('personal')}>
                                <Text style={[topicText, smallFont, personalText]}>Personal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[topicContainer, containerWidth, medicalBg]} onPress={()=>this.toggle('medical')}>
                                <Text style={[topicText, smallFont, medicalText]}>Medical</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={reasonParent}>
                        <Text style={[headerText, smallHeaderFont]}>Date</Text>
                        <View style={[topicContainer, flexContainer]}>
                            <Text style={[topicText, smallFont, styles.defaultFont]}>Start Date</Text>
                            <DatePicker
                                style={{width: 100}}
                                date={this.state.fromDate}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate={this.state.fromDate}
                                maxDate={this.state.maxDate}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none'
                                    },
                                    dateInput: {
                                        padding: 0,
                                        margin: 0,
                                        borderColor: '#fff'
                                    }
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </View>
                        <View style={[topicContainer, flexContainer]}>
                            <Text style={[topicText, smallFont, styles.defaultFont]}>End Date</Text>
                            <DatePicker
                                style={{width: 100}}
                                date={this.state.toDate}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate={this.state.fromDate}
                                maxDate={this.state.maxDate}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none'
                                    },
                                    dateInput: {
                                        padding: 0,
                                        margin: 0,
                                        borderColor: '#fff'
                                    }
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </View>
                    </View>

                </ScrollView>
                <View style={submitBtnContainer}>
                    <Text style={submitBtnText}>SUBMIT</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    parentContainer: {
        position: 'relative',
        height: '100%'
    },
    container: {
        backgroundColor: '#F0B41B',
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
        height: '100%'
    },
    headerText: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 20,
        color: '#fff',
        marginBottom: 5,
    },
    topicContainer: {
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 10,
        marginTop: 10,
    },
    topicText: {
        textAlign: 'center',
        fontFamily: 'TitilliumWeb-SemiBold',
        fontSize: 16
    },
    balance: {
        color: '#fff',
        fontFamily: 'TitilliumWeb-SemiBold'
    },
    reasonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerWidth: {
        width: '48%',
        marginTop: 5,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    smallFont: {
        fontSize: 14,
        fontFamily: 'TitilliumWeb-Regular',
        color: '#fff'
    },
    smallHeaderFont: {
        fontSize: 18
    },
    reasonParent: {
        marginTop: 20,
        marginBottom: 20
    },
    defaultFont: {
        color: '#000'
    },
    defaultBg: {
        backgroundColor: '#fff'
    },
    flexContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    submitBtnContainer: {
        position: 'absolute',
        backgroundColor: '#000',
        width: '100%',
        padding: 30,
        bottom : 0
    },
    submitBtnText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'TitilliumWeb-SemiBold'
    },
    dateContainer: {
        height: 50,
        width: 50
    }
}

export default WFH;