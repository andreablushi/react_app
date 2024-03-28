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

type Contructor = {
  constructorId: string
  name: string
}

type DriverResult = {
  Circuit:{
    circuitName: string
  }
  Results:{
    position: number
    points: number
  }
}

/*Type props, used for passing the parameters to the function*/
type DriverProps = {
  darkMode: boolean
  DriverInfo: DriverInfo
}
type TeamProps = {
  darkMode: boolean
  team: Contructor
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



/*Return an element containing basic information of the driver, along with their image*/
function Driver_Basic_Info_Component(prop: DriverProps) : React.JSX.Element{
    
    const theme = prop.darkMode ? Dark : Light;
    //Getting the driver_id from the param. It is the id of the driver wich will be shown on the page
    const driver = prop.DriverInfo
    
    return (
        <View style={[{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10}, theme.title_bar ]}>
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
    const [driver_info_data, setDriver_Info_Data] = useState<DriverInfo[]>([]);
    const [teamData, setTeamData] = useState<Contructor[]>([]);
    const [seasonResults, setSeasonResults] = useState<DriverResult[]>([]);
    const [loading, setLoading] = useState(true);
    
    //Api used for the data fetching
    const driver_basic_info_apiUrl = "http://ergast.com/api/f1/drivers/"+driver_id+".json";
    const driver_team_apiUrl = "http://ergast.com/api/f1/2024/drivers/"+driver_id+"/constructors.json"
    const driver_season_results_apiUrl = "https://ergast.com/api/f1/2024/drivers/"+driver_id+"/results.json"

    //Fetching all the data needed
    const getData = async () => {
      try{
        // Parallel requests using Promise.all
        const [driverResponse, teamResponse, resultsResponse] = await Promise.all([
          fetch(driver_basic_info_apiUrl).then(res => res.json()),
          fetch(driver_team_apiUrl).then(res => res.json()),
          fetch(driver_season_results_apiUrl).then(res => res.json())
        ]);
        //Setting the data, once received the answer
        setDriver_Info_Data(driverResponse.MRData.DriverTable.Drivers);
        setTeamData(teamResponse.MRData.ConstructorTable.Constructors);
        setSeasonResults(resultsResponse.MRData.RaceTable.Races);
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
    
    /*SETTING UP THE DATA, to improve readability*/
    const driver_info = driver_info_data[0]
    const team_info = teamData[0]

    console.log(seasonResults)

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
            <Driver_Basic_Info_Component darkMode={darkMode} DriverInfo={driver_info} />
            <Driver_Team_Component darkMode={darkMode} team={team_info} />
            {/* CURRENT SEASON PLACEMENT */}
          </ScrollView>
        )}
      </SafeAreaView>
    );
};