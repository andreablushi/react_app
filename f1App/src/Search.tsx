import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, } from "react-native";
import { Season } from "./Schedule";
import { Dark, Light } from "../stylesheets/Theme";

/**========================================================================
 * *                          TYPES
 *========================================================================**/
type Props = {
  setSearch: any,
  setTextInput: any,
  textInput: string,
  seasons: Season[]
  setYear: any
  darkMode: boolean
}

/**========================================================================
 **                         SEARCH COMPONENT
 *========================================================================**/
function Search(props: Props) {

  /*================== PROPS =================*/
  const setSearch = props.setSearch;
  const textInput = props.textInput;
  const setTextInput = props.setTextInput;
  const seasons = props.seasons;
  const setYear = props.setYear;
  const darkMode = props.darkMode;
  const theme = darkMode ? Dark : Light;

  /*================== HOOKS =================*/
  const [placeHolder, setPlaceHolder] = useState("Search Season")

  /*=============== ANIMATIONS ==============*/
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
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
    height: windowHeight
  }
  
  /*================== SEARCHBAR CHECK METHOD =================*/
  const verifyAndChange = async () => {
    const pattern = new RegExp("20[0-1][0-9]|19[5-9][0-9]|202[0-4]");
    pattern.test(textInput) ? (
      setYear(parseInt(textInput, 10)),
      fadeOut(),
      await new Promise(r => setTimeout(r, 250)),
      setSearch(false)
    ) : setPlaceHolder("Enter a valid year");
  }

  /*================== CLOSE SEARCH COMPONENT =================*/
  const closeSearch = async () => {
    fadeOut();
    await new Promise(r => setTimeout(r, 250));
    setSearch(false);
  }
  
  /*=============== RENDER ==============*/
  return(
    <Animated.View style={[Style.overlay, dimensions, {backgroundColor: darkMode ? "#000000cc" : "#ffffffcc", opacity: fadeAnim}]}>
      <View style={[{flex: 1, flexDirection: 'row', marginVertical: 20}]}>
        <View style={[{flex: 1}]}></View>
        <TextInput 
          keyboardType='numeric'
          maxLength={4}
          placeholder={placeHolder}
          placeholderTextColor={theme.card.color}
          onPressIn={() => setPlaceHolder("")}
          selectTextOnFocus={true}
          style={[{borderColor: theme.card.color, color: theme.card.color }, theme.card, Style.searchField]}
          onChangeText={text => setTextInput(text)}
          onEndEditing={(() => verifyAndChange())}>
          
        </TextInput>
        <Pressable onPress={() => closeSearch()} style={[{flex: 1, justifyContent: 'center'}]}>
          <Image source={darkMode ? require("../img/icon/dark/xmark.png") : require("../img/icon/light/xmark.png")} style={[{maxHeight: 40, maxWidth: 40, resizeMode: 'contain', alignSelf: 'center'}]}></Image>
        </Pressable>
      </View>
      <View style={[{flex: 12, marginHorizontal: 10}]}>
        <ScrollView contentContainerStyle={{}}>
          <View style={[{flex: 1, flexDirection: 'row', flexWrap: "wrap", columnGap: 10, alignItems: 'center', justifyContent: 'center'}]}>
            {seasons.map(season => <Pressable key={season.season} onPress={() => {setYear(season.season), closeSearch() }}>
              <View style={[Style.yearWrap,]}>
                <Text style={[{ color: theme.card.color}, Style.year]}>{season.season}</Text>
              </View>
            </Pressable>)}
          </View>
        </ScrollView>
      </View>
      <View style={{flex: 2}}></View>
    </Animated.View>
  )
}
/**========================================================================
 *                           STYLESHEET
 *========================================================================**/
const Style = StyleSheet.create({
  overlay: {
    position: 'absolute',
  },
  yearWrap : {
    padding: 10,
    borderRadius: 20
  },
  year: {
    fontWeight: '600',
    letterSpacing: 1,
    fontSize: 30,
    textShadowColor: 'gray',
    elevation: 10,
    textShadowRadius: 10,
    textShadowOffset: {height: 1, width: 1}
  },
  searchField: {
    marginHorizontal: 10, 
    fontSize: 20, 
    flex: 5, 
    textAlign: 'center', 
    borderRadius: 10, 
    opacity: 0.95, 
    borderWidth: 2,
    
  }
})

export default Search;