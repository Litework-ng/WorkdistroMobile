import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Send2, Camera, Flag, ClipboardClose, Location, } from 'iconsax-react-native';
import CustomMenu from '../components/CustomMenu';
const JobCard = ({ job, navigation }) => {
    const handleBid = (job) => {
      navigation.navigate('WorkerBid', { job });
  };
  const menuItems = [
    { label: 'Report Task', icon: Flag, onPress: () => console.log('Option 1 pressed') },
    { label: 'Task Not Best For Me', icon: ClipboardClose, onPress: () => console.log('Option 2 pressed') },
  ];

    return (
        <View
            style={{
                borderWidth: 1,
                padding: 15,
                borderRadius: 4,
                marginTop: 20,
                borderColor: "#E4E4E4",
                backgroundColor:'#fff',
            }}
        >
            <View style={{ flexDirection:'row', gap:'230', alignItems:'center'}}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Text style={styles.taskTitle}>{job.subject}</Text>
                </View>
                <CustomMenu menuItems={menuItems} />
            </View>
            <Text
                style={{
                    fontSize: 12,
                    fontFamily: 'Manrope-Regular',
                    color: "#7E7E7E",
                    width: 303,
                    height: 36,
                    marginTop: 10,
                }}
            >
                {job.description}
            </Text>
            <View style={styles.detailsContainer}>
                <View style={styles.itemDetailsContainer}>
                <Location size={16} color="#7E7E7E" />
                    <Text style={styles.locationText}>{job.location}</Text>
                </View>
               
            </View>
            <Text style={styles.budgetText}>Budget: N{job.budget}</Text>
            <TouchableOpacity
                style={styles.ViewBidButton}
                onPress={() => handleBid(job)}
            >
                <Text style={styles.ViewBidText}>Bid</Text>
            </TouchableOpacity>
        </View>
    );
};




const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  details: {
    fontSize: 12,
    color: '#666',
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: 'Manrope-Medium',
  },
  detailsContainer: {
    flexDirection: "row",
    gap: 32,
    marginTop: 10,
    padding: 0,
  },
  itemDetailsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    gap: 2,
  },
  paymentText: {
    fontSize: 12,
    color: "#7E7E7E",
    alignSelf: "center",
    fontWeight: "400",
    fontFamily: 'Manrope-Regular',
  },
  locationText: {
    fontSize: 12,
    color: "#7E7E7E",
    alignSelf: "center",
    fontWeight: "400",
    fontFamily: 'Manrope-Regular',
  },
  budgetText: {
    marginTop: 18,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: 'Manrope-Medium',
  },
  ViewBidButton: {
    backgroundColor: "#1F2A47",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 169,

    marginBottom: 6,
    marginTop: 40,
  },

  ViewBidText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
  },
});

export default React.memo(JobCard);
