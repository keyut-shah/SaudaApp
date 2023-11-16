// import React, { useState, useEffect } from 'react';
// import { Button, TextInput } from 'react-native';
// import auth from '@react-native-firebase/auth';

// const  PhoneSignIn=()=> {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   // verification code (OTP - One-Time-Passcode)
//   const [code, setCode] = useState('');

//   // Handle login
//   function onAuthStateChanged(user) {
//     if (user) {
//       // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
//       // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
//       // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
//       // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
//     }
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     console.log("cinfirmation is ",confirmation);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     console.log("confirm conde method ",code);
//     try {
//       await confirm.confirm(code);
//       console.log("My code is confirm or not ",confirm);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+91 8980865111')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }
// export default PhoneSignIn;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const PhoneSignIn = ({ navigation }) => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  function onAuthStateChanged(user) {
    if (user) {
      navigation.replace('BottomTab'); 
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); 
  }, [navigation]);

  async function signInWithPhoneNumber() {
    try {
      const formattedPhoneNumber = `+91${phoneNumber}`;
      const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.error('Error signing in with phone number:', error.message);
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.error('Invalid code:', error.message);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!confirm ? (
        <>
          <TextInput
            style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: 200,color:'black' }}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor={'black'}
          />
          <Button title="Sign In" onPress={signInWithPhoneNumber} />
        </>
      ) : (
        <>
          <TextInput
            style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: 200,color:'black' }}
            placeholder="Enter Verification Code"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
            placeholderTextColor={'black'}
          />
          <Button title="Confirm Code" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};

export default PhoneSignIn;
