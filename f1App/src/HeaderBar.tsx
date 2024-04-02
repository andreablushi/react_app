import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalThemeControl } from './App';
import Styles from "../stylesheets/Styles";
import Formula1Black from './fonts/Formula1-Black.ttf'; // Adjust the path as necessary

//MOMENTANEAMENTE USELESS

export const HeaderBar: React.FC = () => {
  const navigation = useNavigation();

  const [darkMode, setDarkMode] = useState(globalThemeControl.getTheme());

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={Styles.header_container}>
        <Text style={styles.header_text}>Formula 1</Text>    
    </View>
  );
};

const styles = StyleSheet.create({
  header_text: {
    fontFamily: 'Formula1-Black', // Use the registered font family
    // Add other styles as needed
  },
});

export default HeaderBar;


