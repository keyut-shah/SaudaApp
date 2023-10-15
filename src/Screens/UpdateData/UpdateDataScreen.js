import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, SafeAreaView, Text, View, TouchableOpacity, TextInput, Modal, Button, Image, LogBox } from 'react-native';
import Colors from '../../common/Colors';
import styles from './UpdateDataStyle';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from "react-native-size-matters";
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CreateScreen from '../Create/CreateScreen';
import moment, { normalizeUnits } from 'moment';
import firestore from '@react-native-firebase/firestore';
import Snackbar from "react-native-snackbar";
import Autocomplete from 'react-native-autocomplete-input';
import DeleteConfirmationModal from '../../common/DeleteModal';
export default UpdateScreen = ({ route, navigation }) => {
    const { statementdata } = route.params;
    const [saudadetail, setsaudadetail] = useState(statementdata);
    const [Rate, onChangeRate] = useState('');
    const [Weight, onChangeWeight] = useState('');
    const [Sauda, onChangeSauda] = useState('');
    const [Bags, onChangeBags] = useState('');
    const [Payment, onChangePayment] = useState('');
    const [Notes, onChangeNotes] = useState('');
    const [mySelectedDate, setSelectedDate] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    const autocompletebuyerRef = useRef(null);
    const autocompletesellerRef = useRef(null);

    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [hidingsellerdropdown, sethidingsellerdropdown] = useState(false);

    const [hidingbuyerdropdown, sethidingbuyerdropdown] = useState(false);
    const [buyerquery, setbuyerquery] = useState('');
    const [buyerfilterdata, setbuyerfilterdata] = useState([]);

    const [selectedSellerData, setSelectedSellerData] = useState(null);
    const [selectedBuyerData, setSelectedBuyerData] = useState(null);


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ScreenEditable, setScreenEditable] = useState(false);


    useEffect(() => {
        console.log("statement data route ", statementdata);
        setScreenEditable(false);
        

    }, [])

 

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        const formattedDate = moment(date).format('DD/MM/YYYY');
        setSelectedDate(formattedDate);
        hideDatePicker();
    };



    function generateUniqueId() {
        // Create a timestamp as a base for the ID (you can adjust the format)
        const timestamp = new Date().getTime();

        // Create a random number (you can replace this with your own logic)
        const randomNum = Math.floor(Math.random() * 1000);

        // Combine the timestamp and random number to create the ID
        const uniqueId = `${timestamp}${randomNum}`;

        return uniqueId;
    }

    const addDataansShareData = () => {
        // validation check
        console.log("Seller name contians ", query);
        console.log("Sauda no contains ", Sauda);
        console.log("Buyer ", buyerquery);
        console.log("Rate val ", Rate);
        console.log("Bags contains ", Bags);
        console.log("Weight contains ", Weight);
        if (query.trim() === '' || Sauda.trim() == '' || buyerquery.trim() == '' || Rate.trim() == '' || Bags.trim() == '' || Weight.trim() == '') {
            Snackbar.show({
                text: 'Please write Empty Data ',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
            });
            return;
        }
        const customID = generateUniqueId();
        console.log('Generated custom ID:', customID);

        const usersCollection = firestore().collection('statement');
        const saudainfo = {
            sauda_no: Sauda,
            date: mySelectedDate,
            BuyerName: query,
            SellerName: buyerquery,
            Rate: Rate,
            Bags: Bags,
            Weight: Weight,
            unique_id: customID,

        }
        try {
            usersCollection.doc(customID).set(saudainfo).then(docRef => {

                console.log("Data added doc ref conatins  ", docRef)
                Snackbar.show({
                    text: 'Data Added Successfully ',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'green',
                    textColor: 'white',
                });
                onChangeSellerName('');
                onChangeBuyerName('');
                onChangeRate('');
                onChangeWeight('');
                onChangeSauda('');
                onChangeBags('')
                onChangePayment('')
                onChangeNotes('')
                onChangePayment('')
                setQuery('');
                setbuyerquery('');
                setSelectedSellerData('');
                setSelectedBuyerData('');

            })

        } catch (error) {



            Snackbar.show({
                text: 'Something Went Wrong Please try again',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
            });
            console.error('Error adding data to Firestore: ', error);
        }
    }
    // useEffect(() => {
    //     fetchData();
    // }, []);
    // const fetchData = async () => {
    //     const usersCollection = firestore().collection('users');
    //     const snapshot = await usersCollection.get();
    //     const users = snapshot.docs.map((doc) => doc.data());
    //     console.log("My user data contains ", users);

    //     setData(users);
    // };
    const handleInputChange = (text) => {
        sethidingsellerdropdown(false);
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
        const selectedSeller = data.find((item) => item.companyname === selectedValue);
        console.log("Selected Seller object contains ", selectedSeller)
        setSelectedSellerData(selectedSeller);
        setQuery(selectedValue);
        sethidingsellerdropdown(true);
        if (autocompletesellerRef.current) {
            autocompletesellerRef.current.blur();
        }
    };
    const handleItemSelectBuyer = (selectedValue) => {
        console.log("On select the item from the dropdown ", selectedValue);

        const selectedBuyer = data.find((item) => item.companyname === selectedValue);
        console.log("Selected Seller object contains ", selectedBuyer)
        setSelectedBuyerData(selectedBuyer);
        setbuyerquery(selectedValue);
        sethidingbuyerdropdown(true);
        if (autocompletebuyerRef.current) {
            autocompletebuyerRef.current.blur();
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
    const renderbuyeritem = ({ item }) => {
        // console.log("render item in buyer part is ", item);
        return (
            <TouchableOpacity
                style={{ borderWidth: 1 }}
                onPress={() => handleItemSelectBuyer(item)}>
                <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        ellipsizeMode='tail'

                        style={{ color: 'black', marginVertical: 10 }}>{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    // buyer methods 
    const handlebuyerchange = (text) => {
        sethidingbuyerdropdown(false);
        setbuyerquery(text);

        const filtered = data
            .filter((item) => item.companyname.toLowerCase().includes(text.toLowerCase()))
            .map((item) => item.companyname);

        console.log("My filtered contains ", filtered);
        setbuyerfilterdata(filtered);
    }


    function CustomTextInput(props) {
        return (
            <TextInput
                {...props}
                style={{
                    color: 'black',

                }}
            />
        );
    }



    const handleModalDelete = () => {
        // Perform the delete logic here
        console.log("handle delete method call")
        const uniqueid = statementdata.unique_id;
        console.log("unique id contains ", uniqueid);
        const docRef = firestore().collection('statement').doc(uniqueid);
        docRef
            .delete()
            .then(() => {
                console.log("is user deleted")

            })
            .catch((error) => {
                //   console.error('Error deleting document: ', error);
                Snackbar.show({
                    text: 'Something Went Wrong Please Try Again',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red',
                    textColor: 'white',
                });
                return;
            });
        setIsModalVisible(false);
        navigation.goBack();
    };
    function handleEdit() {
        console.log("handle edit event method is call so now we can edit the screen");
      
        
        onChangeRate(statementdata?.Rate);
        onChangeWeight(statementdata?.Weight);
        onChangeSauda(statementdata?.sauda_no);
        onChangeBags(statementdata?.Bags)
        onChangePayment(statementdata?.Payment)
        onChangeNotes(statementdata?.Notes)
        setQuery(statementdata?.SellerData?.companyname);
        
        setbuyerquery(statementdata?.BuyerData?.companyname);
        setSelectedBuyerData('');
        setSelectedSellerData('');
        setScreenEditable(true);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.statusbar }}>
            <LinearGradient colors={['#f1f7fc', '#e8f2ff', '#cedff5']} style={{ flex: 1, }}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.sty2}>Sanmati/Navkar Brokers </Text>
                </View>
                <View style={[styles.sty3, { paddingVertical: moderateScale(10), flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }]}>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.sty5, {}]}>Sauda No:</Text>
                        {ScreenEditable && <Text style={styles.sty7}>*</Text>}
                        {
                            ScreenEditable ?
                                (
                                    <TextInput
                                        style={[styles.sty15, { marginLeft: moderateScale(10), width: moderateScale(60) }]}
                                        onChangeText={onChangeSauda}
                                        value={Sauda}
                                        keyboardType='numeric'
                                    />
                                ) :
                                (<Text style={{ color: 'black', fontSize: moderateScale(15), marginLeft: moderateScale(10) }}>{statementdata.sauda_no}</Text>)
                        }
                    </View>
                    <View style={{ flexDirection: 'row', marginRight: moderateScale(20) }}>
                        {

                            <TouchableOpacity onPress={showDatePicker} style={{ marginLeft: moderateScale(20) }}>
                                <Image
                                    style={{ width: moderateScale(25), height: moderateScale(25) }}
                                    source={require('../../assets/calendar.png')}
                                />
                            </TouchableOpacity>

                        }
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <Text style={{ color: 'black', fontSize: moderateScale(15), marginLeft: moderateScale(10) }}>{mySelectedDate}</Text>
                    </View>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={styles.sty4}>
                    {/* Seller container  */}
                    <View style={styles.sty3}>
                        {/* Seller heading  */}
                        <View style={[styles.sty6, { marginBottom: moderateScale(10) }]}>
                            <Text style={styles.sty5}>Seller Name :</Text>
                            {ScreenEditable && <Text style={styles.sty7}>*</Text>}
                            {ScreenEditable == false &&
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: moderateScale(15), marginLeft: moderateScale(5) }}>{statementdata?.SellerData?.companyname}</Text>
                                </View>
                            }
                        </View>
                        {/* Seler textinput  */}
                        {
                            ScreenEditable ? (
                                <View style={styles.sty9}>


                                    <Autocomplete

                                        ref={autocompletesellerRef}
                                        // renderTextInput={(props) => <CustomTextInput {...props} />}
                                        hideResults={hidingsellerdropdown}
                                        data={filteredData}
                                        defaultValue={query}
                                        onChangeText={handleInputChange}
                                        renderItem={renderItem}
                                        handleItemSelect={handleItemSelect}
                                        inputContainerStyle={{ borderColor: Colors.primary, }}
                                        listStyle={{}}
                                        flatListProps={{
                                            keyboardShouldPersistTaps: 'always',
                                            renderItem: renderItem
                                        }}
                                    />
                                    <TouchableOpacity style={styles.sty10}
                                        onPress={() => navigation.navigate('CreateScreen')}
                                    >
                                        <Text style={styles.sty11}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            ) :
                                (null)
                            // (<View style={styles.sty9}>
                            //     <Text style={{ color: 'black', fontSize: moderateScale(15), marginLeft: moderateScale(10) }}>{statementdata?.SellerData?.companyname}</Text>
                            // </View>
                            // )
                        }
                        <View style={styles.sty6}>
                            <Text style={styles.sty5}>City :</Text>
                            {
                                ScreenEditable ? (
                                    <Text style={styles.sty17}>{selectedSellerData?.city}</Text>
                                ) :
                                    (
                                        <Text style={{ color: 'black', fontSize: moderateScale(15), marginLeft: moderateScale(10) }}>{statementdata.SellerData?.city}</Text>
                                    )
                            }
                        </View>
                        <View style={[styles.sty6, { marginTop: moderateScale(10) }]}>
                            <Text style={[styles.sty5, {}]}>Mo No :</Text>
                            {
                                ScreenEditable ? (
                                    <Text style={styles.sty17}>{selectedSellerData?.mobile}</Text>
                                ) :
                                    (
                                        <Text style={styles.sty17}>{statementdata?.SellerData?.mobile}</Text>
                                    )
                            }
                        </View>
                    </View>

                    {/* Buyer container  */}
                    <View style={styles.sty3}>
                        {/* buyer heading  */}
                        <View style={[styles.sty6, { marginBottom: moderateScale(10) }]}>
                            <Text style={styles.sty5}>Buyer Name :</Text>
                            {ScreenEditable && <Text style={styles.sty7}>*</Text>}
                            {ScreenEditable == false &&
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: moderateScale(15), marginLeft: moderateScale(5) }}>{statementdata?.BuyerData?.companyname}</Text>
                                </View>
                            }
                        </View>
                        {/* buyer textinput  */}
                        {
                            ScreenEditable ? (
                                <View style={styles.sty9}>

                                    <Autocomplete
                                        hideResults={hidingbuyerdropdown}
                                        ref={autocompletebuyerRef}

                                        // renderTextInput={(props) =>( <CustomTextInput {...props} />)}
                                        data={buyerfilterdata}
                                        defaultValue={buyerquery}
                                        onChangeText={handlebuyerchange}
                                        handleItemSelect={handleItemSelect}
                                        renderItem={renderbuyeritem}
                                        flatListProps={{
                                            keyboardShouldPersistTaps: 'always',
                                            renderItem: renderbuyeritem
                                        }}
                                    />
                                    <TouchableOpacity style={styles.sty10}
                                        onPress={() => navigation.navigate('CreateScreen')}
                                    >
                                        <Text style={styles.sty11}>+</Text>
                                    </TouchableOpacity>

                                </View>
                            ) :
                                (null)
                            // (<View style={styles.sty9}>
                            //     <Text style={{ color: 'black', fontSize: moderateScale(15), marginLeft: moderateScale(10) }}>{statementdata?.BuyerData?.companyname}</Text>
                            // </View>
                            // )
                        }
                        <View style={styles.sty6}>
                            <Text style={styles.sty5}>City :</Text>
                            {
                                ScreenEditable ? (
                                    <Text style={styles.sty17}>{selectedBuyerData?.city}</Text>
                                ) :
                                    (
                                        <Text style={styles.sty17}>{statementdata?.BuyerData?.city}</Text>
                                    )
                            }
                        </View>


                        <View style={[styles.sty6, { marginTop: moderateScale(10) }]}>
                            <Text style={[styles.sty5, {}]}>Mo No :</Text>
                            {
                                ScreenEditable ? (
                                    <Text style={styles.sty17}>{selectedBuyerData?.mobile}</Text>
                                ) :
                                    (
                                        <Text style={styles.sty17}>{statementdata?.BuyerData?.mobile}</Text>
                                    )
                            }

                        </View>



                    </View>

                    {/* other common thing  */}
                    <View style={[styles.sty3, { paddingHorizontal: moderateScale(10) }]}>
                        {/* Rate */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.sty5}>Rate </Text>
                            {ScreenEditable && <Text style={styles.sty7}>*</Text>}
                            <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
                            {
                                ScreenEditable ? (
                                    <TextInput
                                        style={[styles.sty15, { marginLeft: moderateScale(20) }]}
                                        onChangeText={onChangeRate}
                                        value={Rate}

                                    />
                                ) :
                                    (
                                        <Text style={styles.sty17}>{statementdata?.Rate}</Text>
                                    )
                            }
                        </View>
                        {/*  weight*/}
                        <View style={styles.sty12}>
                            <Text style={styles.sty5}>Weight </Text>
                            {ScreenEditable && <Text style={styles.sty7}>*</Text>}
                            <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
                            {
                                ScreenEditable ? (
                                    <TextInput
                                        style={styles.sty15}
                                        onChangeText={onChangeWeight}
                                        value={Weight}

                                    />
                                ) :
                                    (
                                        <Text ellipsizeMode='tail'
                                            style={styles.sty17}>{statementdata?.Weight}</Text>
                                    )
                            }
                        </View>
                        <View style={styles.sty12}>
                            <Text style={styles.sty5}>Bags </Text>
                            {ScreenEditable && <Text style={styles.sty7}>*</Text>}
                            <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
                            {
                                ScreenEditable ? (
                                    <TextInput
                                        style={[styles.sty15, { marginLeft: moderateScale(15), justifyContent: 'center', alignItems: 'center' }]}
                                        onChangeText={onChangeBags}
                                        value={Bags}

                                    />
                                ) :
                                    (
                                        <Text
                                            ellipsizeMode='tail'
                                            style={styles.sty17}>{statementdata?.Bags}</Text>
                                    )
                            }
                        </View>
                        <View style={styles.sty12}>
                            <Text style={styles.sty5}>Payment</Text>

                            <Text style={[styles.sty5, { marginLeft: 1 }]}>:</Text>
                            {
                                ScreenEditable ? (
                                    <TextInput
                                        style={[styles.sty15, { marginLeft: moderateScale(0), flex: 1 }]}
                                        onChangeText={onChangePayment}
                                        value={Payment}

                                    />
                                ) :
                                    <Text ellipsizeMode='tail'
                                        style={styles.sty17}>{statementdata?.Payment}</Text>
                            }
                        </View>
                        <View style={[styles.sty12,]}>
                            <Text style={styles.sty5}>Note </Text>

                            <Text style={[styles.sty5, { marginLeft: 1 }]}>:</Text>
                            {
                                ScreenEditable == false &&
                                <View style={{}}>
                                    <Text
                                        ellipsizeMode='tail'
                                        style={styles.sty17}>{statementdata?.Notes}</Text>
                                </View>
                            }
                        </View>
                        {
                            ScreenEditable ? (
                                <View style={{ marginTop: moderateScale(10) }}>
                                    <TextInput
                                        style={styles.sty16}
                                        onChangeText={onChangeNotes}
                                        value={Notes}

                                    />
                                </View>
                            ) :

                                (null)
                            // <View style={{ marginTop: moderateScale(10) , }}>
                            // <Text style={styles.sty17}>{statementdata?.Notes}</Text>
                            // </View>

                        }

                    </View>
                    {
                        ScreenEditable ?
                            (
                                <View style={styles.bottomview}>
                                    <TouchableOpacity style={styles.SaveContainer}
                                        onPress={addDataansShareData}
                                    >
                                        <Text style={styles.SaveText}>Update</Text>

                                    </TouchableOpacity>
                                </View>

                            ) :
                            (
                                <View style={styles.bottomview}>
                                    <TouchableOpacity style={styles.SaveContainer}
                                        // onPress={() => handleDelete()}
                                        onPress={() => setIsModalVisible(true)}
                                    >
                                        <Text style={styles.SaveText}>Delete</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.SaveContainer}
                                        onPress={() => handleEdit()}
                                    >
                                        <Text style={styles.SaveText}>Edit</Text>

                                    </TouchableOpacity>
                                    <DeleteConfirmationModal
                                        isVisible={isModalVisible}
                                        onClose={() => setIsModalVisible(false)}
                                        onDelete={handleModalDelete}
                                    />
                                </View>
                            )
                    }

                </ScrollView>

            </LinearGradient>
        </SafeAreaView>
    );
};
