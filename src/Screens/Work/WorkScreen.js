
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import NewBardanScreen from '../Bardan/NewBardanScreen';
import ItemTypeScreen from '../ItemType/ItemTypeScreen';
import styles from './WorkStyle';
import DynamicForm from '../NewDemoScreen';
export default WorkScreen = ({ navigation }) => {


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
            {/* <TouchableOpacity style={styles.datacontainer}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('DynamicForm')}
            >
                <Text style={styles.datatext}>Create Item Bardan</Text>
            </TouchableOpacity> */}
        </View>
    )
}