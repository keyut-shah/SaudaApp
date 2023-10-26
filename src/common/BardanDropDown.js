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

const data = [
  { label: 'Sabaardan', value: '1' },
  { label: 'BOPP', value: '2' },
  { label: 'JUTE', value: '3' },
  { label: 'LOOSE', value: '4' },

];

const DropdownComponent = ({ value, onChange }) => {
  console.log("My value contains -->", value);
  console.log("On change props contains ", onChange);
  console.log("Why dropdown update This quickly ");
  const [selectedValue, setSelectedValue] = useState(value);



  return (
    // <Dropdown
    //   style={styles.dropdown}
    //   placeholderStyle={styles.placeholderStyle}
    //   selectedTextStyle={styles.selectedTextStyle}
    //   data={data}

    //   maxHeight={300}
    //   labelField="label"
    //   valueField="value"
    //   placeholder="Select Bardan"
    //   value={value}
    //   onChange={value => { // Pass the selected value to the onChange callback
    //     onChange(value);
    //     setValue(value)
    //   }}

    // />

    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
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
      listStyle={{ backgroundColor: 'green' ,color:'black'}}
      itemTextStyle={{color:'black'}}
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
    margin: 16,
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