import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import JobCard from './JobCard';

const BestMatchesTabContent = ({ navigation, jobs }) => {
  const renderItem = ({ item }) => (
    <JobCard navigation={navigation} job={item} />
  );

  // Assuming budget is a property of the job and you want jobs with the highest budget
  const bestMatches = useMemo(() => jobs.sort((a, b) => b.budget - a.budget), [jobs]);

  return (
    <View style={styles.container}>
      <FlatList
        data={bestMatches}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    padding: 10,
    backgroundColor:'#FFF'
  },
});

export default React.memo(BestMatchesTabContent);
