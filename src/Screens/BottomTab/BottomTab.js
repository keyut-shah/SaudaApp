import React from "react";
import { View, Text, Image } from 'react-native';

import HomeScreen from "../Home/HomeScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatementScreen from "../Statement/StatementScreen";
import WorkScreen from "../Work/WorkScreen";
import BottomSheet, {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { moderateScale } from "react-native-size-matters";
import Colors from "../../common/Colors";
function NetworkScreen({ navigation }) {
    return (
        <View>
            <Text>My Network screen</Text>
        </View>
    )
}
function EventScreen({ navigation }) {
    return (
        <View>
            <Text>My Event screen</Text>
        </View>
    )
}
// function WorkScreen({navigation}){
//     return(
//         <View>
//         <Text>My Work screen</Text>
//         </View>
//     )
// }
const Tab = createBottomTabNavigator();
function BottomTab({ navigation }) {

    return (
        <BottomSheetModalProvider>
            <Tab.Navigator
                // tabBar={props => <MyTabBar {...props} />}
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        minHeight: moderateScale(60),
                        maxHeight:moderateScale(70),
                        justifyContent:'center',
                        alignItems:'center',
                        paddingBottom:moderateScale(5)
                        // padding:moderateScale(10)

                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let imageName;

                        if (route.name === 'Home') {
                            imageName = focused ? require('../../assets/homeselect.png') : require('../../assets/home0.png');
                        } else if (route.name === 'Statement') {
                            imageName = focused ? require('../../assets/statement.png') : require('../../assets/statement_notselected.png');
                        } else if (route.name === 'Menu') {
                            imageName = focused ? require('../../assets/menu_selected.png') : require('../../assets/menu.png');
                        }

                        return <Image source={imageName} style={{ width: moderateScale(24), height: moderateScale(24), }} />;
                    },
                    tabBarLabelStyle:({focused})=>{
                        color:focused?Colors.primary:'black'
                    }
              
                })}

                initialRouteName='Home'
            >
                <Tab.Screen
                    name="Home" component={HomeScreen} />
                <Tab.Screen name="Statement" component={StatementScreen} />
                <Tab.Screen name="Menu" component={WorkScreen} />
            </Tab.Navigator>
        </BottomSheetModalProvider>




    );

}
export default BottomTab;