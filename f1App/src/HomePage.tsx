import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList} from './App'; // Importa RootParamList da App.tsx

import Styles from "../stylesheets/Styles";
import { Dark, Light } from '../stylesheets/Theme';

import { SafeAreaView } from 'react-native-safe-area-context';
import { globalThemeControl, imageSource, queryClient} from './App';
import { NavigationBar } from './NavigationBar';




export type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type driverStandings = {
  position: number;
  points: number;
  Driver: {
    driverId: string;
    givenName: string; 
    familyName: string;
  }
  Constructors: [{
    constructorId: string;
    name: string;
  }]
}

type DriverProp = {
  darkMode: boolean
  driver_standing: driverStandings
}
function Driver_Standings_Element (props: DriverProp): React.JSX.Element {
  // import prop, to improve readability
  const theme = props.darkMode ? Dark : Light;
  
  const driver = props.driver_standing.Driver
  const standing = props.driver_standing
  return(
    <View style = {[Styles.driverResultWrapper, {flex: 1, flexDirection: 'column'}]}>
      <Text style = {{textAlign: 'left', fontSize: 20}}> {driver.givenName} {driver.familyName}</Text>
      <Text>Points: {standing.points}</Text>
      
      <View style ={{flex: 1, flexDirection: 'row'}}>
        <Text style = {{textAlignVertical: 'bottom', flex: 1}}>{standing.position}</Text>
        <Image source={imageSource.getDriverSide(driver.familyName)} style = {{height: 90, width: 90, resizeMode: 'contain', alignSelf: 'flex-end'}}></Image>
      </View>
    </View>
  )
};
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
  //------ GETTING DATA FROM CACHE API --------------------------------------------
    //Hooks
    const [driver_standings_data, setDriverStanding] = useState<driverStandings[]>([]);

    useEffect(() => {
      /*Tentativo data Caching*/
      
      const driver_Cached_Data : any = queryClient.getQueryData(['driverStandings']);
      
      setDriverStanding(driver_Cached_Data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    }, []);
  //-------------------------------------------------------------------------------
  return (  
    <SafeAreaView style={[styles.safeAreaView, theme.card]}>
      <ScrollView horizontal={true}>
        {driver_standings_data.map( 
          driver_standings_data => <Driver_Standings_Element key = {driver_standings_data.Driver.driverId} darkMode={darkMode} driver_standing={driver_standings_data}></Driver_Standings_Element>
        )}
      </ScrollView>
      <View style={[styles.container, theme.card]}>
          <Text style={[styles.title, theme.card]}>Welcome to the Homepage</Text>
          <Button title="Go to Schedule" onPress={goToSchedule} /> 
          <Button title="Go to Drivers" onPress={goToDrivers} />
          <Button onPress={switchTheme} title='Switch Theme' />
          <Text style={[theme.card, {fontSize: 18}]}>Current theme: {darkMode ? "Dark" : "Light"}</Text>
      </View>
            {/** COMMENTO DI SERVIZIO, AGGIUGGENDO LA NAVIGATION BAR QUA HO AVUTO PROBLEMI CON GLI STYLES, PERCIO P 
             * PENSO SIA MOLTO SENSIBILE A MODIFICHE DELLA STRUTTURA DELLA PAGINE, ALTROVE NON HO AVUTO PROBLEMI, SPERO DI
             * NON AVER CAUSATO PROBLEMI
             */}
      <NavigationBar/>{/* Imported the navigation bar from the NavigationBar.tsx component as it's defined*/}
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomePage;
