import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import JobCard from './JobCard';

const MostRecentTabContent = ({ navigation, jobs }) => {
  const renderItem = ({ item }) => (
    <JobCard navigation={navigation} job={item} />
  );

  const mostRecent = useMemo(() => jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate)), [jobs]);

  return (
    <View style={styles.container}>
      <FlatList
        data={mostRecent}
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
  },
});

export default React.memo(MostRecentTabContent);
