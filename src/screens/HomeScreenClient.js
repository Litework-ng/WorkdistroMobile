// HomeScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SearchNormal1 } from "iconsax-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [firstName, setFirstName] = useState('');

  const ServiceItem = ({ label, image, onPress }) => (
    <TouchableOpacity onPress={() => onPress(label)}>
      <View style={styles.serviceItem}>
        <Image source={image} style={styles.serviceItemImage} />
        <Text style={styles.serviceItemLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
  const handleSearch = (text) => {
    setSearchQuery(text); // Update search input state
    if (text.length === 0) {
      setFilteredServices([]);
    } else {
      const filtered = services.filter(
        (service) =>
          service.name &&
          service.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  const handleSearchBlur = () => {
    // Dismiss the keyboard when the search input loses focus
    Keyboard.dismiss();
  };

  const handleServiceItemClick = (service) => {
    // Navigate to the MultiStepForm screen
    setSearchQuery("");
    navigation.navigate("MultiStepForm", { service });
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await AsyncStorage.getItem("services");
        if (servicesData) {
          const services = JSON.parse(servicesData);
          setServices(services);
          setFilteredServices(services);
        }
      } catch (error) {
        console.error("Error retrieving services from storage:", error);
        Alert.alert(
          "Error",
          "Failed to retrieve services. Please check your network connection and try again.",
          [{ text: "OK" }]
        );
      }
    };

    const getFirstName = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        if (storedFirstName) {
          setFirstName(storedFirstName);
        }
      } catch (error) {
        console.error('Error retrieving first name', error);
      }
    };

    getFirstName();
    fetchServices();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleSearchBlur}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 0,
            marginTop: 10,
            marginBottom: 10,
            gap: 30,
          }}
        >
          <Image
            source={require("../../assets/icon.png")}
            style={styles.iconLogo}
          />
          <Image
            source={{
              uri: "https://nodal-episode-400211.firebaseapp.com/splashImg.png",
            }}
            style={styles.wordLogo}
          />
        </View>
        <Text style={styles.welcomeText}>Hello {firstName}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchQuery}
            style={styles.searchInput}
            placeholder="What type of help do you need?"
            onBlur={() => {
              handleSearchBlur();
            }}
            onChangeText={handleSearch}
          />
          <SearchNormal1 size={24} color="#292D32" style={styles.searchIcon} />
        </View>
        {searchQuery.length > 0 && filteredServices.length > 0 && (
          <View>
            <FlatList
              data={filteredServices}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.serviceSearchItem}
                  onPress={() => handleServiceItemClick(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <View style={styles.servicesContainer}>
          <View style={styles.ManaulRequestcontainer}>
            <Text style={styles.servicesTitle}>Popular Tasks</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ManualRequest")}
            >
              <Text style={styles.manaulRequestText}>
                Can’t Find What You Need?
              </Text>
            </TouchableOpacity>
          </View>
          {/* Render the services grid or list */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.servicesGrid}>
              {/* Row 1 */}
              <View style={styles.servicesRow}>
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServiceItemClick()}
                />

                <ServiceItem
                  label="service !"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
              </View>
              <View style={styles.servicesRow}>
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
              </View>
              <View style={styles.servicesRow}>
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
                <ServiceItem
                  label="Service 1"
                  image={require("../../assets/images/services.png")}
                  onPress={() => handleServicePress("Service 1")}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 230,
    height: 48,
    marginBottom: 37,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
  },

  iconLogo: {
    width: 48,
    height: 48,
  },
  wordLogo: {
    width: 182,
    height: 48,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1A1A1A",
    fontFamily: "Manrope-Bold",
  },
  servicesTitle: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Manrope-Bold",
  },
  ManaulRequestcontainer: {
    flexDirection: "row",
    alignSelf: "center",
    // gap: 110,
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  manaulRequestText: {
    color: "#31DE9E",
    fontSize: 10,
    paddingTop: 5,
    fontFamily: "Manrope-Regular",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CECECE",
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
    height: 40,
    width: "100%",
    alignSelf: "center",
  },
  searchIcon: {
    marginRight: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: "#333333",
    height: 40,
    fontFamily: "Manrope-Regular",
  },
  serviceSearchItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  servicesGrid: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 250,
  },
  serviceItemLabel: {
    alignSelf: "center",
    marginBottom: 32,
    fontFamily: "Manrope-Medium",
  },
});

export default HomeScreen;
