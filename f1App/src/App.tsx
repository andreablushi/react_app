import React, { useState } from 'react';
import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HomePage from './HomePage';
import Schedule, { Race } from './Schedule';
import Drivers from './DriverStandings';
import RaceResult from './RaceResult';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  StartingScreen: undefined;
  HomePage: undefined;
  Schedule: { isDarkMode: boolean };
  Drivers: undefined;
  RaceResult: {
    isDarkMode: boolean
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
      <TouchableOpacity onPress={() => navigation.navigate('Schedule', {isDarkMode: true})}>
        <Image source={require('../img/icon/homepage.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Drivers')}>
        <Image source={require('../img/icon/homepage.png')} style={styles.icon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartingScreen" component={StartingScreen} options={{ headerShown: false }} />
        <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name='Schedule' component={Schedule} options={{ headerShown: false }}/>
        <Stack.Screen name='RaceResult' component={RaceResult} options={{ headerShown: false }}/>
        <Stack.Screen name='Drivers' component={Drivers} />
      </Stack.Navigator>
      <NavigationBar/>
    </NavigationContainer>
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
