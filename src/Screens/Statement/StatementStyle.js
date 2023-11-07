import React from "react"
import { StyleSheet } from 'react-native';
import Colors from "../../common/Colors";
import { moderateScale } from "react-native-size-matters";
const styles = StyleSheet.create({
    scrollcontainer: {

        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(15),
        marginRight: moderateScale(10)
    },

    headercontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: moderateScale(20),
        borderWidth: 1,
        height: moderateScale(50),
        borderColor: Colors.statusbar
    },
    headertext: {
        marginHorizontal: moderateScale(10),
        fontSize: moderateScale(15),
        fontWeight: '600',
        color: 'black'
    },
    datacontainer: {
        flexDirection: 'column',
        borderWidth: 10
    },
    number_container: {
        width: moderateScale(50),

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth: 1,
        height: moderateScale(50),
        borderColor: Colors.databordercolor
    },
    date_container: {
        width: moderateScale(120),

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth: 1,
        height: moderateScale(50),

        borderColor: Colors.databordercolor
    },
    seller_container: {
        width: moderateScale(200),

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth: 1,
        height: moderateScale(50),

        borderColor: Colors.databordercolor
    },
    rate_container: {
        width: moderateScale(120),

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth: 1,
        height: moderateScale(50),

        borderColor: Colors.databordercolor
    },
    bags_container: {
        width: moderateScale(80),

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth: 1,
        height: moderateScale(50),

        borderColor: Colors.databordercolor,
    },
    bardan_container: {
        width: moderateScale(120),

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth: 1,
        height: moderateScale(50),

        borderColor: Colors.databordercolor,
    },
    city_container:{
        width: moderateScale(125),

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal:moderateScale(20),
        borderWidth: 1,
        height: moderateScale(50),

        borderColor: Colors.databordercolor,
    },
    filtercontainer: {

        // borderWidth: 1,
        
        margin: moderateScale(10),
        flexDirection: 'row',
        padding: moderateScale(5),
        borderColor: Colors.primary,
        // borderWidth: 2,
        alignItems: 'center',

    },
    searchcontainer: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        paddingVertical: moderateScale(7),
        paddingHorizontal: moderateScale(7),
        marginLeft: moderateScale(10),
        color: 'black',
        borderRadius:moderateScale(5)
    },
    filterbutton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(5),
        marginHorizontal: moderateScale(5),
        borderWidth: 1,
        borderRadius:moderateScale(10),
        backgroundColor:'white',
        paddingVertical:moderateScale(5)
    },
    filtertext: {
        color: 'black',
        marginHorizontal: moderateScale(4),
        
    },
    searchiconimage:{
        width: moderateScale(23), height: moderateScale(23), marginTop: moderateScale(5),
    },
    filtericonimage:{
        width: moderateScale(23), height: moderateScale(23), marginTop: moderateScale(5),   
    },
    bottomsheetmaincontainer:{
        flex:1,
        borderwidth:1,

    },
    bottomtext:{
        color:'black'
    },
    touchablecontainer:{
        alignItems:'center',
        flex:1,
        justifyContent:'space-around'
    },
    filterbottomsheet:{
        marginHorizontal:moderateScale(20),
      
        padding:moderateScale(5)

    },
    datebottomsheetcontainer:{
paddingTop:moderateScale(20),
alignItems:'center',
flex:1,
    }

})
export default styles;