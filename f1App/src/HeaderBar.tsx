import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalThemeControl } from './App';
import Styles from "../stylesheets/Styles";
//MOMENTANEAMENTE USELESS

export const HeaderBar: React.FC = () => {
  const navigation = useNavigation();

  const [darkMode, setDarkMode] = useState(globalThemeControl.getTheme());

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={Styles.header_container}>
      <TouchableOpacity onPress={handleBackPress} style={Styles.header_backButton}>
        <Image source={darkMode ? require("../img/icon/dark/arrow.png") : require("../img/icon/light/arrow.png")} style={Styles.header_arrow}></Image>
      </TouchableOpacity>
    </View>
  );
};



export default HeaderBar;


