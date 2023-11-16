
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import NewBardanScreen from '../Bardan/NewBardanScreen';
import ItemTypeScreen from '../ItemType/ItemTypeScreen';
import styles from './WorkStyle';
import DynamicForm from '../NewDemoScreen';
import PhoneSignIn from '../Authentication/AuthenticationScreen';
import auth from '@react-native-firebase/auth';
import LogOutConfirmationModal from '../../common/LogOutModal';
export default WorkScreen = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await auth().signOut();
            // You can navigate to the authentication flow after logout
            navigation.replace('PhoneSignIn');
        } catch (error) {
            console.log("Some error occur while sigout ", error);
            //   console.error('Error logging out:', error.message);
        }
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <View style={styles.contianer}>
            <TouchableOpacity style={styles.datacontainer}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('CreateScreen')}
            >
                <Text style={styles.datatext}>Create New Buyer or Seller</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.datacontainer}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('NewBardanScreen')}
            >
                <Text style={styles.datatext}>Create New Bardan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.datacontainer}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('ItemTypeScreen')}
            >
                <Text style={styles.datatext}>Create Item Bardan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.datacontainer}
                activeOpacity={0.5}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.datatext}>LogOut</Text>
            </TouchableOpacity>
            <LogOutConfirmationModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onDelete={handleLogout}
            />
        </View>
    )
}