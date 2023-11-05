import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { moderateScale } from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../common/Colors';
import DeleteConfirmationModal from '../../common/DeleteModal';

export default NewBardan = () => {

    const [bardandata, setbardandata] = useState([]);
    const [selectedindex, setselectedindex] = useState();
    useEffect(()=>{
        console.log("Selected index",selectedindex);

        
    },[selectedindex])
    useEffect(() => {
        console.log("Bardan data contains ", bardandata)
    }, [bardandata])
    const fetchdata = async () => {
        const bardancollection = await firestore().collection('extra').doc('4RIEUMiNldcGJ26goLnw');
        bardancollection.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    console.log("object contains ", data);

                    if (data && data.bardantype) {
                        console.log("does it go here ")
                        const arrayData = data.bardantype;
                        setbardandata(arrayData);
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
                <Text style={{ color: 'black', fontSize: moderateScale(20) }}>My Bardan Data Contains  </Text>

            </View>
            <View style={{ height: moderateScale(150), borderWidth: 1 }}>
                <FlatList
                    data={bardandata}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item ,index}) => (
                        <TouchableOpacity style={{ justifyContent: 'center', margin: moderateScale(10), }}
                        onPress={()=>{setselectedindex(index)}}
                        >
                            <Text style={{ color: 'white', fontSize: moderateScale(18), backgroundColor: Colors.primary, textAlign: 'center', paddingVertical: moderateScale(5) }}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            
            <View style={{ flexDirection: 'row', borderWidth: 1, height: moderateScale(50),justifyContent:'space-around' }}>
                <Button
                    title='Delete'
                    onPress={()=>{console.log("on delete method call")}}
                />
                <Button
                    title='Add the data '
                    onPress={()=>{ console.log("on Add the data method call")}}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1
    },

})