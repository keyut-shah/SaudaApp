import React  from "react";
import {View,Text} from 'react-native';

import HomeScreen from "../Home/HomeScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatementScreen from "../Statement/StatementScreen";
import WorkScreen from "../Work/WorkScreen";
function NetworkScreen({navigation}){
    return(
        <View>
        <Text>My Network screen</Text>
        </View>
    )
}
function EventScreen({navigation}){
    return(
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
function BottomTab({navigation}){
 
    return (
        <Tab.Navigator
        // tabBar={props => <MyTabBar {...props} />}
        screenOptions={{
            headerShown: false,
            
        }}
        initialRouteName='Home'
      >
        
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Statement" component={StatementScreen} />
        <Tab.Screen name="WorkScreen" component={WorkScreen} />
      
        
  
      
      </Tab.Navigator>
    );
  
}
export default BottomTab;