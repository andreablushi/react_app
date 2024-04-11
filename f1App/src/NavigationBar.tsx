import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import { TouchableOpacity, StyleSheet, Image, Pressable, View } from 'react-native';
import { RootStackNavigationProp, cfg } from './App';
import { globalThemeControl } from './App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dark, Light } from '../stylesheets/Theme';
import { forVerticalIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import { EventRegister } from 'react-native-event-listeners';


//Component which already defines a basic structure for the bottom-bar to export to other components
export const NavigationBar = ({}) => {
    //Calls the navigation with the prop defined in the App.tsx
    const navigation = useNavigation<RootStackNavigationProp>();
    //Basic structure of the navigation bar
    //Setting the theme
  const [darkMode, setDarkMode] = useState(cfg.darkMode);
    useEffect(() => {
      EventRegister.addEventListener('cfg', data => {
        setDarkMode(data);
      })
    }, [])
    

    return (
      <SafeAreaView style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, paddingVertical: 14}}>
            <Image source={darkMode ? require('../img/icon/dark/homepage.png') : require('../img/icon/light/homepage.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Schedule')} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, paddingVertical: 14}}>
            <Image source={darkMode ? require('../img/icon/dark/schedule.png') : require('../img/icon/light/schedule.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
        <Pressable onPress={() => navigation.replace('Drivers')} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, paddingVertical: 14}}>
            <Image source={darkMode ? require('../img/icon/dark/drivers.png') : require('../img/icon/light/drivers.png')} style={styles.icon} />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.replace('Teams')} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, paddingVertical: 14}}>
            <Image source={darkMode ? require('../img/icon/dark/teams.png') : require('../img/icon/light/teams.png')} style={styles.icon} />
          </View>
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
      height: 50
    },
    icon: {
      width: 24,
      height: 24,
    },
  });

