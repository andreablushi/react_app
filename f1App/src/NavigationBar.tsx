import React from 'react';
import {useNavigation} from '@react-navigation/native';

import { TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import { RootStackNavigationProp } from './App';

import { SafeAreaView } from 'react-native-safe-area-context';

//Component which already defines a basic structure for the bottom-bar to export to other components
export const NavigationBar = ({}) => {
    //Calls the navigation with the prop defined in the App.tsx
    const navigation = useNavigation<RootStackNavigationProp>();
    //Basic structure of the navigation bar

    //DA DEFINIRE LE ICONE IN LIGHT E DARK MODE
    return (
      <SafeAreaView style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Image source={require('../img/icon/light/homepage.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
          <Image source={require('../img/icon/light/schedule.png')} style={styles.icon} />
        </TouchableOpacity>
        <Pressable onPress={() => navigation.navigate('Drivers')}>
          <Image source={require('../img/icon/light/drivers.png')} style={styles.icon} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Teams')}>
          <Image source={require('../img/icon/light/teams.png')} style={styles.icon} />
        </Pressable>
      </SafeAreaView>
    );
  };


//Style of the bottom-tab
const styles = StyleSheet.create({
    navigationBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'red',
      paddingVertical: 14,
    },
    icon: {
      width: 24,
      height: 24,
    },
  });