import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { moderateScale } from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../common/Colors';
import DeleteConfirmationModal from '../../common/DeleteModal';
import Snackbar from 'react-native-snackbar';


export default NewBardan = ({ navigation }) => {

    const [bardandata, setbardandata] = useState([]);
    const [selectedindex, setselectedindex] = useState();
    const [newbardan, setnewbardan] = useState('');
    useEffect(() => {
        console.log("Selected index", selectedindex);


    }, [selectedindex])
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
    const adddatatothefirstore = async () => {

        console.log("does my add method call ");
        if (newbardan !== null && newbardan !== undefined && newbardan.trim() !== '') {
            try {
                const docRef = firestore().collection('extra').doc('4RIEUMiNldcGJ26goLnw');
                const doc = await docRef.get();
                const currentBardantype = doc.data().bardantype || [];
                const updatedBardantype = [...currentBardantype, newbardan];
                await docRef.update({
                    bardantype: updatedBardantype,
                });
                console.log('Data added to the bardantype array successfully!');
                Snackbar.show({
                    text: 'Data Added successfully ',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green',
                    textColor: 'white',
                });
                setnewbardan('');
                navigation.goBack();
            } catch (error) {
                // console.error('Error adding data to the bardantype array:', error);
                console.log("Some error occur while adding the data of bardan type please check ", error);
                Snackbar.show({
                    text: 'Please try again some error occur or report to the admin',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red',
                    textColor: 'white',
                });
            }
        }
        else {
            Snackbar.show({
                text: 'Please add the value first',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
            });
        }

    }
    const deletedatatofirestore = async (deleteitem) => {
        console.log("My Delte bardan data method call ", deleteitem);
        if (deleteitem !== null && deleteitem !== undefined && deleteitem.trim() !== '') {

            try {
                const docRef = firestore().collection('extra').doc('4RIEUMiNldcGJ26goLnw');
                const doc = await docRef.get();
                const currentBardantype = doc.data().bardantype || [];
                const updatedBardantype = currentBardantype.filter(item => item !== deleteitem);
                await docRef.update({
                    bardantype: updatedBardantype,
                });

                console.log('Data deleted from the bardantype array successfully!');
                Snackbar.show({
                    text: 'Data Deleted Successfully successfully ',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green',
                    textColor: 'white',
                });
                navigation.goBack();
            } catch (error) {
                // console.error('Error adding data to the bardantype array:', error);
                console.log("Some error occur while deleting the data of bardan type please check ", error);
                Snackbar.show({
                    text: 'Please try again some error occur or report to the admin',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red',
                    textColor: 'white',
                });
            }
        }
        else {

        }
    }
    return (
        <View style={styles.container}>
            <View style={{ margin: moderateScale(25), justifyContent: 'center', alignItems: 'center', borderWidth: 1, }}>
                <Text style={{ color: 'black', fontSize: moderateScale(20) }}>My Bardan Data Contains  </Text>

            </View>
            <View style={{ maxheight: moderateScale(250), borderWidth: 1 }}>
                <FlatList
                    data={bardandata}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        console.log("item value is ", item);
                        return (
                            <>
                                <TouchableOpacity style={{ justifyContent: 'center', margin: moderateScale(10), }}
                                    onPress={() => {
                                        selectedindex == index ? setselectedindex(null) : setselectedindex(index)
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: moderateScale(18), backgroundColor: Colors.primary, textAlign: 'center', paddingVertical: moderateScale(5) }}>{item}</Text>
                                </TouchableOpacity>
                                {
                                    selectedindex == index &&
                                    (
                                        <TouchableOpacity
                                            style={[styles.deletebuttoncontainer]}
                                            onPress={() => { deletedatatofirestore(item) }}
                                        >
                                            <Text style={styles.touchabletext}>Delete the Data</Text>

                                        </TouchableOpacity>
                                    )
                                }
                            </>
                        )
                    }}
                />
            </View>

            <View style={{ flexDirection: 'row', marginTop: moderateScale(10), height: moderateScale(50), justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: moderateScale(10) }}>
                <View style={{ flex: 5 }}>
                    <TextInput
                        placeholderTextColor={'black'}
                        style={{ color: 'black', backgroundColor: 'white', padding: moderateScale(2), borderRadius: moderateScale(5), borderWidth: 1 }}
                        placeholder='Enter New Bardan Here'
                        value={newbardan}
                        onChangeText={(text) => { setnewbardan(text) }}
                    />
                </View>
                <View style={{ flex: 2, marginHorizontal: moderateScale(5) }}>
                    <TouchableOpacity style={styles.buttoncontainer}
                        onPress={() => { adddatatothefirstore() }}

                    >

                        <Text style={styles.touchabletext}>Add the Data</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1
    },
    buttoncontainer: {
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(5),
        // paddingHorizontal:moderateScale(100),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.primary,
        // width: moderateScale(80),
        justifyContent: 'center',
        alignItems: 'center'
    },
    deletebuttoncontainer: {
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(5),
        // paddingHorizontal:moderateScale(100),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.databordercolor,
        // width: moderateScale(80),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:moderateScale(70)
    },
  touchabletext:{
    
        color: 'white',
        fontSize: moderateScale(12.5),
        fontWeight: 'normal'
    
  }  

})