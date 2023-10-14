import React from "react"
import { StyleSheet } from 'react-native';
import Colors from "../../common/Colors";
import { moderateScale } from "react-native-size-matters";
const styles = StyleSheet.create({
    scrollcontainer:{
     
      paddingHorizontal:moderateScale(10),
      paddingVertical:moderateScale(15),
      marginRight:moderateScale(10)
    },
    filtercontainer:{
        height:moderateScale(20),
      
    },
    headercontainer:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:moderateScale(20),
        borderWidth:1,
        height:moderateScale(50),
        borderColor:Colors.statusbar
    },
    headertext:{
        marginHorizontal:moderateScale(10),
        fontSize:moderateScale(15),
        fontWeight:'600',
        color:'black'
    },
    datacontainer:{
        flexDirection:'column',
        borderWidth:10
    },
    number_container:{
        width:moderateScale(50),

        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth:1,
        height:moderateScale(50),
        borderColor:Colors.databordercolor
    },
    date_container:{
        width:moderateScale(120),

        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth:1,
        height:moderateScale(50),

        borderColor:Colors.databordercolor
    },
    seller_container:{
        width:moderateScale(200),

        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth:1,
        height:moderateScale(50),

        borderColor:Colors.databordercolor
    },
    rate_container:{
        width:moderateScale(120),

        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth:1,
        height:moderateScale(50),

        borderColor:Colors.databordercolor
    },
    bags_container:{
        width:moderateScale(80),

        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth:1,
        height:moderateScale(50),

        borderColor:Colors.databordercolor,
    },
    

})
export default styles;