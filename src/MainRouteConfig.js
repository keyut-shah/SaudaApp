import React,{useState,useEffect} from 'react';
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
import PhoneSignIn from './Screens/Authentication/AuthenticationScreen';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();



const MainRouteConfig=()=>{
    const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged((authUser) => {
    console.log("My auth user contains ",authUser);
    setUser(authUser);
  });

  return unsubscribe; // unsubscribe on unmount
}, []);
useEffect(()=>{
console.log("My user value contains ",user );
},[user])
    return(
        
        <NavigationContainer>
        <Stack.Navigator
            screenOptions={{headerShown:false}}
            initialRouteName={BottomTab}
            
        >
        {user ? (
            <>
          <Stack.Screen name="HomeTab" component={BottomTab}/>
          <Stack.Screen name="CreateScreen" component={CreateScreen} />
          <Stack.Screen name="UpdateDataScreen" component={UpdateDataScreen} />
          <Stack.Screen name="NewBardanScreen" component={NewBardanScreen} />
          <Stack.Screen name="ItemTypeScreen" component={ItemTypeScreen} />
          <Stack.Screen name="DynamicForm" component={DynamicForm} />
          </>
          ) : (
        <Stack.Screen name="PhoneSignIn"  component={PhoneSignIn} />
        )}
        </Stack.Navigator>
      </NavigationContainer>
    )
}
export default MainRouteConfig;