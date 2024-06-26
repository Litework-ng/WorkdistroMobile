import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DropdownInput from "../components/DropDown";
import UploadPhotoInput from "../components/UploadphotoInput";
import BottomTabNavigator from "../components/BottomTabNavigator";
import CustomBottomNavBar from "../components/CustomNavBar";
import Button from "../components/Button";

const DescriptionForm = ({
  onNext,
  route,
  StepIndicator,
  step,
  navigation,
  jobDetails,
  onChange,
}) => {
  // const [subject, setSubject] = useState("");
  // const [description, setDescription] = useState("");
  // const [selectedValue, setSelectedValue] = useState(null);
  const [descriptionErr, setDescriptionErr] = useState(false);

  // const dropdownItems = [
  //   { label: 'Item Delivery', value: 'Item Delivery' },
  //   { label: 'Grocery Shopping', value: 'Grocery Shopping' },
  //   { label: 'Bill Payments', value: 'Bill Payments' },
  // ];

  // const handleDropdownChange = (value) => {
  //   setSelectedValue(value);
  // };

  const handleUploadPhoto = () => {
    // Implement your logic for uploading a photo
    console.log("Upload photo logic");
  };

  // const [text, setText] = useState("");

  const maxLength = 500;
  const remainingCharacters = maxLength - jobDetails.description;

  return (
    <ScrollView style={{ backgroundColor: "#ffffff", padding: 20 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Description</Text>
      </View>

      {/* Dropdown input for subject */}
      <StepIndicator step={step} />
      <View>
        <Text style={styles.dropDownLabel}>Subject</Text>
        <TextInput
          style={styles.subjectInput}
          value={jobDetails.serviceName}
          editable={false}
        />
      </View>

      {/* Multiline text input for description */}
      <View>
        <Text style={[styles.descriptionInputLabel]}>Description</Text>
        {descriptionErr && (
          <Text
            style={{
              color: "red",
            }}
          >
            Please,You need to give a description
          </Text>
        )}
        <TextInput
          multiline
          style={[
            styles.descriptionInput,
            {
              width: "100%",
              // backgroundColor: "red",
              borderRadius: 8,
            },
          ]}
          placeholder="Please give a full description of the task"
          onChangeText={(text) => {
            onChange("description", text);
          }}
          value={jobDetails.description}
          maxLength={maxLength}
        />

        <Text
          style={[
            styles.characters,
            {
              // marginBottom: 20,
            },
            {
              color:
                jobDetails.description.length < 200
                  ? "grey"
                  : jobDetails.description.length < 300
                  ? "green"
                  : jobDetails.description.length < 480
                  ? "blue"
                  : "red",
            },
          ]}
        >{`${jobDetails.description.length}/500`}</Text>
      </View>

      {/* Upload photo input */}
      <UploadPhotoInput label="Upload photo" />

      <Button
        text="Next"
        onPress={() => {
          setDescriptionErr(false);
          if (jobDetails.description.trim() == "") {
            setDescriptionErr(true);
            return;
          }
          onNext();
        }}
      />
      <CustomBottomNavBar navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    gap: 84,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  dropDownLabel: {
    color: "#525252",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },

  descriptionInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#6B6B6B",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 5,
    marginTop: 5,
    paddingTop: 10,
    height: 213,
    width: 335,
  },

  descriptionInputLabel: {
    color: "#525252",
  },

  characters: {
    color: "#B9B9B9",
    fontSize: 14,
    marginBottom: 40,
  },

  subjectInput: {
    fontSize: 14,
    fontWeight: "400",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: "#6B6B6B",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },

  nextButton: {
    backgroundColor: "#1F2A47",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 340,
    height: 50,
    marginBottom: 16,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DescriptionForm;
