import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, useColorScheme, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Dark, Light } from '../stylesheets/Theme';
import { FadeFromBottomAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

//Our Component
import HomePage from './HomePage';
import Schedule, { Race } from './Schedule';
import Drivers from './DriverStandings';
import DriverInfo from './DriverInfo';
import { NavigationBar } from './NavigationBar';
import RaceResult from './RaceResult';
import Teams from './TeamStandings';
import ImagesDB from '../utils/ImagesDB';

const Stack = createNativeStackNavigator();

// Global theme controller 
export class globalThemeControl {
  static theme = true;

  public static changeTheme() {
    console.log("switching theme, now: " + globalThemeControl.theme ? "Dark": "Light")
    globalThemeControl.theme ? globalThemeControl.theme = false : globalThemeControl.theme = true;
  }

  public static getTheme() {
    // console.log(globalThemeControl.theme ? "Dark": "Light")
    return globalThemeControl.theme;
  }

  public static setTheme(darkMode: boolean) {
    globalThemeControl.theme = darkMode
  }
}

export class imageSource {
  public static getDriverSide(name: string) {
    const imageObject = ImagesDB['drivers-side'].find(driver => driver.name.toLowerCase() === name.toLowerCase());
    return imageObject ? imageObject.src : ImagesDB.driverNotFound;
  };

  public static getFlag(nation: string) {
    const imageObject = ImagesDB['flags'].find(flag => flag.nation.toLowerCase() === nation.toLowerCase());
    return imageObject ? imageObject.src : ImagesDB.notfound;
  };
}

export type RootStackParamList = {
  StartingScreen: undefined;
  HomePage: undefined;
  Schedule: undefined;
  Drivers: undefined;
  Teams: undefined;
  RaceResult: {
    season: number
    race: Race
  };
  DriverInfo:{
    driver: string
  };
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

export const StartingScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  return (
    <View style={styles.starting_container}>
      <TouchableOpacity onPress={() => navigation.replace('HomePage')}>
        <Image source={require('../img/starting-image.jpg')} style={styles.starting_image} />
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  // -------- THEME -------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(useColorScheme() === 'dark');
  globalThemeControl.setTheme(darkMode);
  useEffect(() => {
    const refresh = setInterval(() => {
      setDarkMode(globalThemeControl.getTheme())
    }, 1000);
    return () => clearInterval(refresh)
  }, [globalThemeControl.theme])
 
  const switchTheme= () => {
    globalThemeControl.getTheme() ? setDarkMode(false) : setDarkMode(true);
    globalThemeControl.changeTheme()
  }
  const theme = darkMode ? Dark : Light;
  //-----------------------------------------------------------------------------

  return (
    <View style={[{flex: 1, backgroundColor: theme.card.backgroundColor}]}>
      <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="StartingScreen" component={StartingScreen} options={{ headerShown: false }} />
          <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name='Schedule' component={Schedule} options={{ headerShown: false}}/>
          <Stack.Screen name='RaceResult' component={RaceResult} options={{ headerShown: false}}/>
          <Stack.Screen name='Drivers' component={Drivers} options={{ headerShown: false }}/>
          <Stack.Screen name='DriverInfo' component={DriverInfo} options={{ headerShown: false }}/>
          <Stack.Screen name='Teams' component={Teams} options={{headerShown: false}}/>
        </Stack.Navigator>
        
      </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  starting_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starting_image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

