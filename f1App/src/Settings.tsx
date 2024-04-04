import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View, Text, Pressable, Image } from "react-native";;
import { setConfig } from "./App";
import { EventRegister } from "react-native-event-listeners";
import { Dark, Light } from "../stylesheets/Theme";

/**========================================================================
 *                           TYPES
 *========================================================================**/

type Props = {
  darkMode: boolean
  setDarkMode: any
  setSettingsVisible: any
}

/**========================================================================
 **                       SETTINGS COMPONENT
 *========================================================================**/ 
export default function Settings (props: Props) {

  /*================== PROPS =================*/
  
  const darkMode = props.darkMode;
  const setDarkMode = props.setDarkMode;
  const setSettingsVisible = props.setSettingsVisible

  /*================== HOOKS =================*/
  const switchTheme = async() => {
    const tmp = darkMode ? false : true
    await setConfig({darkMode: tmp})
    EventRegister.emit('cfg', tmp)
    // console.log("cfg " + cfg.darkMode)
    setDarkMode(tmp) 
  }
  const theme = darkMode ? Dark : Light;

  /*=============== ANIMATIONS ==============*/

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, [])
  

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const dimensions = {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: darkMode ? "#000000bb" : "#ffffffbb"
    // top: windowHeight * 0.27,
    // left: windowWidth * 0.05,
  }

  const lilBackground = {
    backgroundColor: darkMode ? '#222e' : '#eeed'
  }
  
  /*================== CLOSE SETTINGS METHOD =================*/
  const closeSettings = async () => {
    fadeOut();
    await new Promise(r => setTimeout(r, 200));
    setSettingsVisible(false);
  }
  
  /*================== RENDER =================*/
  return(
    
    <Animated.View style={[dimensions, css.overlay,  { opacity: fadeAnim}]}>
      <View style={[{flex: 1}]}></View>

      <View style={[{}, lilBackground, css.lilWIndow, {borderColor: '#8884'}]}>
        <Pressable onPress={closeSettings} style={[{alignItems: 'flex-end'},]}>
          <Image source={darkMode ? require("../img/icon/dark/xmark.png") : require("../img/icon/light/xmark.png")}
            style={[css.closeIcon]}></Image> 
        </Pressable>
        <Text style={[{color: theme.card.color}, css.settingsText]}>
          SETTINGS
        </Text>
        <Pressable style={[theme.card, css.changeButton]} onPress={switchTheme}>
          <Text style={[css.buttonText]}>
            CHANGE THEME
          </Text>
        </Pressable>
        <View style={[{flex: 2}]}>
          <Text style={[css.themeText, {textAlign: 'center', fontSize: 18, fontWeight: '400', textAlignVertical: 'top', color: theme.card.color}]}>Current Theme:</Text>
          <View style={[{flexDirection: 'row', justifyContent: 'center'}]}>
            <Text style={[{color: theme.card.color}, css.themeText]}>{darkMode ? 'Dark' : 'Light'}</Text>
            <View style={[{ marginLeft: 5}]}>
              <Image source={darkMode ? require("../img/icon/dark/moon.png") : require("../img/icon/light/sun.png")}
              style={[css.closeIcon, {flex: 1, justifyContent: 'flex-start'}]}>
              </Image>
            </View>
          </View>
        </View>
        
      </View>
      
      <View style={{flex: 1}}></View>
    </Animated.View>
  );
}

/**========================================================================
 *                           STYLESHEET
 *========================================================================**/
const css = StyleSheet.create({
  overlay: {
    position: 'absolute',
    padding: 20
  },
  lilWIndow: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderBlockColor: 'gold'
  }, 
  changeButton: {
    flex: 1.5,
    backgroundColor: '#FF1801',
    borderRadius: 20,
    marginHorizontal: 50,
    marginVertical: 10
  },
  settingsText: {
    flex: 1.5,
    textAlign: 'center', 
    textAlignVertical: 'center',
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: 1
  }, 
  closeIcon: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
    opacity: 0.75
  }, 
  buttonText: {
    textAlign: 'center', 
    textAlignVertical: 'center', 
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#eee'
  },
  themeText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'right',
    textAlignVertical: 'center'
  }
})