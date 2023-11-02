// // import React, { useState } from 'react';
// // import { View, TextInput, Button } from 'react-native';
// // import firestore from '@react-native-firebase/firestore';

// // const DynamicForm = () => {
// //   const [formState, setFormState] = useState({
// //     registerNumber: '',
// //     sellerName: '',
// //     buyerName: '',
// //     dynamicFields: [],
// //   });

// //   const addDynamicField = () => {
// //     setFormState((prevState) => ({
// //       ...prevState,
// //       dynamicFields: [
// //         ...prevState.dynamicFields,
// //         { rate: '', timeType: '', payment: '', notes: '' },
// //       ],
// //     }));
// //   };

// //   const saveDataToFirestore = async () => {
// //     const { registerNumber, sellerName, buyerName, dynamicFields } = formState;

// //     try {
// //         const statementListRef = firestore().collection('statementList');
// //         const batch = firestore().batch();

// //         dynamicFields.forEach((fieldSet) => {
// //           const dataToSave = {
// //             registerNumber,
// //             sellerName,
// //             buyerName,
// //             ...fieldSet,
// //           };

// //           const newDocumentRef = statementListRef.doc();
// //           batch.set(newDocumentRef, dataToSave);
// //         });

// //         await batch.commit();
// //         console.log('Data saved to Firestore');

// //     } catch (error) {
// //       console.error('Error saving data to Firestore:', error);
// //     }
// //   };

// //   return (
// //     <View style={{borderWidth:1,}}>
// //       <TextInput
// //       style={{borderWidth:1,color:'black'}}
// //       placeholderTextColor={'black'}
// //         placeholder="Register Number"
// //         value={formState.registerNumber}
// //         onChangeText={(text) =>
// //           setFormState({ ...formState, registerNumber: text })
// //         }
// //       />
// //       <TextInput
// //        style={{borderWidth:1,color:'black'}}
// //        placeholderTextColor={'black'}
// //         placeholder="Seller Name"
// //         value={formState.sellerName}
// //         onChangeText={(text) =>
// //           setFormState({ ...formState, sellerName: text })
// //         }
// //       />
// //       <TextInput
// //        style={{borderWidth:1,color:'black'}}
// //        placeholderTextColor={'black'}
// //         placeholder="Buyer Name"
// //         value={formState.buyerName}
// //         onChangeText={(text) =>
// //           setFormState({ ...formState, buyerName: text })
// //         }
// //       />
// //       {formState.dynamicFields.map((field, index) => (
// //         <View key={index}>
// //           <TextInput
// //            style={{borderWidth:1,color:'black'}}
// //            placeholderTextColor={'black'}
// //             placeholder="Rate"
// //             value={field.rate}
// //             onChangeText={(text) =>
// //               setFormState((prevState) => {
// //                 const updatedFields = [...prevState.dynamicFields];
// //                 updatedFields[index].rate = text;
// //                 return { ...prevState, dynamicFields: updatedFields };
// //               })
// //             }
// //           />
// //           <TextInput
// //            style={{borderWidth:1,color:'black'}}
// //            placeholderTextColor={'black'}
// //             placeholder="Time Type"
// //             value={field.timeType}
// //             onChangeText={(text) =>
// //               setFormState((prevState) => {
// //                 const updatedFields = [...prevState.dynamicFields];
// //                 updatedFields[index].timeType = text;
// //                 return { ...prevState, dynamicFields: updatedFields };
// //               })
// //             }
// //           />
// //           <TextInput
// //            style={{borderWidth:1,color:'black'}}
// //            placeholderTextColor={'black'}
// //             placeholder="Payment"
// //             value={field.payment}
// //             onChangeText={(text) =>
// //               setFormState((prevState) => {
// //                 const updatedFields = [...prevState.dynamicFields];
// //                 updatedFields[index].payment = text;
// //                 return { ...prevState, dynamicFields: updatedFields };
// //               })
// //             }
// //           />
// //           <TextInput
// //            style={{borderWidth:1,color:'black'}}
// //            placeholderTextColor={'black'}
// //             placeholder="Notes"
// //             value={field.notes}
// //             onChangeText={(text) =>
// //               setFormState((prevState) => {
// //                 const updatedFields = [...prevState.dynamicFields];
// //                 updatedFields[index].notes = text;
// //                 return { ...prevState, dynamicFields: updatedFields };
// //               })
// //             }
// //           />
// //         </View>
// //       ))}
// //       <Button title="Add Field" onPress={addDynamicField} />
// //       <Button title="Save to Firestore" onPress={saveDataToFirestore} />
// //     </View>
// //   );
// // };

