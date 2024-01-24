import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { faEye, faChevronLeft, faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const UploadPhotoInput = ({ label }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      console.log('press on')
    }
  };

  return (
    <View style={styles.ImageInputContainer}>
      <Text style={styles.ImgageInputLabel}>{label}</Text>
      <TouchableOpacity onPress={pickImage} style={{ marginVertical: 10, alignSelf:'center', }}>
      <FontAwesomeIcon icon={faFileArrowUp} size={32} style={{alignSelf:'center', marginTop:10,}} color='#787878'/>
        <Text style={{color:'#787878', marginBottom:34,}}>Choose a photo</Text>
      </TouchableOpacity>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    ImageInputContainer:{
        width:335,
        height:118,
        borderWidth:1,
        borderColor:'#6B6B6B',
        marginBottom:32,
        borderRadius:4,
        
    }, 
    ImgageInputLabel:{
        marginTop:0,
        color:'#525252',
        position:'relative',
        bottom:24,
        right:0,
    }
})

export default UploadPhotoInput;
