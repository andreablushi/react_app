import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList} from './App'; // Importa RootParamList da App.tsx
import { Dark, Light } from '../stylesheets/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';


type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomePage = () => {
  //I "create" the same navigation by taking HomePageNavigationProp which for now is a copy of
  //NativeStackNavigationProp from App.tsx
  const navigation = useNavigation<HomePageNavigationProp>();
  
  //------ theme manager --------
  const [darkMode, setDarkMode] = useState(useColorScheme() === 'dark');
  const theme = darkMode ? Dark : Light;

  const switchTheme= () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  }
  //-----------------------------


  //const navigation = useNavigation<HomePageNavigationProp>();
  // NB: Ho commentato questa riga sopra perchè non riuscivo a capire come passare i parametri
  // con questa implementazione di navigation, non dovrei aver rotto nulla, se si è rotto qualcosa
  // a causa di questa modifica dimmelo che rimetto come prima 
  // - Zeno

  const goToSchedule = () => {
    navigation.navigate("Schedule", {isDarkMode: darkMode})
  };
  const goToDrivers = () => {
    navigation.navigate('Drivers');
  };

  return (
    <SafeAreaView style={[styles.container, theme.card]}>
      <Text style={[styles.title, theme.card]}>Welcome to the Homepage</Text>
      <Button title="Go to Schedule" onPress={goToSchedule} /> 
      <Button title="Go to Drivers" onPress={goToDrivers} />
      <Button onPress={switchTheme} title='switch theme'></Button>
      <Text style={[theme.card, {fontSize: 18}]}>Current theme: {darkMode ? "Dark" : "Light"}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 20,
  },
});

export default HomePage;