// // export default DynamicForm;







// // import React, { useState } from 'react';
// // import { View, TextInput, Button } from 'react-native';
// // import firestore from '@react-native-firebase/firestore';

// // const DynamicForm = () => {
// //   const [formState, setFormState] = useState({
// //     registerNumber: '',
// //     sellerName: '',
// //     buyerName: '',
// //     dynamicFields: [],
// //   });

// //   const addDynamicField = () => {
// //     setFormState((prevState) => ({
// //       ...prevState,
// //       dynamicFields: [
// //         ...prevState.dynamicFields,
// //         { rate: '', type: '', payment: '', notes: '' },
// //       ],
// //     }));
// //   };

// //   const saveDataToFirestore = async () => {
// //     const { registerNumber, sellerName, buyerName, dynamicFields } = formState;

// //     try {
// //       const statementListRef = firestore().collection('statementList');
// //       const batch = firestore().batch();

// //       dynamicFields.forEach((fieldSet) => {
// //         const dataToSave = {
// //           registerNumber,
// //           sellerName,
// //           buyerName,
// //           ...fieldSet,
// //         };

// //         // Create a document with an auto-generated ID
// //         statementListRef.add(dataToSave);
// //       });

// //       console.log('Data saved to Firestore');
// //     } catch (error) {
// //       console.error('Error saving data to Firestore:', error);
// //     }
// //   };

// //   return (
// //     <View>
// //       <TextInput
// //         style={{borderWidth:1,color:'black'}}
// //                    placeholderTextColor={'black'}
// //         placeholder="Register Number"
// //         value={formState.registerNumber}
// //         onChangeText={(text) =>
// //           setFormState({ ...formState, registerNumber: text })
// //         }
// //       />
// //       <TextInput
// //         style={{borderWidth:1,color:'black'}}
// //         placeholderTextColor={'black'}
// //         placeholder="Seller Name"
// //         value={formState.sellerName}
// //         onChangeText={(text) =>
// //           setFormState({ ...formState, sellerName: text })
// //         }
// //       />
// //       <TextInput
// //         style={{borderWidth:1,color:'black'}}
// //         placeholderTextColor={'black'}
// //         placeholder="Buyer Name"
// //         value={formState.buyerName}
// //         onChangeText={(text) =>
// //           setFormState({ ...formState, buyerName: text })
// //         }
// //       />
// //       {formState.dynamicFields.map((field, index) => (
// //         <View key={index}>
// //           <TextInput
// //             style={{borderWidth:1,color:'black'}}
// //             placeholderTextColor={'black'}
// //             placeholder="Rate"
// //             value={field.rate}
// //             onChangeText={(text) =>
// //               setFormState((prevState) => {
// //                 const updatedFields = [...prevState.dynamicFields];
// //                 updatedFields[index].rate = text;
// //                 return { ...prevState, dynamicFields: updatedFields };
// //               })
// //             }
// //           />
// //           <TextInput
// //             style={{borderWidth:1,color:'black'}}
// //             placeholderTextColor={'black'}
// //             placeholder="Type"
// //             value={field.type}
// //             onChangeText={(text) =>
// //               setFormState((prevState) => {
// //                 const updatedFields = [...prevState.dynamicFields];
// //                 updatedFields[index].type = text;
// //                 return { ...prevState, dynamicFields: updatedFields };
// //               })
// //             }
// //           />
// //           <TextInput
// //             style={{borderWidth:1,color:'black'}}
// //             placeholderTextColor={'black'}
// //             placeholder="Payment"
// //             value={field.payment}
// //             onChangeText={(text) =>
// //               setFormState((prevState) => {
// //                 const updatedFields = [...prevState.dynamicFields];
// //                 updatedFields[index].payment = text;
// //                 return { ...prevState, dynamicFields: updatedFields };
// //               })
// //             }
// //           />
// //           <TextInput
// //             style={{borderWidth:1,color:'black'}}
// //             placeholderTextColor={'black'}
// //             placeholder="Notes"
// //             value={field.notes}
// //             onChangeText={(text) =>
// //               setFormState((prevState) => {
// //                 const updatedFields = [...prevState.dynamicFields];
// //                 updatedFields[index].notes = text;
// //                 return { ...prevState, dynamicFields: updatedFields };
// //               })
// //             }
// //           />
// //         </View>
// //       ))}
// //       <Button title="Add Field" onPress={addDynamicField} />
// //       <Button title="Save to Firestore" onPress={saveDataToFirestore} />
// //     </View>
// //   );
// // };

