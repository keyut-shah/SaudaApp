import React, { useState, useEffect, useRef } from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
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
import Autocomplete from 'react-native-autocomplete-input';
import DeleteConfirmationModal from '../../common/DeleteModal';


function CreateScreen({ navigation }) {
    const [TraaderName, onChangeTraderName] = useState('');
    const [PartyName, onChangePartyName] = useState('');
    const [city, onChangeCity] = useState('');
    const [address, onChangeAddress] = useState('');
    const [mobile_no, onChangeMoNo] = useState('');
    const [gst_no, onChangeGSTNo] = useState('');


    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);

    const autocompletetraderRef = useRef(null);
    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState('');

    const [hidingtraderdropdown, sethidingtraderdropdown] = useState(false);


    const [ScreenEditable, setScreenEditable] = useState(false);
    const [selectedtradervalue, setselectedtradervalue] = useState('');

    // DeleteModal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [uniqueid, setuniqueid] = useState('');

    // Brokerage
    const[traderbrokerage,settraderbrokerage]=useState('');
    const fetchData = async () => {
        console.log("does fetch user method call")
        const usersCollection = firestore().collection('users');
        const snapshot = await usersCollection.get();
        const users = snapshot.docs.map((doc) => doc.data());
        console.log("My user data contains ", users);
        setData(users);
    };

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();

        // Set up a Firestore listener for real-time updates
        const usersCollection = firestore().collection('users');
        const unsubscribe = usersCollection.onSnapshot((querySnapshot) => {
            const updatedData = querySnapshot.docs.map((doc) => doc.data());
            setData(updatedData);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    function generateUniqueId() {
        // Create a timestamp as a base for the ID (you can adjust the format)
        const timestamp = new Date().getTime();

        // Create a random number (you can replace this with your own logic)
        const randomNum = Math.floor(Math.random() * 1000);

        // Combine the timestamp and random number to create the ID
        const uniqueId = `${timestamp}${randomNum}`;

        return uniqueId;
    }
    const handleInputChange = (text) => {
        console.log("What happens while input change ", text);
        sethidingtraderdropdown(false);
        // console.log("text contians in textinput is --> ", text);
        setQuery(text);

        // Filter the data based on the query
        const filtered = data
            .filter((item) => item.companyname.toLowerCase().includes(text.toLowerCase()))
            .map((item) => item.companyname);

        console.log("My filtered contains ", filtered);
        setFilteredData(filtered);
    };
    const handleItemSelect = (selectedValue) => {
        console.log("On select the item from the dropdown ", selectedValue);
        const selectedTrader = data.find((item) => item.companyname === selectedValue);
        console.log("Selected Tradder object contains ", selectedTrader)

        setselectedtradervalue(selectedTrader)
        onChangePartyName(selectedTrader?.companyname);
        onChangeAddress(selectedTrader?.address);
        onChangeCity(selectedTrader?.city)
        onChangeTraderName(selectedTrader?.name);
        onChangeMoNo(selectedTrader?.mobile);
        onChangeGSTNo(selectedTrader?.gst);
        setuniqueid(selectedTrader?.customid);
        setScreenEditable(true);
        setQuery(selectedValue);
        sethidingtraderdropdown(true);
        settraderbrokerage((selectedTrader?.brokerage).toString())
        if (sethidingtraderdropdown.current) {
            sethidingtraderdropdown.current.blur();
        }
    };
    const renderItem = ({ item }) => {
        // console.log("My render item contains ", item);
        return (
            <TouchableOpacity
                style={{ borderWidth: 1 }}
                onPress={() => handleItemSelect(item)}>
                <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        ellipsizeMode='tail'
                        style={{ color: 'black', marginVertical: 10 }}>{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //fetch user data 



    const addDataToFirestore = async () => {
        // setLoading(true);
        const customID = generateUniqueId();
        const usersCollection = firestore().collection('users').doc(customID);
        if(PartyName==null || PartyName.trim()=='' || PartyName==undefined){
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
            name: TraaderName,
            address: address,
            city: city,
            gst: gst_no,
            mobile: mobile_no,
            customid: customID,
            brokerage:parseFloat(traderbrokerage)
        };
        try {
            usersCollection.set(sellerdata).then(docRef => {
                setLoading(false);
                console.log("Data added doc ref conatins  ", docRef)
                Snackbar.show({
                    text: 'Data Added Successfully ',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green',
                    textColor: 'white',
                });
                clearstatedata();
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

    const updateDataToFirestore = async () => {
        console.log("Here trying to update data of my Trader");
        if(PartyName==null || PartyName.trim()=='' || PartyName==undefined)
        {
            Snackbar.show({
                text: 'Please write part name',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
            });
            return;
        }
        let updatetraderdata = {
            address: address,
            city: city,
            companyname: PartyName,
            gst: gst_no,
            mobile: mobile_no,
            name: TraaderName,
            customid: uniqueid,
            brokerage:parseFloat(traderbrokerage),
        }
        console.log("MY updatetraders data contains ",updatetraderdata);
        // Also trying to update in statement data but how can i update thats the challenfe 
        // maybe find my solution where seller.uniqueid== current maybe work letts try it 
        try {
            await firestore()
                .collection('users')
                .doc(uniqueid)
                .update(updatetraderdata)


            const statementCollection = firestore().collection('statement');
            const sellerStatementQuerySnapshot = await statementCollection.where('SellerData.customid', '==', uniqueid).get();
            sellerStatementQuerySnapshot.forEach((doc) => {
                const statementRef = statementCollection.doc(doc.id);
                statementRef.update({ 'SellerData': updatetraderdata });
            });

            const buyerStatementQuerySnapshot = await statementCollection.where('BuyerData.customid', '==', uniqueid).get();

            buyerStatementQuerySnapshot.forEach((doc) => {
                const statementRef = statementCollection.doc(doc.id);
                statementRef.update({ 'BuyerData': updatetraderdata });
            });
            console.log("User data updated successfully");
            Snackbar.show({
                text: 'User Update successfully',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'green',
                textColor: 'white',
            });
            clearstatedata();
        } catch (error) {
            console.log("Error while updating user details: " + error);
            Snackbar.show({
                text: 'Error While Updating data. Please Try Again',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
            });
        }
    }
    const deleteDataToFireStore = async () => {
        console.log("Here trying to delete data of the firestore ");

        // firestore()
        //     .collection('users')
        //     .where('companyname', '==', selectedtradervalue?.companyname)
        //     .doc(uniqueid)
        //     .get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             doc.ref
        //                 .delete()
        //                 .then(() => {
        //                     console.log('Document successfully deleted.');
        //                     Snackbar.show({
        //                         text: 'Document Deleted Successfully',
        //                         duration: Snackbar.LENGTH_SHORT,
        //                         backgroundColor: 'green',
        //                         textColor: 'white',
        //                     });
        //                     clearstatedata();
        //                 })
        //                 .catch((error) => {
        //                     console.log("errro while removing document is ", error);

        //                     Snackbar.show({
        //                         text: 'Error While removing Document please try again ',
        //                         duration: Snackbar.LENGTH_SHORT,
        //                         backgroundColor: 'red',
        //                         textColor: 'white',
        //                     });
        //                 });
        //         });
        //     })
        //     .catch((error) => {
        //         console.error('Error getting documents: ', error);
        //     });

        firestore()
        .collection('users')
        .doc(selectedtradervalue?.customid) // Assuming customid is the document ID
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            docSnapshot.ref
              .delete()
              .then(() => {
                console.log('Document successfully deleted.');
                Snackbar.show({
                  text: 'Document Deleted Successfully',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: 'green',
                  textColor: 'white',
                });
                clearstatedata();
                setIsModalVisible(false);
              })
              .catch((error) => {
                console.log('Error while removing document: ', error);
                Snackbar.show({
                  text: 'Error While removing Document, please try again ',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: 'red',
                  textColor: 'white',
                });
              });
          } else {
            console.log('Document not found');
            Snackbar.show({
              text: 'Document not found',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: 'red',
              textColor: 'white',
            });
          }
        })
        .catch((error) => {
          console.error('Error getting document: ', error);
        });
      



    }
    const clearstatedata = () => {
        onChangeTraderName('');
        onChangePartyName('');
        onChangeCity('');
        onChangeAddress('');
        onChangeMoNo('');
        onChangeAddress('');
        onChangeGSTNo('');
        settraderbrokerage('');
    }
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
                            {/* My Search Bar */}
                            <View style={{
                                margin: moderateScale(10), flexDirection: 'row',
                                padding: moderateScale(5),
                                borderColor: Colors.primary, borderWidth: 2
                            }}>
                                <Image
                                    style={{ width: moderateScale(23), height: moderateScale(23), marginTop: moderateScale(5), }}
                                    source={require('../../assets/search_symbol.png')}
                                />
                                <Autocomplete
                                    clearButtonMode="always"
                                    style={{ color: 'black', }}
                                    ref={autocompletetraderRef}


                                    data={filteredData}
                                    defaultValue={query}
                                    onChangeText={handleInputChange}
                                    renderItem={renderItem}
                                    handleItemSelect={handleItemSelect}
                                    inputContainerStyle={{ borderWidth: 0, marginLeft: moderateScale(5) }}
                                    listContainerStyle={{ maxHeight: moderateScale(120) }}
                                    onBlur={() => sethidingtraderdropdown(true)} // Hide on outside click
                                    onFocus={() => sethidingtraderdropdown(false)} // Show when focused
                                    hideResults={hidingtraderdropdown}
                                    // hideResults={hideResultProduct}

                                    flatListProps={{

                                        keyboardShouldPersistTaps: 'always',
                                        renderItem: renderItem
                                    }}

                                />
                            </View>

                            <ScrollView style={{}}>
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
                                        onChangeText={onChangeTraderName}
                                        value={TraaderName}

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
                                {/* Brokerage */}
                                <View style={styles.sty12}>
                                    <Text style={styles.sty5}>Brokerage</Text>
                                    {/* <Text style={styles.sty7}>*</Text> */}
                                    <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
                                    <TextInput

                                        style={styles.sty15}
                                        onChangeText={settraderbrokerage}
                                        value={traderbrokerage}

                                    />
                                </View>
                                {/* address */}
                                <View style={[styles.sty6, { marginTop: moderateScale(10) }]}>
                                    <Text style={styles.sty5}>Address :</Text>

                                </View>
                                <View style={styles.sty9}>
                                    <TextInput
                                    numberOfLines={2}
                                        style={styles.sty8}
                                        onChangeText={onChangeAddress}
                                        value={address}
                                        multiline={true}


                                    />

                                </View>


                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(10),marginBottom:moderateScale(20) }}>
                                {
                                    ScreenEditable ?
                                        (
                                            <>
                                                <TouchableOpacity style={styles.sty18} onPress={() => setIsModalVisible(true)}>
                                                    <Text style={styles.sty17}>Delete</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.sty18}
                                                    onPress={updateDataToFirestore}
                                                >
                                                    <Text style={styles.sty17}>Update</Text>
                                                </TouchableOpacity>
                                                <DeleteConfirmationModal
                                                    isVisible={isModalVisible}
                                                    onClose={() => setIsModalVisible(false)}
                                                    onDelete={deleteDataToFireStore}
                                                />
                                            </>
                                        ) :
                                        (
                                            <>
                                                <TouchableOpacity style={styles.sty18} onPress={() => navigation.goBack()}>
                                                    <Text style={styles.sty17}>Back</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.sty18}
                                                    onPress={addDataToFirestore}
                                                >
                                                    <Text style={styles.sty17}>Save</Text>
                                                </TouchableOpacity>
                                            </>
                                        )
                                }
                            </View>

                            </ScrollView>
                           
                        </>
                    )

            }
        </LinearGradient >

    )
}
export default CreateScreen;