
import React,{useState} from 'react';
import {ActivityIndicator,SafeAreaView,Modal,View,StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from './Colors';

export default Loader=()=>{
    const [showLoader, setLoading] = useState(false)
    const showloader = () => {
        setLoading(true);
      };
    
      // Function to hide the loader
      const hideloader = () => {
        setLoading(false);
      };
    return(
        <SafeAreaView>
        <Modal
            visible={showLoader}
            transparent={true}
        // animated={true}
        // animationType="slide"
        //onRequestClose={() => setLoading(false)}
        >
            <View style={styles.sty1}>
                <View style={styles.sty2}>
                    <ActivityIndicator color={Colors.primary} />
                </View>
            </View>
        </Modal>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sty1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
    },
    sty2: {
        height: moderateScale(100),
        width: moderateScale(100),
        borderRadius: moderateScale(4),
        backgroundColor: 'white'
    }
})