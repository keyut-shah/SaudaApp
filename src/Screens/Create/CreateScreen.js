import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import styles from "./CreateStyle";
import { moderateScale } from "react-native-size-matters";
import moment from 'moment';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Snackbar from "react-native-snackbar";
import Colors from "../../common/Colors";
import Loader, { showLoader, hideLoader } from "../../common/Loader";
import { Modal } from "react-native-paper";


function CreateScreen({ navigation }) {
    const [SellerName, onChangeSellerName] = useState('');
    const [PartyName, onChangePartyName] = useState('');
    const [city, onChangeCity] = useState('');
    const [address, onChangeAddress] = useState('');
    const [mobile_no, onChangeMoNo] = useState('');
    const [gst_no, onChangeGSTNo] = useState('');


    const [loading, setLoading] = useState(false);


    const addDataToFirestore = async () => {
        // setLoading(true);
        const usersCollection = firestore().collection('users');
        if (PartyName.trim() === '') {
            Snackbar.show({
                text: 'Please write Company Name',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
            });
            return;
        }

        const sellerdata = {
            companyname: PartyName,
            name: SellerName,
            address: address,
            city: city,
            gst: gst_no,
            mobile: mobile_no,
        };
        try {
            usersCollection.add(sellerdata).then(docRef => {
                setLoading(false);
                console.log("Data added doc ref conatins  ", docRef)
                Snackbar.show({
                    text: 'Data Added Successfully ',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green',
                    textColor: 'white',
                });
                onChangeSellerName('');
                onChangePartyName('');
                onChangeCity('');
                onChangeAddress('');
                onChangeMoNo('');
                onChangeAddress('')
                // You can perform additional actions here after a successful addition, if needed.
            })

        } catch (error) {
            setLoading(false);


            Snackbar.show({
                text: 'Something Went Wrong Please try again',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
            });
            console.error('Error adding data to Firestore: ', error);
        }
    };

    return (


        <LinearGradient colors={['#f1f7fc', '#e8f2ff', '#cedff5']} style={{ flex: 1, }}>
            {
                loading ? (
                    <Modal
                        visible={true}
                        transparent={true}

                    >
                        <View style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <View style={{
                                height: moderateScale(100),
                                width: moderateScale(100),
                                borderRadius: moderateScale(4),
                                backgroundColor: 'white'
                            }}>
                                <ActivityIndicator color={Colors.primary} />
                            </View>
                        </View>
                    </Modal>
                ) :
                    (
                        <>
                            <View style={styles.sty3}>

                                <View style={styles.sty6}>
                                    <Text style={styles.sty5}>Company Name </Text>
                                    <Text style={styles.sty7}>*</Text>
                                </View>

                                <View style={styles.sty9}>
                                    <TextInput
                                        style={styles.sty8}
                                        onChangeText={onChangePartyName}
                                        value={PartyName}

                                    />

                                </View>
                                {/*City  */}
                                <View style={styles.sty6}>
                                    <Text style={styles.sty5}>City :</Text>

                                </View>
                                <View style={styles.sty9}>
                                    <TextInput
                                        style={styles.sty8}
                                        onChangeText={onChangeCity}
                                        value={city}

                                    />

                                </View>

                                {/* Seller / Buyer Name */}
                                <View style={styles.sty6}>
                                    <Text style={styles.sty5}>Person Name</Text>

                                </View>
                                <View style={styles.sty9}>
                                    <TextInput
                                        style={styles.sty8}
                                        onChangeText={onChangeSellerName}
                                        value={SellerName}

                                    />

                                </View>

                                {/* mobile no */}
                                <View style={styles.sty12}>
                                    <Text style={styles.sty5}> Mo No </Text>
                                    {/* <Text style={styles.sty7}>*</Text> */}
                                    <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={styles.sty15}
                                        onChangeText={onChangeMoNo}
                                        value={mobile_no}

                                    />
                                </View>
                                {/* GST No: */}
                                <View style={styles.sty12}>
                                    <Text style={styles.sty5}>GST No</Text>
                                    {/* <Text style={styles.sty7}>*</Text> */}
                                    <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
                                    <TextInput

                                        style={styles.sty15}
                                        onChangeText={onChangeGSTNo}
                                        value={gst_no}

                                    />
                                </View>
                                {/* address */}
                                <View style={[styles.sty6, { marginTop: moderateScale(10) }]}>
                                    <Text style={styles.sty5}>Address :</Text>

                                </View>
                                <View style={styles.sty9}>
                                    <TextInput
                                        style={styles.sty8}
                                        onChangeText={onChangeAddress}
                                        value={address}
                                        multiline={true}


                                    />

                                </View>


                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(10) }}>
                                <TouchableOpacity style={styles.sty18} onPress={() => navigation.goBack()}>
                                    <Text style={styles.sty17}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.sty18}
                                    onPress={addDataToFirestore}
                                >
                                    <Text style={styles.sty17}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )

            }
        </LinearGradient>

    )
}
export default CreateScreen;