// // export default DynamicForm;
// import React, { useState } from 'react';
// import { View, TextInput, Text, StyleSheet, Button ,ScrollView} from 'react-native';
// import { moderateScale } from 'react-native-size-matters';
// import firestore from '@react-native-firebase/firestore';
// import DropdownComponent from '../common/BardanDropDown';
// import ItemDropdownComponent from '../common/ItemDropDown';
// const DynamicForm = () => {
//     const [formState, setFormState] = useState({
//         Rate: '',
//         Weight: '',
//         Bags: '',
//         Bardan: '',
//         ItemType: '',
//         Payment: '',
//         Notes: '',
//         dynamicFields: [],
//     });

//     const handleFieldChange = (fieldName, text) => {
//         setFormState((prevState) => ({
//             ...prevState,
//             [fieldName]: text,
//         }));
//     };

//     const addDynamicField = () => {
//         setFormState((prevState) => ({
//             ...prevState,
//             dynamicFields: [
//                 ...prevState.dynamicFields,
//                 { rate: '', type: '', payment: '', notes: '' },
//             ],
//         }));
//     };

//     const removeDynamicField = () => {
//         setFormState((prevState) => {
//             const updatedFields = [...prevState.dynamicFields];
//             updatedFields.pop(); // Remove the last field
//             return { ...prevState, dynamicFields: updatedFields };
//         });
//     };

//     const saveDataToFirestore = async () => {
//         const dataToSave = { ...formState };

//         try {
//             const statementListRef = firestore().collection('statementList');
//             const newDocumentRef = await statementListRef.add(dataToSave);

//             console.log('Data saved to Firestore with ID:', newDocumentRef.id);
//         } catch (error) {
//             console.error('Error saving data to Firestore:', error);
//         }
//     };

//     return (
//         <ScrollView>
//             {formState.dynamicFields.map((field, index) => (
//                 <View key={index}>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Text style={styles.sty5}>Rate</Text>
//                         <Text style={styles.sty7}>*</Text>
//                         <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
//                         <TextInput
//                             style={[styles.sty15, { marginLeft: moderateScale(20) }]}
//                             onChangeText={(text) => handleFieldChange('Rate', text)}
//                             value={formState.Rate}
//                         />
//                     </View>

//                     {/* Weight */}
//                     <View style={styles.sty12}>
//                         <Text style={styles.sty5}>Weight</Text>
//                         <Text style={styles.sty7}>*</Text>
//                         <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
//                         <TextInput
//                             style={styles.sty15}
//                             onChangeText={(text) => handleFieldChange('Weight', text)}
//                             value={formState.Weight}
//                         />
//                     </View>

//                     {/* Bags */}
//                     <View style={styles.sty12}>
//                         <Text style={styles.sty5}>Bags</Text>
//                         <Text style={styles.sty7}>*</Text>
//                         <Text style={[styles.sty5, { marginLeft: 3 }]}>:</Text>
//                         <TextInput
//                             style={[styles.sty15, { marginLeft: moderateScale(15), justifyContent: 'center', alignItems: 'center' }]}
//                             onChangeText={(text) => handleFieldChange('Bags', text)}
//                             value={formState.Bags}
//                         />
//                     </View>

//                     {/* Bardan Type */}
//                     <View style={styles.sty12}>
//                         <Text style={styles.sty5}>Bardan</Text>
//                         <Text style={styles.sty7}>*</Text>
//                         <DropdownComponent
//                             value={formState.Bardan}
//                             onChange={(item) => {
//                                 handleFieldChange('Bardan', item?.label);
//                             }}
//                         />
//                     </View>

