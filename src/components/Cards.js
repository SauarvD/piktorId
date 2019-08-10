import React from 'react';
import { View, Text } from 'react-native';

const Cards = ({ data, bg }) => {

    return(
        <View style={{...styles.list, backgroundColor: bg, opacity:Date.now()>new Date(data.date).getTime()? 0.5: 1}}>  
            <View style={styles.topView}>
                <Text style={styles.textDetails}>{data.date}</Text>
                <Text style={styles.textDetails}>{data.day}</Text>
            </View> 
            <Text style={[styles.textDetails, styles.event]}>{data.occasion}</Text>
        </View> 
    );
};

const styles={
    list:{
        padding: 20,
        paddingLeft: 25,
        paddingRight: 25,
        width: '100%',
        marginTop:2,
        marginBottom: 2,
        alignItems:'center',
        borderRadius: 3
    },
    topView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textDetails: {
        color: '#fff',
        fontFamily: 'TitilliumWeb-SemiBold',
        fontSize: 14
    },
    event: {
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Light',
        width: '100%',
        textAlign: 'left'
    }
}

export default Cards;