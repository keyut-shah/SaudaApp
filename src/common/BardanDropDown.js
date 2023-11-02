// import React from 'react';
// import { View, Text } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';

// const CustomDropdown = (props) => {
//   return (
//     <View>
//       <Text style={{color:'black',borderWidth:1}}>{props.label}</Text>
//       <Dropdown
//       style={{borderWidth:1}}
//         label={props.label}
//         data={props.data}
//         value={props.value}
//         onChangeText={props.onChangeText}
//       />
//     </View>
//   );
// };

// export default CustomDropdown;
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';

const DropdownComponent = ({ value, onChange }) => {

  // console.log("My value contains -->", value);
  // console.log("On change props contains ", onChange);
  // console.log("Why dropdown update This quickly ");
  const [selectedValue, setSelectedValue] = useState(value);
  const [bardandata, setbardandata] = useState([]);
  // console.log("Selected value contaons ",selectedValue)
  // useEffect(() => {
  //   console.log("bardan data in useeffect contains ", bardandata);
  // }, [bardandata])
  const fetchdata = async () => {
    const bardancollection = await firestore().collection('extra').doc('4RIEUMiNldcGJ26goLnw');
    bardancollection.onSnapshot((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        // console.log("object contains ", data);
// 

        if (data && data.bardantype) {

          const arrayData = data.bardantype;
          // console.log("Array data contains ", arrayData);
          const transformedArray = arrayData.map(value => ({
            label: value,
            value,
          }));
          // console.log("transformed array contians--> ",typeof(transformedArray)==typeof(arrayData))
          // setbardandata(transformedArray); 
          setbardandata(transformedArray);
          // Now you can access the values within the array

        }
        else {
          console.log('No array data found.');
        }
      } else {
        console.log('Document does not exist.');
      }

    });

  }
  useEffect(() => {
    fetchdata();
    console.log("'does fetch method call every time or one time ");
  }, [])

  return (
  

    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={bardandata}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select Bardan"
      value={selectedValue}
      onChange={value => {
        setSelectedValue(value);
        onChange(value);
      }}
      containerStyle={{ borderWidth: 2, borderColor: 'black', }}
      labelStyle={{ color: 'black', }}
      itemStyle={{ color: 'black' }}
      listStyle={{ backgroundColor: 'green', color: 'black' }}
      itemTextStyle={{ color: 'black' }}
    // renderItem={(item) => {
    //   <>
    //     <View style={{ height: 100 }}>
    //       <Text style={{ color: 'black' }}>{item}</Text>
    //     </View>
    //   </>


    // }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    marginHorizontal: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderWidth: 1,
    width: 170,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
  },

});