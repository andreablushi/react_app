/* TO DO:
    make the team clickable, redirecting to the teaminfo page
    https://ergast.com/api/f1/2024/drivers/alonso/results: get the current season placements
*/

import React, { useEffect, useState } from 'react';
import Styles from "../stylesheets/Styles";
import { Light, Dark } from "../stylesheets/Theme";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { globalThemeControl, imageSource } from './App';
import { NavigationBar } from './NavigationBar';

type DriverInfo = {
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
    <View style={[Styles.raceScheduleContainer, theme.card, {flex: 1, paddingVertical: 7}]}>
      <View style={[Styles.driverResultWrapper, theme.card]}>
        <Text style={[Styles.positionResult, theme.card]}>{result.position}</Text>
        <Image source={imageSource.getFlag(circuit.Location.country)} style={[{resizeMode:'contain',  width: 70, height:70,  flex: 1}]}></Image>
      </View>
      <View>
        <Text style={[Styles.sectionDescription, theme.card]}>Round: {race.round}</Text>
        <Text style={[Styles.sectionDescription, theme.card]}>Points earned: {result.points}</Text>
      </View>
  </View>
);
}

/*Return an element containing basic information of the driver, along with their image*/
function Driver_Basic_Info_Component(prop: DriverProps) : React.JSX.Element{
    
    const theme = prop.darkMode ? Dark : Light;
    //Getting the driver_id from the param. It is the id of the driver wich will be shown on the page
    const driver = prop.DriverInfo
    
    return (
        <View style={[{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, }, theme.title_bar ]}>
            <View style={[theme.title_bar, {flex: 3}]}>
            <Text style={[theme.title_bar, {fontSize: 26, fontWeight: '400'}]}>{driver.givenName}</Text>
            <Text style={[theme.title_bar, {fontSize: 30, fontWeight: '800'}]}>{driver.familyName}</Text>
            <Text style={[theme.title_bar, {fontSize: 22}]}>{driver.permanentNumber}</Text>
            <Text style={[theme.title_bar, {fontSize: 16}]}>{driver.nationality}</Text>
            <Text style={[theme.title_bar, {}]}>{driver.dateOfBirth}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={imageSource.getDriverSide(driver.familyName)} style={{ resizeMode: 'contain', width: 160, height: 160}}></Image>
            </View>
        </View>
    );
};

/* Main function of this page*/
export default function DriverInfo ({route}: any) {
    // -------- THEME -------------------------------------------------------------
    const [darkMode, setDarkMode] = useState(globalThemeControl.getTheme());
    const theme = darkMode ? Dark : Light;
    //-----------------------------------------------------------------------------
    
    //Getting driver_id from route
    const { driver: driver_id } = route.params;
    
    //Hooks used for fetching the data
    const [driver_info_data, setDriver_Info_Data] = useState<DriverInfo>();
    const [teamData, setTeamData] = useState<Constructor>();
    const [seasonResults, setSeasonResults] = useState<DriverResult[]>([]);
    const [loading, setLoading] = useState(true);
    
    //Api used for the data fetching
    const driver_basic_info_apiUrl = "http://ergast.com/api/f1/drivers/"+driver_id+".json";
    const driver_team_apiUrl = "http://ergast.com/api/f1/2024/drivers/"+driver_id+"/constructors.json"
    const driver_season_results_apiUrl = "https://ergast.com/api/f1/2024/drivers/"+driver_id+"/results.json"

    //Fetching all the data needed for the page
    const getData = async () => {
      try{
          console.log("retrieving seasons")
          const responseDriver = await fetch(driver_basic_info_apiUrl);
          const dataDriver = await responseDriver.json();

          console.log("retrieving seasons")
          const responseTeam = await fetch(driver_team_apiUrl);
          const dataTeam = await responseTeam.json();

          console.log("retrieving seasons")
          const responseSeason = await fetch(driver_season_results_apiUrl);
          const dataSeason = await responseSeason.json();
          
        
        // Parallel requests using Promise.all
        /*  const [driverResponse, teamResponse, resultsResponse] = await Promise.all([
          fetch(driver_basic_info_apiUrl).then(res => res.json()),
          fetch(driver_team_apiUrl).then(res => res.json()),
          fetch(driver_season_results_apiUrl).then(res => res.json())
        ]);  */
        //Setting the data, once received the answer
        

        // driver and team are a single element array
        const driver = dataDriver.MRData.DriverTable.Drivers[0]
        const team = dataTeam.MRData.ConstructorTable.Constructors[0]
        const season = dataSeason.MRData.RaceTable.Races
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
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={"large"}/>
            <Text style={Styles.loadingText}>Loading data...</Text>
          </View>
        ) : (
          <ScrollView>
            {driver_info_data == undefined ? <Text style={{
              fontSize: 23,
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'gold',
              paddingTop: 20
              
            }}>Driver data not available :(</Text> : <Driver_Basic_Info_Component darkMode={darkMode} DriverInfo={driver_info_data} />}
            {teamData == undefined ? <Text style={{
              fontSize: 23,
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'gold',
              paddingTop: 20
              
            }}>Team Data not available :(</Text> : <Driver_Team_Component darkMode={darkMode} team={teamData} />}
            {
              seasonResults.reverse().map( result => 
              <Driver_Season_Results_Component key={result.Circuit.circuitName} darkMode={darkMode} result={result}/> )
            } 
          </ScrollView>
        )}
      </SafeAreaView>
    );
};