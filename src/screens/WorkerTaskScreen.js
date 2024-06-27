import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BidsFeed from '../components/BidsFeed';
import InProgressTaskWorker from '../components/InProgressTaskWorker';
import CompletedTaskWorker from '../components/CompletedTaskWorker';
import LoadingOverlay from '../components/Loading' 
import ErrorModal from '../components/ErrorModal';
import api from '../components/Api'

const WorkerTaskScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'bids', title: 'Bids' },
    { key: 'inProgress', title: 'In-Progress' },
    { key: 'completed', title: 'Completed' },
  ]);

  const renderScene = SceneMap({
    bids: () => <BidTabContent navigation={navigation} />,
    inProgress: () => <InProgressTabContent navigation={navigation} />,
    completed: () => <CompletedTabContent navigation={navigation} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tasks</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const fetchData = async (url, token, setData) => {
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setData(response.data.response);
  } catch (error) {
    console.log('Error fetching data bid', error);
  }
};

const BidTabContent = ({ navigation }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      const token = await AsyncStorage.getItem('logintoken');
      if (token) {
        await fetchData('worker/bid/', token, setBids);
      }
    };
    fetchBids();
  }, []);

  if (!bids || bids.length === 0) {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bids available</Text>
        </View>
    );
}

  return (
    <ScrollView style={styles.tabContent}>
      <View style={{ paddingBottom: 100 }}>
        {bids.map((item) => (
          <BidsFeed key={item.id} job={item.job} bid={item} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
};

const InProgressTabContent = ({ navigation }) => {
  const [inProgressTasks, setInProgressTasks] = useState([]);

  useEffect(() => {
    const fetchInProgressTasks = async () => {
      const token = await AsyncStorage.getItem('logintoken');
      if (token) {
        await fetchData('worker/inprogress/', token, setInProgressTasks);
      }
    };
    fetchInProgressTasks();
  }, []);

  return (
    <ScrollView style={styles.tabContent}>
      <View style={{ paddingBottom: 100 }}>
        {inProgressTasks.map((item) => (
          <InProgressTaskWorker key={item.id} job={item.job} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
};

const CompletedTabContent = ({ navigation }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      const token = await AsyncStorage.getItem('logintoken');
      if (token) {
        await fetchData('worker/completed/', token, setCompletedTasks);
      }
    };
    fetchCompletedTasks();
  }, []);

  return (
    <ScrollView style={styles.tabContent}>
      <View style={{ paddingBottom: 100 }}>
        {completedTasks.map((item) => (
          <CompletedTaskWorker key={item.id} job={item.job} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 121,
    marginTop: 10,
    marginBottom: 50,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    fontFamily: 'Manrope-Bold'
  },
  tabIndicator: {
    backgroundColor: '#1F2A47', // Customize the indicator color
  },
  tabBar: {
    backgroundColor: 'white', // Customize the tab bar background color
  },
  tabLabel: {
    color: 'black',
    textTransform: 'none',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Manrope-Medium'
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
});

export default WorkerTaskScreen;