//                     {/* Item Type */}
//                     <View style={styles.sty12}>
//                         <Text style={styles.sty5}>ItemType</Text>
//                         <Text style={styles.sty7}>*</Text>
//                         <ItemDropdownComponent
//                             value={formState.ItemType}
//                             onChange={(item) => {
//                                 handleFieldChange('ItemType', item?.label);
//                             }}
//                         />
//                     </View>

//                     {/* Payment */}
//                     <View style={styles.sty12}>
//                         <Text style={styles.sty5}>Payment</Text>
//                         <TextInput
//                             style={[styles.sty15, { marginLeft: moderateScale(0), flex: 1 }]}
//                             onChangeText={(text) => handleFieldChange('Payment', text)}
//                             value={formState.Payment}
//                         />
//                     </View>

//                     {/* Note */}
//                     <View style={styles.sty12}>
//                         <Text style={styles.sty5}>Note</Text>
//                     </View>
//                     <View style={{ marginTop: moderateScale(10) }}>
//                         <TextInput
//                             style={styles.sty16}
//                             onChangeText={(text) => handleFieldChange('Notes', text)}
//                             value={formState.Notes}
//                         />
//                     </View>

//                 </View>
//                 )
//                 )}

//             <Button title="Add Field" onPress={addDynamicField} />
//             <Button title="Remove Field" onPress={removeDynamicField} />
//             <Button title="Save to Firestore" onPress={saveDataToFirestore} />
//         </ScrollView>
//     );
// };
// const styles = StyleSheet.create({
//     sty1: {
//         flex: 1,
//         backgroundColor: Colors.white,

//     },
//     sty2: {
//         color: 'black',
//         fontStyle: 'normal',
//         fontSize: moderateScale(21),
//         // marginLeft: moderateScale(5),
//         fontWeight: '700',
//         marginTop: moderateScale(10)
//     },
//     sty3: {
//         margin: moderateScale(10),

//         backgroundColor: 'white',
//         paddingHorizontal: moderateScale(10),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 5 },
//         shadowOpacity: 1,
//         shadowRadius: 3.84,
//         paddingVertical: moderateScale(20),
//     },
//     sty4: {
//         flex: 1,

//     },
//     sty5: {
//         color: Colors.primary,
//         fontSize: moderateScale(15),
//         fontWeight: '600'
//     },
//     sty6: {
//         flexDirection: 'row'
//     },
//     sty7: {
//         color: 'red',
//         marginLeft: moderateScale(0)
//     },
//     sty8: {

//         padding: moderateScale(5),
//         paddingLeft: moderateScale(10),
//         borderStyle: 'solid',
//         borderColor: '#ccc',
//         borderWidth: 1,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         backgroundColor: '#fff',
//         color: 'black',
//         flex: 1
//     },
//     sty9: {
//         marginVertical: moderateScale(10),
//         flexDirection: 'row',
//         alignItems: 'center',
//         // height:moderateScale(100)
//     },
//     sty10: {
//         color: 'black',
//         marginHorizontal: moderateScale(10)
//     },
//     sty11: {
//         color: Colors.primary,
//         fontSize: moderateScale(25),
//     },
//     sty12: {
//         flexDirection: 'row',
//         marginTop: moderateScale(10),
//         alignItems: 'center',

//     },
//     sty13: {
//         color: 'black',
//         fontSize: moderateScale(15),
//         marginTop: moderateScale(5)
//     },
//     sty14: {
//         color: 'red',
//         marginLeft: moderateScale(2)
//     },
//     sty15: {


//         padding: moderateScale(5),
//         paddingLeft: moderateScale(10),
//         borderStyle: 'solid',
//         borderColor: '#ccc',
//         borderWidth: 1,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         backgroundColor: '#fff',
//         color: 'black',
//         width: moderateScale(150)

//     },
//     sty16: {
//         borderBottomWidth: 1,
//         borderTopWidth: 0,
//         borderLeftWidth: 0,
//         borderRightWidth: 0,
//         borderColor: '#ccc',
//         padding: moderateScale(5),
//         paddingLeft: moderateScale(10),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         backgroundColor: '#fff',
//         color: 'black',
//         flex: 1
//     },
//     SaveContainer: {

