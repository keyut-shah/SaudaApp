
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from "react-redux";
import { PostAction } from '../../store/actions/PostAction';
import { useFrameCallback } from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';

export default WorkScreen = () => {

    const [apidata, setapidata] = useState('');
    const dispatch = useDispatch()


    // useEffect(() => {
    //     // console.log("does post data method call ")
    //     // dispatch(PostAction());   
    //     const usersCollection = firestore().collection('Users');
    //     console.log("My user collection data contians inside the useeffect", usersCollection);
    // },
    //     []
    // )
    async function usercollectiondata() {

        console.log("does my user collection method call in usercollection data call or not  ");
        const usersCollection = firestore().collection('users');
        
        // console.log("after fetching user collection containss ",usersCollection);
        try {

            // Fetch all documents from the collection
            usersCollection.get()
                .then(querySnapshot => {
                    // Loop through the documents
                    // console.log ("my query snapshot contains ",querySnapshot);

                    querySnapshot.forEach(documentSnapshot => {
                        // Access the data of each document
                        // console.log("My document snapshot contains ",documentSnapshot);
                        const userData = documentSnapshot.data();
                        console.log('User Data:', userData);
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        catch (error) {
            console.log("error while fetching the user collection data is ", error)
        }
    }
    async function adddata() {
        const usersCollection = firestore().collection('users');
        console.log("Add data to the firestore ", usersCollection);
        await usersCollection.add({
            age: "14",
            city: "Banglore",
            name: "Vijay "
        });
    }
    async function querymaker() {
        const usersCollection = firestore().collection('users');

        const usersQuery = usersCollection.where('age', '==', "10");
        
        usersQuery.get()
          .then(querySnapshot => {
            // Loop through the documents
            querySnapshot.forEach(documentSnapshot => {
              // Access the data of each document
              const userData = documentSnapshot.data();
              console.log('User Data:', userData);
            });
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
    return (
        <View style={{ flex: 1, marginTop: moderateScale(20) }}>
            <Text style={{ color: 'red' }}>
                this is my work screen
            </Text>

            <View style={{ height: 'auto' }}>
                <Button
                    title='Click'
                    onPress={async () => {
                        await usercollectiondata();
                    }}
                />
                <Button
                    title='Add'
                    onPress={() => adddata()}
                />
                <Button
                    title='Age = 10'
                    onPress={async () => {
                        await querymaker();
                    }}
                />
                <Text>
                    {apidata}
                </Text>
            </View>
        </View>
    )
}