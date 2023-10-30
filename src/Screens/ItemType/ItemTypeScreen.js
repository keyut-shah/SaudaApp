import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { moderateScale } from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../common/Colors';

export default  ItemType= () => {

    const [itemdata, setitemdata] = useState([]);
    useEffect(() => {
        console.log("Bardan data contains ", itemdata)
    }, [itemdata])
    const fetchdata = async () => {
        const bardancollection = await firestore().collection('extra').doc('9A0AG6Ag4oAPQV2YLx3u');
        bardancollection.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    console.log("object contains ", data);

                    if (data && data.itemtype) {
                        console.log("does it go here ")
                        const arrayData = data.itemtype;
                        setitemdata(arrayData);
                        // Now you can access the values within the array
                        for (const value of arrayData) {
                            console.log('Array Value:', value);
                        }
                    } else {
                        console.log('No array data found.');
                    }
                } else {
                    console.log('Document does not exist.');
                }
            })
            .catch((error) => {
                console.error('Error getting document data:', error);
            });
    }
    useEffect(() => {
        fetchdata();
    }, [])
    return (
        <View style={styles.container}>
            <View style={{ margin: moderateScale(25), justifyContent: 'center', alignItems: 'center', borderWidth: 1, }}>
                <Text style={{ color: 'black', fontSize: moderateScale(20) }}>My Item  Contains  </Text>

            </View>
            <View style={{height:moderateScale(150),borderWidth:1}}>
                <FlatList
                    data={itemdata}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{justifyContent:'center',margin:moderateScale(10),}}>
                        <Text style={{color:'white',fontSize:moderateScale(18),backgroundColor:Colors.primary,textAlign:'center',paddingVertical:moderateScale(5)}}>{item}</Text>
                        </View>
                    )}
                />
                </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1
    }
})