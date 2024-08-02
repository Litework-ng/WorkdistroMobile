import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PendingTask from '../components/PendingTask';
import InProgressTask from '../components/InProgressTask';
import CompletedTask from '../components/CompletedTask';
import api from '../components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskScreenDemo = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [routes] = useState([
    { key: 'pending', title: 'Pending' },
    { key: 'inProgress', title: 'In-Progress' },
    { key: 'completed', title: 'Completed' },
  ]);

  const renderScene = SceneMap({
    pending: () => <PendingTabContent navigation={navigation} />,
    inProgress: () => <InProgressTabContent navigation={navigation} />,
    completed: () => <CompletedTabContent navigation={navigation} />,
  });

  useEffect(() => {
    const loadProfilePhoto = async () => {
      const savedProfilePhoto = await AsyncStorage.getItem('profilePhoto');
      if (savedProfilePhoto) {
        setProfilePhoto(savedProfilePhoto);
      }
    };
    loadProfilePhoto();
  }, []);

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
        <Image
          source={profilePhoto ? {uri:profilePhoto} : require("../../assets/images/user.png")}
          style={{ width: 50, height: 50 , borderRadius:50, marginRight:10,}}
        />
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

const PendingTabContent = ({ navigation, imageSource }) => {
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const loginToken = await AsyncStorage.getItem('logintoken');
        const response = await api.get('user/jobs/pending/', {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        });
        setPendingTasks(response.data.response);
        console.log(loginToken)
      } catch (error) {
        console.error('Failed to fetch pending tasks', error);
       
      }
    };

    fetchPendingTasks();
  }, []);


  return (
    <ScrollView style={styles.tabContent}>
      <View style={{ paddingBottom: 100 }}>
        {pendingTasks.map((task) => (
          <PendingTask key={task.id} navigation={navigation} task={task} imageSource={imageSource} />
        ))}
      </View>
    </ScrollView>
  );
};

const InProgressTabContent = ({ navigation, }) => {
  const [inProgressTasks, setInProgressTasks] = useState([]);

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const loginToken = await AsyncStorage.getItem('logintoken');
        const response = await api.get('user/jobs/in-progress/', {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        });
        setInProgressTasks(response.data.response);
      } catch (error) {
        console.error('Failed to fetch pending tasks', error);
       
      }
    };

    fetchPendingTasks();
  }, []);
  return (
    <ScrollView style={styles.tabContent}>
      <View style={{ paddingBottom: 100 }}>
       {inProgressTasks.map((task) => (
          <InProgressTask key={task.id} navigation={navigation} task={task} imageSource={require('../../assets/images/services.png')} />
        ))}
      </View>
    </ScrollView>
  );
};

const CompletedTabContent = ({ navigation }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const loginToken = await AsyncStorage.getItem('logintoken');
        const response = await api.get('user/jobs/completed/', {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        });
        setCompletedTasks(response.data.response);
      } catch (error) {
        console.error('Failed to fetch pending tasks', error);
       
      }
    };

    fetchPendingTasks();
  }, []);


  return (
    <ScrollView style={styles.tabContent}>
     <View style={{ paddingBottom: 100 }}>
       {completedTasks.map((task) => (
          <InProgressTask key={task.id} navigation={navigation} task={task} imageSource={require('../../assets/images/services.png')} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 121,
    marginTop: 10,
    marginLeft: 130,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  user: {
    width: 18,
    height: 18,
    alignSelf: 'center',
  },
  tabIndicator: {
    backgroundColor: '#1F2A47',
  },
  tabBar: {
    backgroundColor: 'white',
  },
  tabLabel: {
    color: 'black',
    textTransform: 'none',
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
});

export default TaskScreenDemo;

