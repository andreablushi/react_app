import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList} from './App'; // Importa RootParamList da App.tsx
import { Dark, Light } from '../stylesheets/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalThemeControl } from './App';



export type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomePage = () => {

    // -------- THEME -------------------------------------------------------------
    const [darkMode, setDarkMode] = useState(globalThemeControl.getTheme());
    const switchTheme= () => {
      globalThemeControl.getTheme() ? setDarkMode(false) : setDarkMode(true);
      globalThemeControl.changeTheme()
    }
    const theme = darkMode ? Dark : Light;
    //-----------------------------------------------------------------------------


  //I "create" the same navigation by taking HomePageNavigationProp which for now is a copy of
  //NativeStackNavigationProp from App.tsx
  const navigation = useNavigation<HomePageNavigationProp>();
  
  const goToSchedule = () => {
    navigation.navigate("Schedule")
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
