import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PendingTask from '../components/PendingTask';
import InProgressTask from '../components/InProgressTask';
import CompletedTask from '../components/CompletedTask';

const TaskScreenDemo = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'pending', title: 'Pending' },
    { key: 'inProgress', title: 'In-Progress' },
    { key: 'completed', title: 'Completed' },
  ]);

  const renderScene = SceneMap({
    pending: () => <PendingTabContent navigation={navigation} />,
    inProgress: () => <InProgressTabContent navigation={navigation} />,
    completed: () => <CompletedTabContent  navigation={navigation}/>,
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
                <View style={{backgroundColor:'#F1F5FF', width:40, height:40,padding:10,borderRadius:50, marginTop:0,}}>
                <Image source={require('../../assets/images/user.png')} style={styles.user} />
                </View>
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

const TaskTabContent = ({ tab }) => {
  // Customize the content based on the selected tab (pending or completed)
  // You can use your TaskItem component here to render individual tasks
  return (
    <View style={styles.tabContent}>
      <Text>{`${tab} tasks content`}</Text>
    </View>
  );
};


const PendingTabContent = ({ navigation }) => {
    // Customize the content based on the selected tab (pending or completed)
    // You can use your TaskItem component here to render individual tasks
    return (
      <ScrollView style={styles.tabContent}>
        <View style={{paddingBottom:100,}}>
        <PendingTask navigation={navigation}/>
        <PendingTask  navigation={navigation}/>
        </View>
      </ScrollView>
    );
  };

  const InProgressTabContent = ({ navigation }) => {
    // Customize the content based on the selected tab (pending or completed)
    // You can use your TaskItem component here to render individual tasks
    return (
      <ScrollView style={styles.tabContent}>
        <View style={{paddingBottom:100,}}>
        <InProgressTask navigation={navigation}/>
       
        </View>
      </ScrollView>
    );
  };

  const CompletedTabContent = ({ navigation }) => {
    // Customize the content based on the selected tab (pending or completed)
    // You can use your TaskItem component here to render individual tasks
    return (
      <ScrollView style={styles.tabContent}>
        <View style={{paddingBottom:100,}}>
        <CompletedTask navigation={navigation}/>
       
        </View>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor:'#fff'
  },
  headerContainer:{
    flexDirection:'row',
    alignSelf:'center',
    gap:121,
    marginTop:30,
    marginLeft:130,
},
headerText:{
    fontSize:16,
    fontWeight:'600',
    marginTop:10,
},
user:{
   width:18,
   height:18,
    alignSelf:'center'
},
  tabIndicator: {
    backgroundColor:  '#1F2A47', // Customize the indicator color
  },
  tabBar: {
    backgroundColor: 'white', // Customize the tab bar background color
  },
  tabLabel: {
    color: 'black',
    textTransform: 'none' ,
    fontSize:14,
    fontWeight:'500',// Customize the tab label color
  },
  tabContent: {
    flex:1,
    padding:20,
    
  
  },
});

export default TaskScreenDemo;
