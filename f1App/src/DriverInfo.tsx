import React, { useEffect, useState } from 'react';
import Styles from "../stylesheets/Styles";
import { Light, Dark } from "../stylesheets/Theme";

//Import used to implement navigation
import { useNavigation } from "@react-navigation/native";
import { HomePageNavigationProp } from "./HomePage";

import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { cfg, globalThemeControl, imageSource } from './App';
import { NavigationBar } from './NavigationBar';

type DriverInfo = {
    driverId: string
    permanentNumber: number
    givenName: string
    familyName: string
    dateOfBirth: string
    nationality: string
}

type Constructor = {
  constructorId: string
  name: string
}

type DriverResult = {
  round: number
  raceName: string
  Circuit: {
    circuitName: string
    circuitId: string
    Location: {
      country: string
    }
  }
  Results: [{
    position: number
    points: number
  }]
}
type SeasonResults = {
  season: number;
  DriverStandings : [{
    position: number;
    points: number;
    wins: number;
    Constructors:[{
      constructorId: string;
      name: string;
    }];
  }];
}
/*Type props, used for passing the parameters to the function*/
type DriverProps = {
  darkMode: boolean
  DriverInfo: DriverInfo
}
type TeamProps = {
  darkMode: boolean
  team: Constructor
}
type ResultProps = {
  darkMode: boolean
  result: DriverResult
}

/*Returns an element containing the driver team info and the logo image.*/
function Driver_Team_Component(prop: TeamProps) : React.JSX.Element{
  //Setting the parameters
  const theme = prop.darkMode ? Dark : Light;
  const teamData = prop.team
  
  return(
    <View style={[{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10}, theme.title_bar ]}>
      <View style={[theme.title_bar, {flex: 3}]}>
        <Text style={[theme.title_bar, {fontSize: 16, fontWeight: '400'}]}>Team:</Text>
        <Text style={[theme.title_bar, {fontSize: 20, fontWeight: '800'}]}>{teamData.name}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={imageSource.getTeamBadge(teamData.constructorId)} style={{ resizeMode: 'contain', width: 60, height: 60}}></Image>
      </View>
    </View>
  );
};

/*Return the information for a specific race of the current season*/
function Driver_Season_Results_Component(prop: ResultProps) : React.JSX.Element{
  //Setting the parameters
  const theme = prop.darkMode ? Dark : Light;
  const race = prop.result
  const circuit = race.Circuit
  const result = race.Results[0]

  //Creating the element
  return (
    <View style={[theme.divisor, Styles.raceScheduleContainer, theme.card, {flex: 1, paddingVertical: 7}]}>
      <View style={[{flex: 1}, theme.card]}>
        <Image source={imageSource.getFlag(circuit.Location.country)} style={[{resizeMode:'contain',  width: 70, height:70,  flex: 1}]}></Image>
      </View>
      <View style={[{flex: 5, paddingLeft: 20, flexDirection: 'row'}]}>
        <View style={[{flex: 2.5}]}>
          <Text style={[Styles.sectionDescription, theme.card, {
          fontSize: 17, 
          fontWeight: '500', 
          flex: 1,
          textAlignVertical: 'bottom'
          }]}>Round: {race.round}</Text>
          <Text style={[Styles.sectionDescription, theme.card, {color: theme.title_bar.color}]}>{race.raceName}</Text>
          <Text style={[Styles.sectionDescription, theme.card, {textAlign: 'left', flex: 1}]}>Position: {result.position}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[Styles.sectionDescription, theme.card, {textAlign: 'left', flex: 2, textAlignVertical: 'center'}]}>Points: </Text>
          <Text style={[Styles.sectionDescription, theme.card, {textAlign: 'center', flex: 1, textAlignVertical: 'center'}]}>{result.points}</Text>
        </View>
      </View>
  </View>
);
}