//         padding: 20,
//         // paddingHorizontal:moderateScale(100),
//         borderRadius: moderateScale(10),
//         backgroundColor: Colors.primary,
//         width: moderateScale(80),
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     SaveText: {
//         color: 'white',
//     },
//     bottomview: {
//         flexDirection: 'row', flex: 1,
//         justifyContent: 'center',
//         marginVertical: moderateScale(10),


//     },
//     sty17: {
//         marginLeft: moderateScale(5),
//         color: 'black',
//         fontSize: moderateScale(14),
//         fontWeight: '400'
//     }

// })
// export default DynamicForm;
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DynamicForm = () => {
  const [formState, setFormState] = useState({
    registerNumber: '',
    sellerName: '',
    buyerName: '',
    dynamicFields: [  { rate: '', timeType: '', payment: '', notes: '' },
],
  });

  const addDynamicField = () => {
    setFormState((prevState) => ({
      ...prevState,
      dynamicFields: [
        ...prevState.dynamicFields,
        { rate: '', timeType: '', payment: '', notes: '' },
      ],
    }));
  };

  const saveDataToFirestore = async () => {
    const { registerNumber, sellerName, buyerName, dynamicFields } = formState;

    try {
      const statementListRef = firestore().collection('statementList');
      const batch = firestore().batch();

      dynamicFields.forEach((fieldSet) => {
        const dataToSave = {
          registerNumber,
          sellerName,
          buyerName,
          ...fieldSet,
        };

        const newDocumentRef = statementListRef.doc();
        batch.set(newDocumentRef, dataToSave);
      });

      await batch.commit();
      console.log('Data saved to Firestore');
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  return (
    <View>
      <TextInput
        style={{borderWidth:1,color:'black'}}
                   placeholderTextColor={'black'}
        placeholder="Register Number"
        value={formState.registerNumber}
        onChangeText={(text) =>
          setFormState({ ...formState, registerNumber: text })
        }
      />
      <TextInput
        style={{borderWidth:1,color:'black'}}
        placeholderTextColor={'black'}
        placeholder="Seller Name"
        value={formState.sellerName}
        onChangeText={(text) =>
          setFormState({ ...formState, sellerName: text })
        }
      />
      <TextInput
        style={{borderWidth:1,color:'black'}}
        placeholderTextColor={'black'}
        placeholder="Buyer Name"
        value={formState.buyerName}
        onChangeText={(text) =>
          setFormState({ ...formState, buyerName: text })
        }
      />
      {formState.dynamicFields.map((field, index) => (
        <View key={index}>
          <TextInput
            style={{borderWidth:1,color:'black'}}
            placeholderTextColor={'black'}
            placeholder="Rate"
            value={field.rate}
            onChangeText={(text) =>
              setFormState((prevState) => {
                const updatedFields = [...prevState.dynamicFields];
                updatedFields[index].rate = text;
                return { ...prevState, dynamicFields: updatedFields };
              })
            }
          />
          <TextInput
            style={{borderWidth:1,color:'black'}}
            placeholderTextColor={'black'}
            placeholder="Time Type"
            value={field.timeType}
            onChangeText={(text) =>
              setFormState((prevState) => {
                const updatedFields = [...prevState.dynamicFields];
                updatedFields[index].timeType = text;
                return { ...prevState, dynamicFields: updatedFields };
              })
            }
          />
          <TextInput
            style={{borderWidth:1,color:'black'}}
            placeholderTextColor={'black'}
            placeholder="Payment"
            value={field.payment}
            onChangeText={(text) =>
              setFormState((prevState) => {
                const updatedFields = [...prevState.dynamicFields];
                updatedFields[index].payment = text;
                return { ...prevState, dynamicFields: updatedFields };
              })
            }
          />
          <TextInput
            style={{borderWidth:1,color:'black'}}
            placeholderTextColor={'black'}
            placeholder="Notes"
            value={field.notes}
            onChangeText={(text) =>
              setFormState((prevState) => {
                const updatedFields = [...prevState.dynamicFields];
                updatedFields[index].notes = text;
                return { ...prevState, dynamicFields: updatedFields };
              })
            }
          />
        </View>
      ))}
      <Button title="Add Field" onPress={addDynamicField} />
      <Button title="Save to Firestore" onPress={saveDataToFirestore} />
    </View>
  );
};

export default DynamicForm;
