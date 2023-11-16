import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, SafeAreaView, Text, View, TouchableOpacity, TextInput, Modal, Button, Image, LogBox } from 'react-native';
import Colors from '../../common/Colors';
import styles from './HomeStyle';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from "react-native-size-matters";
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CreateScreen from '../Create/CreateScreen';
import moment, { normalizeUnits } from 'moment';
import firestore from '@react-native-firebase/firestore';
import Snackbar from "react-native-snackbar";
import Autocomplete from 'react-native-autocomplete-input';
import CustomDropdown from '../../common/BardanDropDown';

import DropdownComponent from '../../common/BardanDropDown';
import ItemDropdownComponent from '../../common/ItemDropDown';

import { Platform, PermissionsAndroid, } from "react-native";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import createPDF from '../../common/CreateAndSavePDF';
import ShareSaudaText from '../../common/SaudaText';

export default HomeScreen = ({ navigation }) => {
  const [SellerName, onChangeSellerName] = useState('');
  const [BuyerName, onChangeBuyerName] = useState('');
  const [Rate, onChangeRate] = useState('');
  const [Weight, onChangeWeight] = useState('');
  const [Sauda, onChangeSauda] = useState('');
  const [Bags, onChangeBags] = useState('');
  const [Payment, onChangePayment] = useState('');
  const [Notes, onChangeNotes] = useState('');
  const [mySelectedDate, setSelectedDate] = useState(moment(new Date()).format('DD/MM/YYYY'));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const generatepdf=()=>{
    saveDataToFirestore();
    createPDF(formState);
  }
  const generatetext=()=>{
    ShareSaudaText(formState);
    console.log("Generate Text to sent the details ");
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    console.log("", moment(new Date(date)).format())
    const formattedDate = moment(date).format('DD/MM/YYYY');
    setSelectedDate(formattedDate);
    const isodate = moment(new Date(date)).format()
    setFormState({ ...formState, date: isodate });
    hideDatePicker();
  };

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



  // bardan state
  const [selectedBardan, setSelectedBardan] = useState('');
  const [selectItem, setSelectItem] = useState('');


  const [totalquantity, settotalquantity] = useState('');

  // useEffect(()=>{

  // },[])
  function generateUniqueId() {
    // Create a timestamp as a base for the ID (you can adjust the format)
    const timestamp = new Date().getTime();

    // Create a random number (you can replace this with your own logic)
    const randomNum = Math.floor(Math.random() * 1000);

    // Combine the timestamp and random number to create the ID
    const uniqueId = `${timestamp}${randomNum}`;

    return uniqueId;
  }

  async function updatelastsaudanumber(newValue) {
    console.log("New sauda value is", newValue);
    const docRef = firestore().collection('extra').doc('ezlL8qFWj4DSOYCnhAwd');
    try {
      const extraCollection = await docRef.get();

      if (extraCollection.exists) {
        // The document exists, so you can update the value
        await docRef.update({
          lastregisternumber: newValue
        });
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error updating value:', error);
    }
  };

  // Add Data to the Server

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // // Fetch data from the firestore 
  // const fetchData = async () => {
  //   const usersCollection = firestore().collection('users');
  //   const snapshot = await usersCollection.get();
  //   const users = snapshot.docs.map((doc) => doc.data());
  //   console.log("My user data contains ", users);

  //   setData(users);
  // };

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
    // fetchData();

    // Set up a Firestore listener for real-time updates
    const usersCollection = firestore().collection('users');
    const unsubscribe = usersCollection.onSnapshot((querySnapshot) => {
      const updatedData = querySnapshot.docs.map((doc) => doc.data());
      setData(updatedData);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();


  }, []);

  const [lastsaudano, setlastsaudano] = useState('');
  const fetchlastsaudano = async () => {
    const extraCollection = await firestore().collection('extra').doc('ezlL8qFWj4DSOYCnhAwd');
    const unsubscribe = extraCollection.onSnapshot((doc) => {
      if (doc.exists) {

        const data = doc.data();

        let current_sauda = (data?.lastregisternumber);
        current_sauda += 1;
        console.log("Current Sauda No is ", current_sauda)
        // set current sauda no to the current 
        handleFieldChange('sauda_no', current_sauda, 0);
        // set uniqueid also
        handleFieldChange('unique_id', generateUniqueId(), 0);
        onChangeSauda((current_sauda).toString());
        setlastsaudano((current_sauda).toString());
      }
    });
    return () => {
      unsubscribe();
    };


  }

  useEffect(() => {
    fetchlastsaudano();
    // setlastsaudano(extraCollection.)
  }, [])

  useEffect(() => {
    // This is for to add data to my formstate when user comes first time on screen
    const formattedDate = moment(new Date()).format();
    setFormState({ ...formState, date: formattedDate });
  }, [])
  // handle input change done 
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
    setFormState({ ...formState, SellerData: selectedSeller });
    setSelectedSellerData(selectedSeller);
    setsellerbrokerage(selectedSeller?.brokerage.toString());
    handlebrokeragevalueonsellerselect(selectedSeller);
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
    setFormState({ ...formState, BuyerData: selectedBuyer });
    setSelectedBuyerData(selectedBuyer);
    setbuyerbrokerage(selectedBuyer?.brokerage.toString());
    setbuyerquery(selectedValue);
    handlebrokeragevalueonbuyerselect(selectedBuyer);
    sethidingbuyerdropdown(true);
    if (autocompletebuyerRef.current) {
      autocompletebuyerRef.current.blur();
    }
  };
  function handlebrokeragevalueonsellerselect(selectedSeller) {
    console.log("Handle brokerage value on seller select")
    console.log("My selected seller contains ", selectedSeller);

    const sellerbrokerage = selectedSeller?.brokerage;
    setFormState(prevState => {

      const updateDynamicFields = prevState.dynamicFields.map((dynamicField) => {
        const bags = dynamicField.Bags || 0;
        const updateSellerBrokerage = parseFloat(bags) * parseFloat(sellerbrokerage);
        console.log("My brokerage value for the seller ", updateSellerBrokerage);
        return {
          ...dynamicField,
          sellerbrokerage: updateSellerBrokerage,
        };
      });
      return {
        ...prevState,
        dynamicFields: updateDynamicFields,
      };
    })
  }
  function handlebrokeragevalueonbuyerselect(selectedbuyer) {
    console.log("Handle brokerage value on seller select")
    console.log("My selected seller contains ", selectedbuyer);

    const buyerbrokerage = selectedbuyer?.brokerage;
    setFormState(prevState => {

      const updateDynamicFields = prevState.dynamicFields.map((dynamicField) => {
        const bags = dynamicField.Bags || 0;
        const updateBuyerBrokerage = parseFloat(bags) * parseFloat(buyerbrokerage);
        console.log("My brokerage value for the buyer ", updateBuyerBrokerage);
        return {
          ...dynamicField,
          buyerbrokerage: updateBuyerBrokerage,
        };
      });
      return {
        ...prevState,
        dynamicFields: updateDynamicFields,
      };
    })
  }
  const renderItem = ({ item }) => {
    // console.log("My render item contains ", item);
    return (
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: 'grey' }}
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



  // All the new thing is here 
  const [formState, setFormState] = useState({

    BuyerData: '',
    SellerData: '',
    date: '',

    dynamicFields: [{
      Rate: '',
      Weight: '',
      Bags: '',
      Bardan: '',
      Item: '',
      Payment: '',
      Notes: '',
      sauda_no: '',
      unique_id: generateUniqueId(),
      quantity: 0,
      sellerbrokerage: 0,
      buyerbrokerage: 0,

    },]
  });

  const handleFieldChange = (fieldName, text, index) => {
    setFormState((prevState) => {
      const updatedFields = [...prevState.dynamicFields];
      updatedFields[index][fieldName] = text;
      return {
        ...prevState,
        dynamicFields: updatedFields,
      };
    });
  };
  const handleFieldBagChange = (fieldName, text, index) => {
    const { BuyerData, SellerData, date, dynamicFields } = formState;

    setFormState((prevState) => {
      // Update the Bags field for the specific object
      const updatedField = [...prevState.dynamicFields];
      updatedField[index][fieldName] = text;
      const weight = parseFloat(updatedField[index].Weight)
      const updatedQuantity = weight * parseFloat(text);
      console.log("My quantity value is ", updatedQuantity);
      // Calculate the updated sellerbrokerage for the specific object
      const updatedSellerBrokerage = parseFloat(text) * SellerData?.brokerage;
      const updateBuyerBrokerage = parseFloat(text) * BuyerData?.brokerage;
      // const updateWeightData=parseFload(text)*
      // Update the sellerbrokerage value for the specific object
      updatedField[index].sellerbrokerage = updatedSellerBrokerage;
      updatedField[index].buyerbrokerage = updateBuyerBrokerage;
      updatedField[index].quantity = updatedQuantity;

      return {
        ...prevState,
        dynamicFields: updatedField,
      };
    });

  }
  const handleFieldWeightChange = (fieldName, text, index) => {
    setFormState((prevState) => {
      const updatedField = [...prevState.dynamicFields];
      updatedField[index][fieldName] = text;
      const bags = parseFloat(updatedField[index].Bags);
      const updatedQuantity = bags * parseFloat(text);
      console.log("My updated quantity is ", updatedQuantity);
      updatedField[index].quantity = updatedQuantity;

      return {
        ...prevState,
        dynamicFields: updatedField,
      }
    })
  }
  const addDynamicField = () => {
    console.log("does add method call or not ");
    const customID = generateUniqueId();
    let saudano = parseInt(lastsaudano);
    saudano += 1;
    setlastsaudano(saudano);
    setFormState((prevState) => ({
      ...prevState,
      dynamicFields: [
        ...prevState.dynamicFields,
        {
          Rate: '',
          Weight: '',
          Bags: '',
          Bardan: '',
          Item: '',
          Payment: '',
          Notes: '',
          sauda_no: saudano,
          unique_id: customID,
          quantity: '',
          sellerbrokerage: '',
          buyerbrokerage: '',
        },
      ],
    }));
  };
  // while trying to remove from the index i encounder 1 problem the problem is that
  //  if current no is 6 and add 7,8 while removeing 7 no still at so index specefic remove done later on
  // because of that i think there is problem in data also 
  // problem is in only dropdown and sauda no only other field works fine 
  const removeDynamicField = () => {


    setFormState((prevState) => {
      const updatedFields = [...prevState.dynamicFields];
      if (updatedFields.length > 1) {
        let lastsauda = parseInt(lastsaudano);
        lastsauda -= 1;
        setlastsaudano(lastsauda.toString());
        updatedFields.pop(); // Remove the last field
      }
      return { ...prevState, dynamicFields: updatedFields };
    });
  };
  function ClearStates() {
    onChangeSellerName('');
    onChangeBuyerName('');
    onChangeRate('');
    onChangeWeight('');
    onChangeSauda('');
    onChangeBags('')
    onChangePayment('')
    onChangeNotes('')
    setQuery('');
    setbuyerquery('');
    setSelectedSellerData('');
    setSelectedBuyerData('');
    setSelectedBardan('');
    setSelectItem('');
    setSelectedDate(moment(new Date()).format('DD/MM/YYYY'))
    let uniquenumber = parseInt(lastsaudano);
    uniquenumber += 1;
    onChangeSauda(uniquenumber);
    setFormState({

      BuyerData: '',
      SellerData: '',
      date: moment(new Date()).format(),

      dynamicFields: [{
        Rate: '',
        Weight: '',
        Bags: '',
        Bardan: 'Sabardan',
        Item: 'CottonCake',
        Payment: '',
        Notes: '',
        sauda_no: uniquenumber,
        unique_id: generateUniqueId(),
        quantity: '',
        sellerbrokerage: '',
        buyerbrokerage: '',
      },]
    })
    setsellerbrokerage('');
    setbuyerbrokerage('');
  }
  const saveDataToFirestore = async () => {
    const dataToSave = { ...formState };
    const { BuyerData, SellerData, date, dynamicFields } = formState;
    console.log("usr click on save button now lets check some props");
    console.log("Data i have to save is ", dataToSave);
    // console.log("buyerdata ->", BuyerData);
    // console.log("SellerData -->", SellerData);
    console.log("date-->", date);
    console.log('dynamic fields ', dynamicFields);
    if (query.trim() === '' || buyerquery.trim() == '') {
      Snackbar.show({
        text: 'Please write Empty Data ',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: 'white',
      });
      return;
    }


    updatelastsaudanumber(parseInt(lastsaudano));
    const statementListRef = firestore().collection('statement');


    const batch = firestore().batch(); // Create a single batch for all the writes

   dynamicFields.forEach(async (fieldSet) => {
      const uniqueid = fieldSet?.unique_id;
      console.log("Fieldset value contains ", fieldSet);
      console.log("Unique id contains ====>>>", uniqueid);
      const dataToSave2 = {
        BuyerData,
        SellerData,
        date,
        ...fieldSet,
      };
      console.log("Data to save 2 value contains ",dataToSave2);
      
      const newDocumentRef = statementListRef.doc(uniqueid);
      batch.set(newDocumentRef, dataToSave2);
    });

    try {
      await batch.commit(); // Commit the batch with all the writes
      Snackbar.show({
        text: 'Data Added Successfully ',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'green',
        textColor: 'white',
      });
      ClearStates();

      console.log('Data saved to Firestore');
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };
  useEffect(() => {
    console.log(" sauda no ", lastsaudano)
  }, [lastsaudano])
  useEffect(()=>{
    console.log("My unique id changes  -->>",formState.dynamicFields[0].unique_id);
  },[formState.dynamicFields[0].unique_id])
  useEffect(() => {
    console.log("Form State value contains ==>>>>", formState)
  }, [formState])

  const [sellerbrokerage, setsellerbrokerage] = useState("0");
  const [buyerbrokerage, setbuyerbrokerage] = useState("0");


  useEffect(() => {
    console.log("Seller brokerage ", sellerbrokerage);
    console.log("Buyer brokerage value contains ", buyerbrokerage);
  }, [sellerbrokerage, buyerbrokerage])

  const handleSellerBrokerageInput = (text) => {
    console.log("Handle seller brokerage ")

    setsellerbrokerage(text);

    setFormState(prevState => {

      const updateedsellerdata = {
        ...prevState.SellerData,
        brokerage: parseFloat(text)
      };
      const updatedDynamicFields = prevState.dynamicFields.map((dynamicField) => {
        const bags = dynamicField.Bags || 0;
        const updatedSellerBrokerage = parseFloat(bags) * parseFloat(text)
        return {
          ...dynamicField,
          sellerbrokerage: updatedSellerBrokerage,
        };
      });
      return {
        ...prevState,
        SellerData: updateedsellerdata,
        dynamicFields: updatedDynamicFields,
      };


    })

  }
  const handleBuyerBrokerageInput = (text) => {
    console.log("Handle buyer brokerage");
    setbuyerbrokerage(text);

    setFormState(prevState => {
      const updatebuyerdata = {
        ...prevState?.BuyerData,
        brokerage: parseFloat(text)
      };
      const updateDynamicFields = prevState.dynamicFields.map((dynamicField) => {
        const bags = dynamicField.Bags || 0;
        const updateBuyerBrokerage = parseFloat(bags) * parseFloat(text);
        return {
          ...dynamicField,
          buyerbrokerage: updateBuyerBrokerage,
        };
      });
      return {
        ...prevState,
        BuyerData: updatebuyerdata,
        dynamicFields: updateDynamicFields
      }
    })
  }
  
  const resetDropdown = () => {
    setSelectedValue(null);
    onChange(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.statusbar }}>
      <LinearGradient colors={['#f1f7fc', '#e8f2ff', '#cedff5']} style={{ flex: 1, }}>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.sty2}>Sanmati/Navkar Brokers </Text>
        </View>
        <View style={[styles.sty3, { paddingVertical: moderateScale(10), flexDirection: 'row', alignItems: 'center' }]}>

          <Text style={[styles.sty5, {}]}>Sauda No:</Text>
          <Text style={styles.sty7}>*</Text>


          <Text style={{ color: 'black', marginHorizontal: moderateScale(15) }}>{Sauda}</Text>
          <TouchableOpacity onPress={showDatePicker} style={{ marginLeft: moderateScale(20) }}>
            <Image
              style={{ width: moderateScale(25), height: moderateScale(25) }}
              source={require('../../assets/calendar.png')}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text style={{ color: 'black', fontSize: moderateScale(15), marginLeft: moderateScale(10) }}>{mySelectedDate}</Text>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          style={styles.sty4}>
          {/* Seller container  */}
          <View style={styles.sty3}>
            {/* Seller heading  */}
            <View style={styles.sty6}>
              <Text style={styles.sty5}>Seller Name </Text>
              <Text style={styles.sty7}>*</Text>
            </View>
            {/* Seler textinput  */}
            <View style={styles.sty9}>

              <Autocomplete
                style={{ color: 'black' ,height:moderateScale(45)}}
                ref={autocompletesellerRef}
                // renderTextInput={(props) => <CustomTextInput {...props} />}
                hideResults={hidingsellerdropdown}
                data={filteredData}
                defaultValue={query}
                onChangeText={handleInputChange}
                renderItem={renderItem}
                handleItemSelect={handleItemSelect}
                inputContainerStyle={{ borderColor: Colors.primary, }}
                listContainerStyle={{ maxHeight: moderateScale(120) }}
                flatListProps={{

                  keyboardShouldPersistTaps: 'always',
                  renderItem: renderItem
                }}
                onBlur={() => sethidingsellerdropdown(true)} // Hide on outside click
                onFocus={() => sethidingsellerdropdown(false)} // Show when focused


              />
              <TouchableOpacity style={styles.sty10}
                onPress={() => navigation.navigate('CreateScreen')}
              >
                <Text style={styles.sty11}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sty6}>
              <Text style={styles.sty5}>City :</Text>
              <Text style={styles.sty17}>{selectedSellerData?.city}</Text>
            </View>
            <View style={[styles.sty6, { marginTop: moderateScale(10) }]}>
              <Text style={[styles.sty5, {}]}>Mo No :</Text>
              <Text style={styles.sty17}>{selectedSellerData?.mobile}</Text>
            </View>
            <View style={styles.sty12}>
              <Text style={styles.sty5}>Brokerage</Text>
              {/* <Text style={styles.sty7}>*</Text> */}
              <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
              {/* <TextInput
                    style={styles.sty15}
                    onChangeText={(text) => handleFieldChange('Weight', text, index)}
                    value={formState.dynamicFields[index].Weight}
                  /> */}
              <TextInput
                keyboardType='decimal-pad'
                style={styles.sty15}
                onChangeText={handleSellerBrokerageInput}
                value={sellerbrokerage}
              />
            </View>
          </View>

          {/* Buyer container  */}
          <View style={styles.sty3}>
            {/* buyer heading  */}
            <View style={styles.sty6}>
              <Text style={styles.sty5}>Buyer Name </Text>
              <Text style={styles.sty7}>*</Text>
            </View>
            {/* buyer textinput  */}
            <View style={styles.sty9}>

              <Autocomplete
                style={{ color: 'black',height:moderateScale(45) }}
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
                listContainerStyle={{ maxHeight: moderateScale(120) }}
                onBlur={() => sethidingbuyerdropdown(true)} // Hide on outside click
                onFocus={() => sethidingbuyerdropdown(false)} // Show when focused

              />
              <TouchableOpacity style={styles.sty10}
                onPress={() => navigation.navigate('CreateScreen')}
              >
                <Text style={styles.sty11}>+</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.sty6}>
              <Text style={styles.sty5}>City :</Text>
              <Text style={styles.sty17}>{selectedBuyerData?.city}</Text>
            </View>


            <View style={[styles.sty6, { marginTop: moderateScale(10) }]}>
              <Text style={[styles.sty5, {}]}>Mo No :</Text>
              <Text style={styles.sty17}>{selectedBuyerData?.mobile}</Text>
            </View>
            {/* <Text style={[styles.sty5, { marginTop: moderateScale(10) }]}>Mo No :</Text> */}

            <View style={styles.sty12}>
              <Text style={styles.sty5}>Brokerage</Text>
              {/* <Text style={styles.sty7}>*</Text> */}
              <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
              {/* <TextInput
                    style={styles.sty15}
                    onChangeText={(text) => handleFieldChange('Weight', text, index)}
                    value={formState.dynamicFields[index].Weight}
                  /> */}
              <TextInput
                keyboardType='decimal-pad'
                style={styles.sty15}
                onChangeText={handleBuyerBrokerageInput}
                value={buyerbrokerage}
              />
            </View>
          </View>

          {/* other common thing  */}
          {formState.dynamicFields.map((field, index) => (

            // console.log("My Field Value is  ", field),
            // console.log("Current index of dynamic field is ", index),
            <View key={index}>
              <View style={[styles.sty3,]}>
                {(index == 0) ?
                  (

                    <View style={styles.bottomview}>
                      <TouchableOpacity style={styles.AddContainer}
                        onPress={addDynamicField}
                      >
                        <Text style={styles.AddText}>+</Text>

                      </TouchableOpacity>
                    </View>
                  )
                  : (
                    <View style={styles.bottomview}>
                      <TouchableOpacity style={styles.SubContainer}
                        onPress={removeDynamicField}
                      >
                        <Text style={styles.AddText}>__</Text>

                      </TouchableOpacity>
                    </View>
                  )}
                {/* Rate */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.sty5}>Rate</Text>
                  {/* <Text style={styles.sty7}>*</Text> */}
                  <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
                  <TextInput
                    style={[styles.sty15, { marginLeft: moderateScale(20) }]}
                    onChangeText={(text) => handleFieldChange('Rate', text, index)}
                    value={formState.dynamicFields[index].Rate}
                  />
                </View>
                {/*  weight*/}
                <View style={styles.sty12}>
                  <Text style={styles.sty5}>Weight</Text>
                  {/* <Text style={styles.sty7}>*</Text> */}
                  <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
                  <TextInput
                    style={styles.sty15}
                    onChangeText={(text) => handleFieldWeightChange('Weight', text, index)}
                    value={formState.dynamicFields[index].Weight}
                  />
                </View>
                {/* Bags */}
                <View style={styles.sty12}>
                  <Text style={styles.sty5}>Bags</Text>
                  {/* <Text style={styles.sty7}>*</Text> */}
                  <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
                  <TextInput
                    style={[styles.sty15, { marginLeft: moderateScale(15), justifyContent: 'center', alignItems: 'center' }]}
                    onChangeText={(text) => handleFieldBagChange('Bags', text, index)}
                    value={formState.dynamicFields[index].Bags}
                  />
                </View>
                {/* Bardan Type */}
                <View style={styles.sty12}>
                  <Text style={styles.sty5}>Bardan</Text>
                  {/* <Text style={styles.sty7}>*</Text> */}
                  <DropdownComponent
                    value={formState.dynamicFields[index].Bardan}
                    onChange={(item) => {
                      handleFieldChange('Bardan', item?.label, index);
                    }}
                    onBlur={resetDropdown}

                  />
                </View>

                {/* Item Type */}
                <View style={styles.sty12}>
                  <Text style={styles.sty5}>ItemType</Text>
                  {/* <Text style={styles.sty7}>*</Text> */}
                  <ItemDropdownComponent

                    value={formState.dynamicFields[index].Item}
                    onChange={(item) => {
                      handleFieldChange('Item', item?.label, index);
                    }}
                  />
                </View>
                {/* Payment */}
                <View style={styles.sty12}>
                  <Text style={styles.sty5}>Payment : </Text>
                  <TextInput
                    style={[styles.sty15, { marginLeft: moderateScale(0), flex: 1 }]}
                    onChangeText={(text) => handleFieldChange('Payment', text, index)}
                    value={formState.dynamicFields[index].Payment}

                  />
                </View>

                {/* Note */}
                <View style={styles.sty12}>
                  <Text style={styles.sty5}>Note :</Text>
                </View>
                <View style={{ marginTop: moderateScale(10) }}>
                  <TextInput
                    style={styles.sty16}
                    onChangeText={(text) => handleFieldChange('Notes', text, index)}
                    value={formState.dynamicFields[index].Notes}
                  />
                </View>


              </View>
            </View>
          ))}
    <View style={{flexDirection:'row',borderWidth:1,justifyContent:'space-between',marginHorizontal:10}}>
          <View style={styles.bottomview}>
            <TouchableOpacity style={styles.SaveContainer}
              onPress={saveDataToFirestore}
            >
              <Text style={styles.SaveText}>Save</Text>

            </TouchableOpacity>
          </View>
          <View style={styles.bottomview}>
            <TouchableOpacity style={styles.SaveContainer}
              onPress={generatepdf}
            >
              <Text style={styles.SaveText}>Save and Share as Pdf</Text>

            </TouchableOpacity>
          </View>
          <View style={styles.bottomview}>
            <TouchableOpacity style={styles.SaveContainer}
              onPress={generatetext}
            >
              <Text style={styles.SaveText}>Save and Share as Text</Text>

            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>

      </LinearGradient>
    </SafeAreaView>
  );
};
