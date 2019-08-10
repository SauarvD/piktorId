import React, { Component } from 'react';
import { View, Text, Image, Animated, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from "react-navigation";
import LinearGradient from 'react-native-linear-gradient';
import Barcode from 'react-native-barcode-builder';
import { Spinner, ProgressiveImage } from '../common';

class Dashboard extends Component {

    _isMounted = false;
    state = { data: "", visible: false, animation: new Animated.Value() };

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){
            this.getItemValue();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggle(){
        let initialValue = this.state.visible ? 250 : 0,
        finalValue  = this.state.visible ? 0 : 250;

        this.state.animation.setValue(initialValue); 

        if(!this.state.visible){
            this.setState(prevState => ({
                visible: !prevState.visible
            }));
        }
        
        Animated.spring(     //Step 4
            this.state.animation,
            {
                toValue: finalValue,
                duration: 2000
            }
        ).start();
        
        let self=this;
        if(self.state.visible){
            setTimeout(function(){
                self.setState(prevState => ({
                    visible: !prevState.visible
                }));
            },300)
        }
    }

    async getItemValue() {
        const email = await AsyncStorage.getItem('email');
        const profileData = await AsyncStorage.getItem('data');
        const userToken = await AsyncStorage.getItem('userToken');
        if(profileData){
            this.setState({data: JSON.parse(profileData)})
        } else {
            let config = {
                headers: {
                  'x-access-token': userToken
                }
            }
            axios.get('https://piktordigitalid.herokuapp.com/api/employee', config)
            .then(response => this.setState({data: response.data},()=>{
                console.log('RESPONSE');
                AsyncStorage.setItem('data', JSON.stringify(response.data));
            }));
        }
    }

    moveTo(){
        this.props.navigation.navigate('HolidayList');
    }

    routeTo(data){
        this.props.navigation.navigate(data);
    }

    renderData(){
        return (
            <View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../../assets/png/Piktorlabs_LOGO_Black.png")}/> 
                </View>
                <ProgressiveImage 
                    style={styles.profilePic}
                    thumbnailSource={{ uri: `https://piktorlabs-digitalidcard.s3.amazonaws.com/saurav%40piktorlabs.com/placeholder.png` }}
                    source={{uri: this.state.data.photoUrl}}
                    resizeMode="cover"
                />
                <LinearGradient colors={["transparent", "transparent", "transparent", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.9)", "rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,1)"]}  style={styles.linearStyle} />
                <Text style={styles.firstName}>{this.state.data.firstName}</Text>
                <Text style={styles.lastName}>{this.state.data.lastName}</Text>
                <Text style={styles.otherDetails}>{this.state.data.designation} {this.state.data.employeeId}</Text>
                <View style={styles.barCodeData}>
                    <Barcode value={this.state.data.mobile} format="CODE128" height={50} /> 
                </View>
            </View>
        );
    }

    render() {
        if(this.state.data !== ""){
            return (
                <View style={styles.content}>
                    <TouchableOpacity style={styles.optionContainer} onPress={()=>this.toggle()}>
                        <Image style={styles.options} source={require("../../assets/png/Oval.png")}/>
                    </TouchableOpacity>
                    {this.renderData()}
                    {this.state.visible && 
                        <View style={styles.topDetails}>
                            <Animated.View style={[styles.topView,{height: this.state.animation}]}>
                                <Image style={styles.insideLogo} source={require("../../assets/png/Piktorlabs_LOGO_Black.png")}/>
                                <View style={styles.statusBar}>
                                    <Text style={styles.statusText}>YOUR STATUS</Text>
                                    <TouchableOpacity style={styles.holidaysContainer} onPress={()=>this.moveTo()}>
                                        <Text style={styles.holidays}>HOLIDAYS</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView 
                                    horizontal={true} 
                                    showsHorizontalScrollIndicator={false} 
                                    contentContainerStyle={{flexDirection:'row',justifyContent:'flex-start'}}
                                    style={styles.statusContent}
                                >
                                    <TouchableOpacity  activeOpacity={0.5} style={styles.ButtonStyle}>
                                        <Image style={styles.statusImage} source={require("../../assets/png/Oval.png")} />
                                        <View style={styles.status}>
                                            <Text style={styles.topText}>In</Text>
                                            <Text style={styles.bottomText}>Office</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity  activeOpacity={0.5} style={styles.ButtonStyle} onPress={()=>this.routeTo('WFH')}>
                                        <Image style={styles.statusImage} source={require("../../assets/png/wfh.png")} />
                                        <View style={styles.status}>
                                            <Text style={styles.topText}>Work from</Text>
                                            <Text style={styles.bottomText}>Home</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity  activeOpacity={0.5} style={styles.ButtonStyle} onPress={()=>this.routeTo('Leave')}>
                                        <Image style={styles.statusImage} source={require("../../assets/png/leave.png")} />
                                        <View style={styles.status}>
                                            <Text style={styles.topText}>Apply</Text>
                                            <Text style={styles.bottomText}>Leave</Text>
                                        </View>
                                    </TouchableOpacity>
                                </ScrollView>
                            </Animated.View>
                            <TouchableOpacity style={styles.bottomView} onPress={()=>this.toggle()}></TouchableOpacity>
                        </View>
                    }
                </View>
            );
        } else {
            return <Spinner />
        }
    }
}

const styles = {
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
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
        // position: 'relative'
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
        color: "#000",
        opacity: 0.8
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
    },
    optionContainer: {
        position: 'absolute',
        top: 60,
        right: 20
    },
    options: {
        width: 20,
        height: 20
    },
    topDetails: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0
    },
    topView: {
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden'
    },
    insideLogo: {
        top: 50,
        position: 'absolute',
        height: 20,
        width: 90,
        alignSelf: 'center'
    },
    bottomView: {
        backgroundColor: '#000',
        height: '100%',
        opacity: 0.4
    },
    holidaysContainer: {
        alignSelf: 'center'
    },
    holidays: {
        color: '#4A90E2',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 16,
        fontWeight: '600'
    },
    statusText: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'TitilliumWeb-Regular'
    },
    statusBar: {
        marginLeft: 15,
        position: 'absolute',
        flexDirection: 'row',
        width: '93%',
        justifyContent: 'space-between',
        bottom: 130
    },
    statusContent: {
        width: '100%',
        position: 'absolute',
        bottom: 10,
        left: 10
    }, 
    ButtonStyle: {
        position: 'relative',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 20,
        width: 110,
        height: 110,
        marginRight: 13
    },
    statusImage: {
        position: 'absolute',
        left: 15,
        top: 15,
        height: 15,
        width: 15
    },
    status: {
        position: 'absolute',
        left: 15,
        bottom: 10
    },
    topText: {
        fontSize: 12,
        fontFamily: 'TitilliumWeb-Regular'
    },
    bottomText: {
        fontSize: 18,
        fontFamily: 'TitilliumWeb-Regular'
    }
}

export default withNavigation(Dashboard);