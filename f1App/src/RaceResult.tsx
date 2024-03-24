import React, { useEffect, useState } from "react";
import { Button, Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Race } from "./Schedule";
import Styles from "../stylesheets/Styles"

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
}

export default function RaceResult ({ route }) {

  // variables
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {race}: {race:Race} = route.params;
  const {season} = route.params;
  const apiUrl = "https://ergast.com/api/f1/" + season + "/" + race.round + "/results.json";

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
    <SafeAreaView>
      <View>
        <View>
          <Text>round {race.round}</Text>
          <Text>{race.raceName}</Text>
          <Text>{race.Circuit.circuitName}</Text>
          <Text>{race.date}</Text>
        </View>
        <View>
          <Image source={require("../Formula1-Images-API/public/countries/italy.png")}></Image>
        </View>
      </View>
      <ScrollView>
        {results.map( result => <Pressable key={result.position}>
          <Driver result={result}></Driver>
        </Pressable>)}
      </ScrollView>  
    </SafeAreaView>
  );
};

function Driver(props: Props) {
  const result = props.result;
  const driver = result.Driver;
  const team = result.Constructor;
  const time = result.status.toLowerCase() === "finished" ? result.Time.time : "DNF (" + result.status + ")";

  return (
    <View style={Styles.driverResultWrapper}>
      <Text style={Styles.positionResult}>{result.position}</Text>
      <Image style={Styles.driverPictureResult} source={require("../Formula1-Images-API/public/drivers/leclerc_front.png")}></Image>
      <View style={Styles.driverResult}>
        <Text style={Styles.driverTextResult}>{driver.givenName} {driver.familyName}</Text>
        <Text style={Styles.teamTextResult}>{team.name}</Text>
      </View>
      <Text style={Styles.timeResult}>{time}</Text>
    </View>
  )
}