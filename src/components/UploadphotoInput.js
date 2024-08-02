import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";


import { DocumentUpload } from "iconsax-react-native";

const UploadPhotoInput = ({ label }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log("Selected Image URI:", result.assets[0].uri);
    }
  };

  return (
    <View style={styles.ImageInputContainer}>
      <Text style={styles.ImgageInputLabel}>{label}</Text>
      <TouchableOpacity
        onPress={pickImage}
        style={{ marginVertical: 10, alignSelf: "center" }}
        accessibilityLabel="Choose a photo"
      >
        <DocumentUpload
          size={32}
          style={{ alignSelf: "center", marginTop: 10 }}
          color="#787878"
        />
        <Text style={{ color: "#787878", marginBottom: 34 }}>
          Choose a photo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageInputContainer: {
    width: "100%",
    // backgroundColor: "red",
    borderRadius: 8,
    height: 118,
    borderWidth: 1,
    borderColor: "#6B6B6B",
    marginBottom: 32,
    borderRadius: 4,
  },
  ImgageInputLabel: {
    marginTop: 0,
    color: "#525252",
    position: "relative",
    bottom: 24,
    right: 0,
  },
});

export default UploadPhotoInput;
