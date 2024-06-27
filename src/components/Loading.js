import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingOverlay = ({ visible }) => {
    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#1F2A47" style={styles.indicator} />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator:{
        backgroundColor:'#fff',
        padding:15,
        borderRadius:8,
    },
});

export default LoadingOverlay;
