// JobSelectionModal.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Api";
import { SearchNormal1 } from "iconsax-react-native";

const JobSelectionModal = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const popularJobs = [
    { id: 30, name: "Grocery Shopping" },
    { id: 12, name: "Chef/Cook" },
    { id: 38, name: "Laundry" },
    { id: 23, name: "Electrician" },
    { id: 25, name: "Fumigation" },
  ];

  useEffect(() => {
    const loadServicesFromStorage = async () => {
      try {
        const storedServices = await AsyncStorage.getItem("services");
        if (storedServices) {
          const servicesData = JSON.parse(storedServices);
          setServices(servicesData);
          setFilteredServices(servicesData); // Initialize with all services
        }
      } catch (error) {
        console.error("Failed to load services from storage", error);
      }
    };

    loadServicesFromStorage();
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setFilteredServices([]);
    } else {
      // Filter services based on search term
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, services]);
  const handleJobSelection = (job) => {
    Alert.alert(
      "Confirm Selection",
      `Are you sure you want to select ${job.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => confirmJobSelection(job),
        },
      ],
      { cancelable: false }
    );
  };
  const confirmJobSelection = async (job) => {
    try {
      // Store the selected job locally
      await AsyncStorage.setItem('selectedJobAsync', JSON.stringify(job));
      // Proceed to registration or login
      navigation.goBack();
    } catch (error) {
      console.error('Failed to store job selection:', error);
    }
  };


 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Speciality</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Jobs"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <SearchNormal1 size={24} color="#292D32" style={styles.searchIcon} />
      </View>
      {filteredServices.length > 0 && (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleJobSelection(item)}
              style={[
                styles.jobItem,
                selectedJob === item.name && styles.selectedJobItem,
              ]}
            >
              <Text
                style={[
                  styles.jobText,
                  selectedJob === item.name && styles.selectedJobText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Text style={styles.popularJobsTitle}>Popular Jobs</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.popularJobsContainer}
        showsHorizontalScrollIndicator={false}
      >
        {popularJobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            onPress={() => handleJobSelection(job)}
            style={styles.chip}
          >
            <Text style={styles.chipText}>{job.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        transparent={true}
        animationType="none"
        visible={loading}
        onRequestClose={() => {}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color="#1F2A47"
            />
            <Text style={styles.modalText}>Loading</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    marginTop: 20,
  },
  jobItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedJobItem: {
    backgroundColor: "#1F2A47",
  },
  jobText: {
    fontSize: 16,
  },
  selectedJobText: {
    color: "white",
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: "#333333",
    height: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CECECE",
    marginHorizontal: 15,
    marginVertical: 15,
    paddingHorizontal: 15,
    elevation: 3,
    height: 50,
    width: 355,
    alignSelf: "center",
  },
  searchIcon: {
    marginRight: 0,
  },
  jobText: {
    fontSize: 16,
  },
  popularJobsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  popularJobsContainer: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    marginRight: 8,
    height: 40,
  },
  chipText: {
    fontSize: 14,
    color: "#333",
  },
  searchIcon: {
    marginRight: 0,
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 120,
    width: 120,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default JobSelectionModal;
