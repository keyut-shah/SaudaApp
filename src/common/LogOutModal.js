import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const LogOutConfirmationModal = ({ isVisible, onClose, onDelete }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Do you want to Logout?</Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose}>
              <Text style={styles.noButton}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Text style={styles.deleteButton}>Yes</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: moderateScale(20),
    borderRadius: 10,
    width: 300,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color:"black"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    color: 'red',
    fontSize: 18,
  },
  noButton: {
    color: 'blue',
    fontSize: 18,
  },
});

export default LogOutConfirmationModal;
