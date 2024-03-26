import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, useColorScheme, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HomePage from './HomePage';
import Schedule, { Race } from './Schedule';
import Drivers from './DriverStandings';
import RaceResult from './RaceResult';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagesDB from '../utils/ImagesDB';
import { Dark, Light } from '../stylesheets/Theme';
import { FadeFromBottomAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

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
  RaceResult: {
    season: number
    race: Race
  }
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

const NavigationBar = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isStartingScreen, setIsStartingScreen] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Check if the current screen is the StartingScreen
      const unsubscribe = navigation.addListener('focus', () => {
        setIsStartingScreen(true);
      });

      return unsubscribe;
    }, [])
  );

  // If the current screen is the StartingScreen, do not render the NavigationBar
  if (isStartingScreen) {
    return null;
  }

  
  return (
    <SafeAreaView style={styles.navigationBar}>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
        <Image source={require('../img/icon/homepage.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
        <Image source={require('../img/icon/homepage.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Drivers')}>
        <Image source={require('../img/icon/homepage.png')} style={styles.icon} />
      </TouchableOpacity>
    </SafeAreaView>
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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="StartingScreen" component={StartingScreen} options={{ headerShown: false }} />
          <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name='Schedule' component={Schedule} options={{ headerShown: false}}/>
          <Stack.Screen name='RaceResult' component={RaceResult} options={{ headerShown: false}}/>
          <Stack.Screen name='Drivers' component={Drivers} options={{ headerShown: false }}/>
        </Stack.Navigator>
        <NavigationBar/>
      </NavigationContainer>
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

