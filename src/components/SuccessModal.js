import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TickCircle } from 'iconsax-react-native';

const SuccessModal = ({ visible, message, onClose, onConfirm }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                <TickCircle size="32" color="#31DE9E"  variant="Bold"/>
                    <Text style={styles.modalMessage}>{message}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onConfirm}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center',
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Manrope-Regular',
    },
    closeButton: {
        backgroundColor: '#1F2A47',
        padding: 10,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
       
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Manrope-SemiBold',
    },
});

export default SuccessModal;
