import React from 'react';
import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Home/HomeScreen';
import BottomTab from './Screens/BottomTab/BottomTab';
import CreateScreen from './Screens/Create/CreateScreen';
import UpdateDataScreen from './Screens/UpdateData/UpdateDataScreen';
import NewBardanScreen from './Screens/Bardan/NewBardanScreen';
import ItemTypeScreen from './Screens/ItemType/ItemTypeScreen';
import DynamicForm from './Screens/NewDemoScreen';

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

          <Stack.Screen name="HomeTab" component={BottomTab}/>
          <Stack.Screen name="Second" component={SecondScreen} />
          <Stack.Screen name="CreateScreen" component={CreateScreen} />
          <Stack.Screen name="UpdateDataScreen" component={UpdateDataScreen} />
          <Stack.Screen name="NewBardanScreen" component={NewBardanScreen} />
          <Stack.Screen name="ItemTypeScreen" component={ItemTypeScreen} />
          <Stack.Screen name="DynamicForm" component={DynamicForm} />
        

        </Stack.Navigator>
      </NavigationContainer>
    )
}
export default MainRouteConfig;