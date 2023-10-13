import React from "react"
import { StyleSheet } from 'react-native';
import Colors from "../../common/Colors";
import { moderateScale } from "react-native-size-matters";
const styles = StyleSheet.create({
    sty1: {
        flex: 1,
        backgroundColor: Colors.white,

    },
    sty2: {
        color: 'black',
        fontStyle: 'normal',
        fontSize: moderateScale(21),
        // marginLeft: moderateScale(5),
       fontWeight:'700',
        marginTop: moderateScale(10)
    },
    sty3: {
        margin: moderateScale(10),
      
        backgroundColor: 'white',
        paddingHorizontal: moderateScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        paddingVertical: moderateScale(20),
    },
    sty4: {
        flex: 1,
    },
    sty5: {
        color: Colors.primary,
        fontSize:moderateScale(15),
        fontWeight:'600'
    },
    sty6: {
        flexDirection: 'row'
    },
    sty7: {
        color: 'red',
        marginLeft: moderateScale(0)
    },
    sty8: {

        padding: moderateScale(5),
        paddingLeft: moderateScale(10),
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: '#fff',
        color: 'black',
        flex: 1
    },
    sty9: {
        marginVertical: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center'
    },
    sty10: {
        color: 'black',
        marginHorizontal: moderateScale(10)
    },
    sty11: {
        color: Colors.primary,
        fontSize: moderateScale(25),
    },
    sty12: {
        flexDirection: 'row',
        marginTop:moderateScale(10),
        alignItems:'center',
      
    },
    sty13:{
        color:'black',
        fontSize:moderateScale(15),
        marginTop:moderateScale(5)
    },
    sty14:{
        color: 'red',
        marginLeft: moderateScale(2)
    },
    sty15:{
       

            padding: moderateScale(5),
            paddingLeft: moderateScale(10),
            borderStyle: 'solid',
            borderColor: '#ccc',
            borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: '#fff',
            color: 'black',
           width:moderateScale(150)
        
    },
    sty16:{
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
        padding: moderateScale(5),
        paddingLeft: moderateScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: '#fff',
        color: 'black',
        flex: 1
    },
    sty17:{
        color:'white',

    },
    sty18:{
        padding:20,
        borderRadius:moderateScale(10),
        backgroundColor:Colors.primary,
        width:moderateScale(80),
        justifyContent:'center',
        alignItems:'center'
    }
})
export default styles;