import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet,Image} from 'react-native';
import TaskTabs from "../components/TaskTab";
import PendingTask from "../components/PendingTask";


const TaskScreen = () => {
    const [activeTab, setActiveTab] = useState('pending');

    const changeTab = (tab) => {
        setActiveTab(tab);
        // Add logic to fetch tasks based on the selected tab
      };
      const pendingContent = (
        <View>
          
          {/* Add your UI components for pending tasks */}
          <PendingTask/>
          <PendingTask/>
        </View>
      );
      const InProgressContent = (
        <View>
          <Text>Display In-Progress Tasks Here</Text>
          {/* Add your UI components for pending tasks */}
        </View>
      );

      const CompletedContent = (
        <View>
          <Text>Display Completed Tasks Here</Text>
          {/* Add your UI components for pending tasks */}
        </View>
      );

      const renderContent = () => {
        switch (activeTab) {
          case 'pending':
            return pendingContent;
          case 'inProgress':
            return InProgressContent;
          case 'completed':
            return CompletedContent;
          default:
            return null;
        }
      };

    return(
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Tasks</Text>
                <View style={{backgroundColor:'#F1F5FF', width:40, height:40,padding:10,borderRadius:50, marginTop:0,}}>
                <Image source={require('../../assets/images/user.png')} style={styles.user} />
                </View>
            </View>

                {/* Include the TaskTabs component */}
                <TaskTabs activeTab={activeTab} onChangeTab={changeTab} />
                {renderContent()}

        </ScrollView>
    );
};
const styles = StyleSheet.create({
   container:{
    flex:1,
    padding:20,
    backgroundColor:'#fff',     
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
    }
})
export default TaskScreen