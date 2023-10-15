import React, { useEffect, useState } from 'react';
import { View, Button, ScrollView, Text, FlatList,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import styles from './StatementStyle';
import { moderateScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-naviation/native';
import { useNavigation } from '@react-navigation/native';
const handledatarowpress=(data)=>{
    console.log("data in press contains ",data)
}

const DataRow = ({ data }) => {
    console.log("My statement sauda contains -->", data);
    const navigation = useNavigation();

    return (
        <TouchableOpacity
        activeOpacity={0.3}
        onPress={()=>navigation.navigate('UpdateDataScreen',{
        statementdata:data
        }) }
        style={{ flexDirection: 'row' ,marginBottom:moderateScale(10),marginRight:moderateScale(10)}}>
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
                 style={styles.headertext}>{data.date}</Text>
            </View>

            <View style={styles.seller_container}>
                <Text 
                numberOfLines={1}
                ellipsizeMode='tail'
                style={[styles.headertext, ]}>{data?.SellerData?.companyname}</Text>
            </View>
            <View style={styles.seller_container}>
                <Text 
                  numberOfLines={1}
                  ellipsizeMode='tail'
                style={[styles.headertext, ]}>{data?.BuyerData?.companyname}</Text>
            </View>
            <View style={styles.rate_container}>
                <Text
                 numberOfLines={1}
                 ellipsizeMode='tail'
                style={styles.headertext}>{data.Rate}</Text>
            </View>
            <View style={styles.bags_container}>
                <Text 
                 
                 ellipsizeMode='tail'
                style={styles.headertext}>{data.Bags}</Text>
            </View>
        </TouchableOpacity>
    );
}
export default StatementScreen = ({navigation}) => {
    const [statementdata, setstatementdata] = useState([]);

    // fetch statement data 
    // useEffect(() => {
    //     const handlestatement = async () => {

    //         const usersCollection = firestore().collection('statement');
    //         const snapshot = await usersCollection.get();
    //         const Statement = snapshot.docs.map((doc) => doc.data());
    //         setstatementdata(Statement);
    //         console.log("statement contains --> ", Statement)
    //     }
    //     handlestatement();
    // }, [])
    useEffect(() => {
        const handleStatement = () => {
          const usersCollection = firestore().collection('statement').orderBy('sauda_no');
      
          // Set up a listener for real-time updates
          const unsubscribe = usersCollection.onSnapshot((querySnapshot) => {
            const statementData = querySnapshot.docs.map((doc) => doc.data());
            setstatementdata(statementData);
            console.log("Statement contains --> ", statementData);
          });
      
          // Unsubscribe from the listener when the component unmounts
          return () => unsubscribe();
        }
      
        handleStatement();
      }, []);
    return (
        <LinearGradient colors={['#f1f7fc', '#e8f2ff', '#cedff5']} style={{ flex: 1, }}>
            {/* <View style={styles.filtercontainer}>

            </View> */}
            <ScrollView style={styles.scrollcontainer}
                horizontal
            >
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row',marginBottom:moderateScale(20) }}>
                        <View style={styles.number_container}>
                            <Text style={[styles.headertext, { marginHorizontal: 0 }]}>No</Text>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.headertext}>Date</Text>
                        </View>

                        <View style={styles.seller_container}>
                            <Text style={[styles.headertext, { marginHorizontal: moderateScale(25) }]}>Seller Name</Text>
                        </View>
                        <View style={styles.seller_container}>
                            <Text style={[styles.headertext, { marginHorizontal: moderateScale(25) }]}>Buyer Name</Text>
                        </View>
                        <View style={styles.rate_container}>
                            <Text style={styles.headertext}>Rate</Text>
                        </View>
                        <View style={styles.bags_container}>
                            <Text style={styles.headertext}>Bags</Text>
                        </View>
                    </View>
                    <FlatList
                        data={statementdata}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <DataRow data={item} />}
                    />
                </View>
                {/* <View style={styles.datacontainer}>
                
                </View> */}
            </ScrollView>


        </LinearGradient>
    )
}