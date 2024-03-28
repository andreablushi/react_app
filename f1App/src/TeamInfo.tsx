import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TeamInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Team Name</Text>
      <Text style={styles.description}>Description of the team goes here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
});

export default TeamInfo;
