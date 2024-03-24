import React, { useEffect, useState } from "react";
import { Button, Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Race } from "./Schedule";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Styles from "../stylesheets/Styles"
import { Light, Dark } from "../stylesheets/Theme";

type Result = {
  number: number // driver number
  position: number
  points: number // points earned
  Driver: {
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

export default function RaceResult ({ route }) {

  // variables
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {race}: {race:Race} = route.params;
  const {season} = route.params;
  const {isDarkMode} = route.params;
  const apiUrl = "https://ergast.com/api/f1/" + season + "/" + race.round + "/results.json";
  const theme = isDarkMode ? Dark : Light;
   

  

  // fetch results
  const getResults =  async() => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      let filteredArrayValues = data.MRData.RaceTable.Races[0].Results;
      setResults(filteredArrayValues);
      console.log("retrieving results");
    } catch (error){
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: theme.title_bar.backgroundColor}}>
      <View style={[{flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10}, theme.title_bar ]}>
        <View style={[theme.title_bar, {flex: 2.1}]}>
          <Text style={theme.title_bar}>round {race.round}</Text>
          <Text style={theme.title_bar}>{race.raceName}</Text>
          <Text style={theme.title_bar}>{race.Circuit.circuitName}</Text>
          <Text style={theme.title_bar}>{race.date}</Text>
        </View>
        <View style={[theme.title_bar, {flex: 1}]}>
          <Image source={require("../Formula1-Images-API/public/countries/italy.png")}></Image>
        </View>
      </View>
      <ScrollView style={{backgroundColor: theme.title_bar.backgroundColor}}>
      {results.map( result => <Pressable key={result.position}>
          <Driver result={result} darkMode={isDarkMode}></Driver>
        </Pressable>)}
      </ScrollView>  
    </SafeAreaView>
  );
};

function Driver(props: Props) {
  const result = props.result;
  const driver = result.Driver;
  const team = result.Constructor;
  const theme = props.darkMode ? Dark : Light;
  const time = result.status.toLowerCase() === "finished" ? result.Time.time : "DNF (" + result.status + ")";

  

  return (
    <View style={[Styles.driverResultWrapper, theme.card]}>
      <Text style={[Styles.positionResult, theme.card]}>{result.position}</Text>
      <Image style={[Styles.driverPictureResult, ]} source={require("../Formula1-Images-API/public/drivers/leclerc_front.png")}></Image>
      <View style={[Styles.driverResult, theme.card]}>
        <Text style={[Styles.driverTextResult, theme.card]}>{driver.givenName} {driver.familyName}</Text>
        <Text style={[Styles.teamTextResult, theme.card]}>{team.name}</Text>
      </View>
      <Text style={[Styles.timeResult, theme.card]}>{time}</Text>
    </View>
  )
}