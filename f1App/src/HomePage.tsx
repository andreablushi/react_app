import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App'; // Importa RootParamList da App.tsx

type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomePage = () => {

  const navigation = useNavigation<HomePageNavigationProp>();
  const goToSchedule = () => {
    navigation.navigate('Schedule');
  };
  const goToDrivers = () => {
    navigation.navigate('Drivers');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Homepage</Text>
      <Button title="Go to Schedule" onPress={goToSchedule} />
      <Button title="Go to Drivers" onPress={goToDrivers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 20,
  },
});

export default HomePage;
