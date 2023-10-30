import React from "react"
import { StyleSheet } from 'react-native';
import Colors from "../../common/Colors";
import { moderateScale } from "react-native-size-matters";
import { normalizeUnits } from "moment";
const styles=StyleSheet.create({
    contianer:{
       
        flex:1
    },
    datacontainer:{
       
        flexDirection:'row',
        borderWidth:1,
        margin:moderateScale(20),
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:moderateScale(20),
        borderColor:'#232533'
    },
    datatext:{
        color:Colors.primary,
        fontWeight:'800',
        fontSize:moderateScale(15)

    }
})
export default styles;