import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Race } from "./Schedule";
import Styles from "../stylesheets/Styles"
import { Light, Dark } from "../stylesheets/Theme";
import { useNavigation } from "@react-navigation/native";
import { HomePageNavigationProp } from "./HomePage";
import { cfg, globalThemeControl, imageSource } from "./App";
import { NavigationBar } from "./NavigationBar";
import axios from "axios";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

type Result = {
  number: number // driver number
  position: number
  points: number // points earned
  Driver: {
    driverId: string,
    givenName: string, // first name
    familyName: string, // last name
    permanentNumber: number // actual driver number
    code: string // broadcast abbreviation
    dateOfBirth: string
    nationality: string
  }
  Constructor: {
    name: string
    nationality: string
  }
  Time: {
    time: string
  }
  grid: number // starting position
  laps: number // laps at the end of the race
  status: string
  
}

type Props = {
  result: Result
  darkMode: boolean
}

export default function RaceResult ({route}: any) {


  // -------- THEME -------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(cfg.darkMode);
  const theme = darkMode ? Dark : Light;
  //-----------------------------------------------------------------------------
  
  //hooks
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(false);
  const navigation = useNavigation<HomePageNavigationProp>();
  

  // route
  const {race}: {race:Race} = route.params;
  const circuit = race.Circuit.circuitName;
  const {season} = route.params;
  

  // control variables
  const apiUrl = "https://ergast.com/api/f1/" + season + "/" + race.round + "/results.json";
  const country = race.Circuit.Location.country;

  // date formatting
  const day = race.date.slice(8, 10);
  const month = race.date.slice(5, 7);
  const year = race.date.slice(0, 4);
  const date = day + "/" + month + "/" + year;
  
  // fetch results
  const getResults =  async() => {
    try {
      console.log("retrieving results");
      const response = await axios.get(apiUrl);
      setResults(response.data.MRData.RaceTable.Races[0]?.Results);
    } catch (error){
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  /*================== ANIMAZIONE =================*/
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fadeIn();
  }, [loading])
  // render
  return (
    <SafeAreaView style={{backgroundColor: theme.title_bar.backgroundColor, flex: 1}}>
      <View style={[{flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10,}, theme.title_bar ]}>
        <View style={[theme.title_bar, {flex: 3}]}>
          <Text style={[theme.title_bar, {fontSize: 18, fontWeight: '700'}]}>Round {race.round}</Text>
          <Text style={[theme.title_bar, {fontSize: 16}]}>{race.raceName}</Text>
          <Text style={[theme.title_bar, {fontSize: 16}]}>{race.Circuit.circuitName}</Text>
          <Text style={[theme.title_bar, { fontWeight: '500', color: '#a1a1a1'}]}>{date}</Text>
        </View>
        <View style={[theme.title_bar, {flex: 1}]}>
          <Image source={imageSource.getFlag(country)} style={{ resizeMode: 'contain', flex: 1}}></Image>
        </View>
        
      </View>
      <View style={[theme.title_bar, {flex: 5, alignItems:"center", padding:25}]}>
        <Image source={imageSource.getCircuit(circuit)} style={{ resizeMode: 'contain', flex: 1}}></Image>
        </View>
      <View style={{backgroundColor: theme.card.backgroundColor, flex: 9}}>
        <Text style={[theme.card, { fontSize: 20, fontFamily:'Formula1-Bold_web', padding: 10, textAlign:"center" }]}> Results </Text>
        <Animated.ScrollView style={{backgroundColor: theme.card.backgroundColor, opacity: fadeAnim}}>
        {results != undefined ? results.map( result => <Pressable key={result.Driver.driverId} onPress={() => navigation.replace("DriverInfo", {driver: result.Driver.driverId})}>
            <Driver result={result} darkMode={darkMode}></Driver>
          </Pressable>) : <Text style={[Styles.notFoundText, theme.card]}>Informations about this race{"\n"} are not available</Text>}
        
        </Animated.ScrollView>
      </View> 
      <NavigationBar/>
    </SafeAreaView>
  );
};

function Driver(props: Props) {

  // props
  const result = props.result;
  const driver = result.Driver;
  const team = result.Constructor;
  const theme = props.darkMode ? Dark : Light;
  const time = result.status.toLowerCase() === "finished" ? result.Time.time : "DNF (" + result.status + ")";


  /*================== ANIMAZIONE =================*/
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, [])
  // render
  return (
    <Animated.View style={[Styles.driverResultWrapper, theme.card, theme.divisor, {opacity: fadeAnim}]}>
      <Text style={[Styles.positionResult, theme.card, { width: 40}]}>{result.position}</Text>
      <Image style={[Styles.driverPictureResult, ]} source={imageSource.getDriverSide(driver.familyName)}></Image>
      <View style={[Styles.driverResult, theme.card]}>
        <Text style={[Styles.driverTextResult, theme.card]}>{driver.givenName} {driver.familyName}</Text>
        <Text style={[Styles.teamTextResult, theme.card]}>{team.name}</Text>
      </View>
      <Text style={[Styles.timeResult, theme.card]}>{time}</Text>
    </Animated.View>
  )
}