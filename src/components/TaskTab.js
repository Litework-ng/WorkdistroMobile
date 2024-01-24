// TaskTabs.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskTabs = ({ activeTab, onChangeTab }) => {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
        onPress={() => onChangeTab('pending')}
      >
        <Text style={styles.tabText}>Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'inProgress' && styles.activeTab]}
        onPress={() => onChangeTab('inProgress')}
      >
        <Text  style={styles.tabText}>In-Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
        onPress={() => onChangeTab('completed')}
      >
        <Text  style={styles.tabText}>Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    gap:24,
    backgroundColor: '#fff', // Adjust the background color as needed
  },
  tab: {
    padding: 8,
    paddingLeft:32,
    paddingRight:32,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#1F2A47', 
  },
  tabText:{
    fontSize:14,
    fontWeight:'500',
  }
});

export default TaskTabs;