/* Return the seasonalResults of a driver, from most recent to oldest*/
function Old_Driver_Results(prop: DriverProps) : React.JSX.Element{
  //Setting the parameters
  const theme = prop.darkMode ? Dark : Light;
  const driver_id = prop.DriverInfo.driverId;

  //Hooks used for fetching the data  
  const [oldSeasonResults, setSeasonResults] = useState<SeasonResults[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl = "https://ergast.com/api/f1/drivers/"+driver_id+"/driverStandings.json"

  const getResults =  async() => {
     try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSeasonResults(data.MRData.StandingsTable.StandingsLists.reverse());
    } catch (error){
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResults();
  }, []);
  
  //Creating the element
  return (
    <View>
      {loading ? (
        // Loading icon
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={"large"}/>
          <Text style={Styles.loadingText}>Loading old season data...</Text>
        </View>
      ) : (
        oldSeasonResults.map( oldSeasonResult => (
          <View key={oldSeasonResult.season} style={[ theme.divisor, Styles.raceScheduleContainer, theme.card, { flex: 1, paddingVertical: 7 }]}>
            <View style={{ flex: 5, paddingLeft: 20, flexDirection: 'row' }}>
              <View style={{ flex: 2.5 }}>
                <Text style={[Styles.sectionDescription, theme.card, { fontSize: 17, fontWeight: '500', flex: 1, textAlignVertical: 'bottom' }]}>Stagione: {oldSeasonResult.season}</Text>
                <Text style={[Styles.sectionDescription, theme.card, { color: theme.title_bar.color }]}>Vittorie: {oldSeasonResult.DriverStandings[0].wins}</Text>
                <Text style={[Styles.sectionDescription, theme.card, { textAlign: 'left', flex: 1 }]}>Team: {oldSeasonResult.DriverStandings[0].Constructors[0].name}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={[Styles.sectionDescription, theme.card, { textAlign: 'left', flex: 4, textAlignVertical: 'center' }]}>Posizione: </Text>
                <Text style={[Styles.sectionDescription, theme.card, { textAlign: 'center', flex: 1, textAlignVertical: 'center' }]}>{oldSeasonResult.DriverStandings[0].position}</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );
  
}

/*Return an element containing basic information of the driver, along with their image*/
function Driver_Basic_Info_Component(prop: DriverProps) : React.JSX.Element{
    
    const theme = prop.darkMode ? Dark : Light;
    //Getting the driver_id from the param. It is the id of the driver wich will be shown on the page
    const driver = prop.DriverInfo
    
    return (
        <View style={[ theme.divisor, {flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10,}, theme.title_bar]}>
            <View style={{flex: 3}}>
              <Text style={{fontSize: 26, fontWeight: '400'}}>{driver.givenName}</Text>
              <Text style={{fontSize: 30, fontWeight: '800'}}>{driver.familyName}</Text>
              <Text style={{fontSize: 22}}>{driver.permanentNumber}</Text>
              <Text style={{fontSize: 16}}>{driver.nationality}</Text>
              <Text>{driver.dateOfBirth}</Text>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={imageSource.getDriverSide(driver.familyName)} style={{ resizeMode: 'contain', width: 140, height: 140}}></Image>
            </View>
        </View>
    );
};

/* Main function of this page*/
export default function DriverInfo ({route}: any) {
    // -------- THEME -------------------------------------------------------------
    const [darkMode, setDarkMode] = useState(cfg.darkMode)
    const theme = darkMode ? Dark : Light;
    //-----------------------------------------------------------------------------
    
    //Getting driver_id from route
    const { driver: driver_id } = route.params;
    
    //Hooks used for fetching the data
    const [driver_info_data, setDriver_Info_Data] = useState<DriverInfo>();
    const [teamData, setTeamData] = useState<Constructor>();
    const [seasonResults, setSeasonResults] = useState<DriverResult[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<HomePageNavigationProp>();


    //Api used for the data fetching
    const driver_basic_info_apiUrl = "http://ergast.com/api/f1/drivers/"+driver_id+".json";
    const driver_team_apiUrl = "http://ergast.com/api/f1/2024/drivers/"+driver_id+"/constructors.json"
    const driver_season_results_apiUrl = "https://ergast.com/api/f1/2024/drivers/"+driver_id+"/results.json"

    //Fetching all the data needed for the page
    const getData = async () => {
      try{
        
        // Parallel requests using Promise.all
        const [driverResponse, teamResponse, resultsResponse] = await Promise.all([
          fetch(driver_basic_info_apiUrl).then(res => res.json()),
          fetch(driver_team_apiUrl).then(res => res.json()),
          fetch(driver_season_results_apiUrl).then(res => res.json())
        ]); 
        
        /*Setting the data, once received the answer
        driver and team are a single element array, season is an array containing the current season results of a driver*/
        const driver = driverResponse.MRData.DriverTable.Drivers[0]
        const team = teamResponse.MRData.ConstructorTable.Constructors[0]
        const season = resultsResponse.MRData.RaceTable.Races

        setDriver_Info_Data(driver);
        setTeamData(team);
        season == undefined ? console.log("error fetching season") : setSeasonResults(season);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        // Only once having successfully completed the fetch instruction, it will set the loading state to false
        setLoading(false);
      }
    };
    
    useEffect(() => {
      getData();
    }, []);
    
    /*Return a loading icon, while waiting for the fetch of the data
    Once the loading is complete, it will render the rest of the page */
    return (
      <SafeAreaView style={[{flex: 1}, theme.card]}>
        {loading ? (
          //Loading icon
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={"large"}/>
            <Text style={Styles.loadingText}>Loading data...</Text>
          </View>
        ) : 
      
        //Main view
        ( 
          <ScrollView>
            {driver_info_data == undefined ? 
            //Driver data not found
            <Text style={[Styles.notFoundText, { color: darkMode ? 'gold' : 'orangered' }]}>
              Driver data not available :(
            </Text> :   
            
            //If found, show the Driver_Basic_Info_Component 
            <Driver_Basic_Info_Component darkMode={darkMode} DriverInfo={driver_info_data} />}
            

            {/* Check if teamData is found */}{
              teamData == undefined ?
               
              <View>
                <Text style={[theme.card, { fontSize: 22, fontWeight: '800', paddingVertical: 10}]}> Past seasons: </Text>
                <Old_Driver_Results darkMode={darkMode} DriverInfo={driver_info_data!}></Old_Driver_Results>
              </View> :
              
              //If found, load the Driver_Team_Component and current season results
              <View>
              <Pressable onPress={() =>  navigation.navigate("TeamInfo", {team: teamData.constructorId})}>
                <Driver_Team_Component darkMode={darkMode} team={teamData} />
              </Pressable>
              <Text style={[theme.card, { fontSize: 22, fontWeight: '800', paddingVertical: 10}]}> Current season result: </Text>
              {
                seasonResults.reverse().map( result => 
                <Driver_Season_Results_Component key={result.Circuit.circuitName} darkMode={darkMode} result={result}/> )
              }
              </View> 
            }
          </ScrollView>
        )}
        <NavigationBar/>
      </SafeAreaView>
    );
};