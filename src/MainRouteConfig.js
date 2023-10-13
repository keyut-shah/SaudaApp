import React from 'react';
import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Home/HomeScreen';
import BottomTab from './Screens/BottomTab/BottomTab';
import CreateScreen from './Screens/Create/CreateScreen';



const Stack = createNativeStackNavigator();


function SecondScreen({navigation}){
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
        <Text style={{backgroundColor:'black'}}>This is my second screen </Text>
        </View>
    )
}
const MainRouteConfig=()=>{
    return(
        
        <NavigationContainer>
        <Stack.Navigator
            screenOptions={{headerShown:false}}
            initialRouteName={BottomTab}
        >

          <Stack.Screen name="HomeTab" component={BottomTab}
          
          />
          <Stack.Screen name="Second" component={SecondScreen} />
          <Stack.Screen name="CreateScreen" component={CreateScreen} />
        

        </Stack.Navigator>
      </NavigationContainer>
    )
}
export default MainRouteConfig;