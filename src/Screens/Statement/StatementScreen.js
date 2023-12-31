import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { View, Button, ScrollView, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import styles from './StatementStyle';
import { moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-naviation/native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import BottomSheet, {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import DateTimePicker, { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import Snackbar from 'react-native-snackbar';
import statementandsharepdf from '../../common/StatementPDF';



export default StatementScreen = ({ navigation }) => {
    const [statementdata, setstatementdata] = useState([]);
    const [lastDocument, setLastDocument] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [reachedEnd, setReachedEnd] = useState(false);
    // 0 =date,1 = name , 2=sauda number , 3 = city 4=defaule search
    const [selectedOption, setSelectedOption] = useState('4');
    const [searchtext, setsearchtext] = useState('');

    const filterBottomSheetRef = useRef(null);

    const pageSize = 10;
    const onRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => { console.log("Set timeout function") }, 1000);
        // fetch again 
        setRefreshing(false);

        setSelectedOption('4');
        fetchstatementfirsttime();
    };

    useEffect(() => {
        console.log("Last document value ", lastDocument);
    }, [lastDocument])
    useEffect(() => {
        console.log("selected option for the search text ", selectedOption);
    }, [selectedOption])

    const fetchNextPage = async () => {

        console.log("My selected option while fetching next page with the help of flatlist is ", selectedOption)
        console.log("Fetch nextpage method is call");
        if (selectedOption == '4' || searchtext == '') {
            let statementRef = firestore()
                .collection('statement')
                .orderBy('sauda_no', 'desc')
                .limit(pageSize);

            if (lastDocument) {
                console.log("Does it goes in the if part for checking in last document ");
                statementRef = statementRef.startAfter(lastDocument);
            }

            try {
                const querySnapshot = await statementRef.get();
                const newStatementData = querySnapshot.docs.map((doc) => doc.data());
                console.log("New Statement Data contians in fetch nextpage try method ");
                setstatementdata((prevData) => [...prevData, ...newStatementData]);

                if (querySnapshot.docs.length > 0) {
                    console.log("Does my query snapshot length >0 ");
                    console.log("Query snapshot value contains ", querySnapshot.docs);
                    const newLastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
                    setLastDocument(newLastDocument);
                }
                if (querySnapshot.docs.length === 0) {
                    setReachedEnd(true); // No more data to fetch
                }
            } catch (error) {
                console.error('Error fetching statement data:', error);
            }
        }
        else if (selectedOption == '1' || selectedOption == '2') {

            console.log("My flatlist is fetching next page by calling search by name");

        }
    };

    function fetchstatementfirsttime() {
        // setSelectedOption('4')
        setReachedEnd(false);
        console.log("i call fetchstatement first time method ");
        const statementRef = firestore().collection('statement');

        const unsubscribe = statementRef.onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
                const unsortedData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Sort by date in descending order
                const sortedData = unsortedData.sort((a, b) => {
                    const dateA = moment(a.date).format('DD/MM/YYYY');
                    const dateB = moment(b.date).format('DD/MM/YYYY');
                    //   new Date(b.date);
                    console.log("MY date A value contans ", dateA);
                    console.log("My date B value contioaons ", dateB);
                    // Compare dates
                    if (dateA > dateB) {
                        console.log("does A date is greater than b ")
                        return -1;
                    }

                    if (dateA < dateB) {
                        console.log("Does B date is greater than A");
                        return 1;
                    }

                    return b.sauda_no - a.sauda_no;
                });

                setstatementdata(sortedData);
                // for(let i of sortedData)
                // {
                //     const mydate=new Date(i.date);
                //     const newdate=moment(i.date.valueOf());
                //     console.log("New date value contains ",newdate);
                //     console.log("MY date vaule is the --->>", mydate);
                // }
                const newLastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
                setLastDocument(newLastDocument);
            } else {
                // Handle the case where there are no documents
                console.log("No documents found.");
            }
        });

        return () => unsubscribe();


    }
    useEffect(() => {
        fetchstatementfirsttime();
    }, []);

    useEffect(() => {
        if (searchtext == '') {
            setLastDocument('');
            fetchstatementfirsttime();
        }
    }, [searchtext])
    async function fetchStatementbyName(searchtext) {
        setLastDocument('');
        console.log("Querying for ", searchtext);
        if (!searchtext.trim()) {
            console.log("does we are redirect to the fetchfirst time method because our search text =0")


            fetchstatementfirsttime();
        }
        else {
            const statementCollection = firestore().collection('statement');
            try {
                const buyerSnapshot = await statementCollection
                    .where('BuyerData.companyname', '>=', searchtext) // Start at or after the search text
                    .where('BuyerData.companyname', '<=', searchtext + '\uf8ff') // End at or before the search text with a special character to include all possible matches
                    // .orderBy('date', 'desc') // Order the results by date in descending order
                    // .limit(pageSize)
                    .get();

                const sellerSnapshot = await statementCollection
                    .where('SellerData.companyname', '>=', searchtext) // Start at or after the search text
                    .where('SellerData.companyname', '<=', searchtext + '\uf8ff') // End at or before the search text with a special character to include all possible matches
                    // .orderBy('date', 'desc') // Order the results by date in descending order
                    // .limit(pageSize)
                    .get();

                const buyerData = buyerSnapshot.docs.map((doc) => doc.data());
                const sellerData = sellerSnapshot.docs.map((doc) => doc.data());

                console.log("Buyer data contains ", buyerData);
                console.log("Seller Data contains ", sellerData);
                const combineData = [...buyerData, ...sellerData].sort((a, b) => a.sauda_no - b.sauda_no);
                setstatementdata(combineData);
                if (combineData.length > 0) {
                    setReachedEnd(true);
                }
                // Rest of your code to process the snapshots
            } catch (error) {
                Snackbar.show({
                    text: 'Error while fetching the data please try again',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red',
                    textColor: 'white',
                });
                // console.error('Error fetching statement data:', error);
            }
        }
        // end of the else 

    }

    async function fetchStatementbyNumber(searchtext) {
        setLastDocument('');
        console.log("My search sauda no in search bar for number  ", searchtext);
        // console.log("type of search text is ",typeof(searchtext));
        if (!searchtext.trim()) {
            console.log("does we are redirect to the fetchfirst time method because our search text =0")
            setLastDocument('');
            fetchstatementfirsttime();
        }
        else {
            console.log("does it gone in else part for the fetchstatement by number ");
            const statementCollection = firestore().collection('statement');
            try {
                const numberSnapshot = await statementCollection
                    .where('sauda_no', '==', parseInt(searchtext))
                    // .orderBy('sauda_no','asc')
                    .get();

                const saudaData = numberSnapshot.docs.map((doc) => doc.data());
                console.log("sauda data contains wher match is ", saudaData);
                setstatementdata(saudaData);
                if (saudaData > 0) {
                    setReachedEnd(true);
                }
            }
            catch (error) {
                console.log("Error while doing search by number is ", error);
            }
        }
    }
    async function fetchStatementbyCity(searchtext) {

        console.log("search city name is ", searchtext);
        setLastDocument('');
        console.log("Querying for ", searchtext);
        if (!searchtext.trim()) {
            setLastDocument('');
            console.log("does we are redirect to the fetchfirst time method because our search text =0")
            fetchstatementfirsttime();
        }
        else {
            const statementCollection = firestore().collection('statement');
            try {
                const buyercitysnapshot = await statementCollection
                    .where('BuyerData.city', '>=', searchtext)
                    .where('BuyerData.city', '<=', searchtext + '\uf8ff')
                    .get();
                const sellercitysnapshot = await statementCollection
                    .where('SellerData.city', '>=', searchtext)
                    .where('SellerData.city', '<=', searchtext + '\uf8ff')
                    .get();

                const buyerData = buyercitysnapshot.docs.map((doc) => doc.data());
                const sellerData = sellercitysnapshot.docs.map((doc) => doc.data());

                const searchData = [...buyerData, ...sellerData];

                const uniqueData = removeDuplicateSaudaNos(searchData);
                console.log("Number of Unique Documents:", uniqueData.length);
                const sortedData = uniqueData.sort((a, b) => a.sauda_no - b.sauda_no);

                if (sortedData > 0) {
                    setReachedEnd(true);
                }
                setstatementdata(sortedData);
            }
            catch (error) {
                console.log("Some error occurr please try agian ", error);
                Snackbar.show({
                    text: 'Error while fetching the data please try again',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red',
                    textColor: 'white',
                });
            }
        }
    }
    function removeDuplicateSaudaNos(data) {
        console.log("remove duplicate sauda method calls  ", data);
        const uniqueData = [];
        const seenSaudaNos = new Set();

        data.forEach((item) => {
            const saudaNo = item.sauda_no;

            if (!seenSaudaNos.has(saudaNo)) {
                uniqueData.push(item);
                seenSaudaNos.add(saudaNo);
            }
        });

        return uniqueData;
    }
    async function fetchStatementbyDate() {
        let startDate = new Date(isostartdate);
        let endDate = new Date(isoenddate);

        // Convert endDate to UTC
        endDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000);

        console.log("My start date is ", startDate);
        console.log("My end date is ", endDate);

        setLastDocument('');
        const statementCollection = firestore().collection('statement');
        try {
            const dateSnapshot = await statementCollection
                .where('date', '>=', startDate)
                .where('date', '<=', endDate)
                .orderBy('date', 'asc')
                .get();

            const dateData = dateSnapshot.docs.map((doc) => doc.data());

            setstatementdata(dateData);
        }
        catch (error) {
            Snackbar.show({
                text: 'Error while fetching the data please try again',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
            });
        }
    }
    useEffect(() => {
        // console.log("Statement data value in useEffect ", statementdata);

    }, [statementdata])



    const DataRow = ({ data }) => {
        // console.log("My statement sauda contains -->", data);
        const navigation = useNavigation();

        return (
            <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => navigation.navigate('UpdateDataScreen', {
                    statementdata: data
                })}
                style={{ flexDirection: 'row', marginBottom: moderateScale(10), marginRight: moderateScale(10), marginVertical: 10 }}>
                <View style={styles.number_container}>
                    <Text
                        numberOfLines={1}

                        ellipsizeMode='tail'
                        style={[styles.headertext, { marginHorizontal: 0 }]}>{data.sauda_no}</Text>
                </View>
                <View style={styles.date_container}>
                    <Text
                        numberOfLines={1}

                        ellipsizeMode='tail'
                        style={styles.headertext}>{moment(new Date(data?.date)).format('DD/MM/YYYY')}</Text>
                </View>

                <View style={styles.seller_container}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={[styles.headertext,]}>{data?.SellerData?.companyname}</Text>
                </View>
                <View style={styles.city_container}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={[styles.headertext,]}>{data?.SellerData?.city}</Text>
                </View>

                <View style={styles.seller_container}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={[styles.headertext,]}>{data?.BuyerData?.companyname}</Text>
                </View>
                <View style={styles.city_container}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={[styles.headertext,]}>{data?.BuyerData?.city}</Text>
                </View>
                <View style={styles.rate_container}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={styles.headertext}>{data?.Rate}</Text>
                </View>
                <View style={styles.bags_container}>
                    <Text

                        ellipsizeMode='tail'
                        style={styles.headertext}>{data?.Bags}</Text>
                </View>
                {/* <View style={styles.bardan_container}>
                    <Text

                        ellipsizeMode='tail'
                        style={styles.headertext}>{data?.Bardan}</Text>
                </View> */}
            </TouchableOpacity>
        );
    }

    const handlesearchtext = (text) => {
        setReachedEnd(false);
        console.log("on change text value method call ", text);
        setsearchtext(text);

        if (selectedOption == '0') {
            // search by date
            // fetchStatementbyDate();
            console.log("search by date");
        }
        else if (selectedOption == '1') {
            console.log("does it goes to the select option by name ");
            fetchStatementbyName(text);
        }
        else if (selectedOption == '2') {
            console.log("does it goes to select option by number ");
            console.log("Also it goes in else part so my search text is ", searchtext);
            fetchStatementbyNumber(text);
        }
        else if (selectedOption == '3') {
            fetchStatementbyCity(text);
            console.log("fetch by city ")
        }
        else {
            Snackbar.show({
                text: 'Please Select type from Filter ',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
            });
        }
        // else if(selectedOption=='4')
        // {
        //     fetchstatementfirsttime();
        // }
        // else{
        //     // default if any thing gone wrong 
        //     console.log("this is calling first time method as something went wrong so default case")
        //     fetchstatementfirsttime();
        // }
    }
    useEffect(() => {
        console.log("search text contains ", searchtext);
    }, [searchtext])
    const filterbottomSheetModalRef = useRef(null);
    const datebottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['35%',], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        filterbottomSheetModalRef.current?.present();
        setsearchtext('');
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    // const handleDismiss = () => {
    //     filterbottomSheetModalRef.current.dismiss();
    //    };
    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop {...props}
            enableTouchThrough={true}
            disappearsOnIndex={-1}
            appearsOnIndex={0}

        />,
        []
    );

    useEffect(() => {
        console.log("My reach end value is ", reachedEnd);
    }, [reachedEnd])
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleprint = () => {
        console.log("Print the report ");
        statementandsharepdf(statementdata, searchtext);
    }

    // for date modal
    const [mySelectedStartDate, setSelectedStartDate] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);

    const [mySelectedEndDate, setSelectedEndDate] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const [isostartdate, setiosstartdate] = useState(new Date());
    const [isoenddate, setisoenddate] = useState(new Date());

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };
    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };
    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };
    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);

        const formattedDate = moment(date).format('DD/MM/YYYY');
        setSelectedStartDate(formattedDate);
        // const isodate = moment(new Date(date)).format()
        // setiosstartdate(isodate);
        // setFormState({ ...formState, date: isodate });
        setiosstartdate(date);
        hideStartDatePicker();
    };
    useEffect(() => {
        console.log("ISo format start date ", isostartdate);
        console.log("ISo format end date ", isoenddate);
    }, [isostartdate, isoenddate])
    const handleConfirm2 = (date) => {
        console.log("A date has been picked: ", date);

        const formattedDate = moment(date).format('DD/MM/YYYY');
        setSelectedEndDate(formattedDate);

        const startDateObject = moment(mySelectedStartDate, 'DD/MM/YYYY'); // Parse the selected start date
        const endDateObject = moment(mySelectedEndDate, 'DD/MM/YYYY');
        if (endDateObject.isSameOrAfter(startDateObject, 'day')) {

            const isoStartDate = startDateObject.toISOString();
            const isoEndDate = endDateObject.toISOString();

            setisoenddate(isoStartDate);
            setiosstartdate(isoEndDate);
            // fetchStatementbyDate();
            // setFormState({ ...formState, date: isodate });
        }
        else {
            Snackbar.show({
                text: 'Select End Date Greater than or equal to Start Date ',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
                textColor: 'white',
            });
        }
        hideEndDatePicker();
        datebottomSheetModalRef.current.dismiss();
    };
    return (
        // <BottomSheetModalProvider>
        <LinearGradient colors={['#f1f7fc', '#e8f2ff', '#cedff5']} style={{ flex: 1, }}>
            <View style={styles.filtercontainer}>

                <Image
                    style={styles.searchiconimage}
                    source={require('../../assets/search_symbol.png')}
                />
                <TextInput
                    onChangeText={(val) => handlesearchtext(val)}
                    value={searchtext}
                    style={styles.searchcontainer} />

                <TouchableOpacity
                    // onPress={handlefilterbtn}
                    onPress={handlePresentModalPress}
                    style={styles.filterbutton}>
                    <Image
                        style={styles.filtericonimage}
                        source={require('../../assets/filter.png')}
                    />
                    <Text style={styles.filtertext}>Filter</Text>
                </TouchableOpacity>

            </View >
            <ScrollView style={styles.scrollcontainer}
                horizontal
            >
                <View style={{ flexDirection: 'column', }}>
                    <View style={{ flexDirection: 'row', marginBottom: moderateScale(20) }}>
                        <View style={styles.number_container}>
                            <Text style={[styles.headertext, { marginHorizontal: 0 }]}>No</Text>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.headertext}>Date</Text>
                        </View>

                        <View style={styles.seller_container}>
                            <Text style={[styles.headertext, { marginHorizontal: moderateScale(25) }]}>Seller Name</Text>
                        </View>
                        <View style={styles.city_container}>
                            <Text style={[styles.headertext, { marginHorizontal: moderateScale(25) }]}>City</Text>
                        </View>
                        <View style={styles.seller_container}>
                            <Text style={[styles.headertext, { marginHorizontal: moderateScale(25) }]}>Buyer Name</Text>
                        </View>
                        <View style={styles.city_container}>
                            <Text style={[styles.headertext, { marginHorizontal: moderateScale(25) }]}>City</Text>
                        </View>
                        <View style={styles.rate_container}>
                            <Text style={styles.headertext}>Rate</Text>
                        </View>
                        <View style={styles.bags_container}>
                            <Text style={styles.headertext}>Bags</Text>
                        </View>
                        {/* <View style={styles.bardan_container}>
                            <Text style={styles.headertext}>Bardan</Text>
                        </View> */}
                    </View>
                    {statementdata.length > 0 ? (
                        <FlatList
                            // onEndReached={fetchNextPage}
                            // onEndReachedThreshold={0.7}
                            data={statementdata}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <DataRow data={item}
                            />
                            }
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                        />
                    ) :
                        (
                            <Text style={{
                                fontSize: moderateScale(16),
                                color: 'gray',
                            }}>No Data Available</Text>
                        )
                    }
                    {/* <BottomSheet ref={filterBottomSheetRef} index={1} snapPoints={['1%', '40%']}>
                            <View style={{
                                flex: 1,
                                padding: 24,

                            }}>
                                <Text style={{ color: 'black' }}>Awesome 🎉</Text>
                            </View>
                        </BottomSheet> */}
                </View>
                {/* <View style={styles.datacontainer}>
                
            </View> */}
            </ScrollView>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                {/* Your data rendering logic here */}
                {reachedEnd && <Text style={{ color: 'black', }}>Reach End of the Data</Text>}
                {reachedEnd && <TouchableOpacity onPress={handleprint} activeOpacity={0.4}
                    style={styles.printpdf}
                >
                    <Text>Print the Sauda</Text>
                </TouchableOpacity>}
            </View>


            {/* Filter Modal */}
            <BottomSheetModal

                ref={filterbottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                bottomInset={30}
                detached={true}
                // onDismiss={handleDismiss}
                // enableOverScroll={false}
                backdropComponent={renderBackdrop}
                style={styles.filterbottomsheet}
                stackBehavior='replace'

            // enableTouchOutsideToClose={true}
            >

                <View style={styles.bottomsheetmaincontainer}>

                    {/* <TouchableOpacity
                        onPress={() => {
                            handleOptionSelect('0')
                            filterbottomSheetModalRef.current.dismiss();
                            datebottomSheetModalRef.current.present();
                        }
                        }
                        style={{
                            backgroundColor: selectedOption === '0' ? 'lightgray' : 'transparent',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={styles.bottomtext}>By Date</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => {
                            handleOptionSelect('1')
                            filterbottomSheetModalRef.current.dismiss();
                        }
                        }
                        style={{
                            backgroundColor: selectedOption === '1' ? 'lightgray' : 'transparent',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={styles.bottomtext}>By Name</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            handleOptionSelect('2')
                            filterbottomSheetModalRef.current.dismiss();
                        }}
                        style={{
                            backgroundColor: selectedOption === '2' ? 'lightgray' : 'transparent',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={styles.bottomtext}>By Number</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            handleOptionSelect('3')
                            filterbottomSheetModalRef.current.dismiss();
                        }
                        }
                        style={{
                            backgroundColor: selectedOption === '3' ? 'lightgray' : 'transparent',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={styles.bottomtext}>By City</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>

            {/* Filter Date Modal */}
            <BottomSheetModal
                style={styles.filterbottomsheet}
                ref={datebottomSheetModalRef}
                index={0}
                snapPoints={['25%']}
                onChange={handleSheetChanges}
                backdropComponent={renderBackdrop}
                stackBehavior='replace'
                bottomInset={30}
            >
                <View style={styles.datebottomsheetcontainer}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ color: 'black' }}>Start Date</Text>
                        <TouchableOpacity onPress={showStartDatePicker} style={{ marginLeft: moderateScale(20) }}>
                            <Image
                                style={{ width: moderateScale(25), height: moderateScale(25) }}
                                source={require('../../assets/calendar.png')}
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isStartDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideStartDatePicker}
                        />
                        <Text style={{ color: 'black', fontSize: moderateScale(15), marginLeft: moderateScale(10) }}>{mySelectedStartDate}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ color: 'black' }}>End Date</Text>
                        <TouchableOpacity onPress={showEndDatePicker} style={{ marginLeft: moderateScale(20) }}>
                            <Image
                                style={{ width: moderateScale(25), height: moderateScale(25) }}
                                source={require('../../assets/calendar.png')}
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isEndDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm2}
                            onCancel={hideEndDatePicker}
                        />
                        <Text style={{ color: 'black', fontSize: moderateScale(15), marginLeft: moderateScale(10) }}>{mySelectedEndDate}</Text>
                    </View>
                </View>
            </BottomSheetModal>



        </LinearGradient >
        // </BottomSheetModalProvider>
    )
}