/* TO DO:
    IMPLEMENT ALL API CALLS in the main method:
    make the team clickable, redirecting to the teaminfo page
    https://ergast.com/api/f1/2024/drivers/alonso/results: get the current season placements
*/

import React, { useEffect, useState } from 'react';
import Styles from "../stylesheets/Styles";
import { Light, Dark } from "../stylesheets/Theme";
import {
  ActivityIndicator,
  Image,
  Pressable,
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

/*Type props, used for passing the parameters to the function*/
type DriverProps = {
  darkMode: boolean
  DriverInfo: DriverInfo
}
type TeamProps = {
  darkMode: boolean
  team: Contructor
}
function Driver_Team_Component(prop: TeamProps) : React.JSX.Element{
  //Setting the parameters
  const theme = prop.darkMode ? Dark : Light;
  const teamData = prop.team
  
  return(
    <View style={[{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10}, theme.title_bar ]}>
            <View style={[theme.title_bar, {flex: 3}]}>
            <Text style={[theme.title_bar, {fontSize: 16, fontWeight: '400'}]}>Team:</Text>
            <Text style={[theme.title_bar, {fontSize: 20, fontWeight: '800'}]}>{teamData?.name}</Text>
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
            <Text style={[theme.title_bar, { fontWeight: '500', color: '#a1a1a1'}]}>{driver.dateOfBirth}</Text>
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
    const [driver_info_data, setDriver_Info_Data] = useState<DriverInfo | null>(null);
    const [teamData, setTeamData] = useState<Contructor | null>(null);
    const [loading, setLoading] = useState(true);
    
    //Api url, fetching the driverStanding from the current season
    const driver_basic_info_apiUrl = "http://ergast.com/api/f1/drivers/"+driver_id+".json";
    const driver_team_apiUrl = "http://ergast.com/api/f1/2024/drivers/"+driver_id+"/constructors.json"
    //Fetching all the data needed
    const getData =  async() => {
      try {
        //Basic driver info
        const response_driver = await fetch(driver_basic_info_apiUrl);
        const data_driver = await response_driver.json();
        setDriver_Info_Data(data_driver.MRData.DriverTable.Drivers[0]);

        //Driver team
        const response_team = await fetch(driver_team_apiUrl);
        const data_team = await response_team.json();
        setTeamData(data_team.MRData.ConstructorTable.Constructors[0]);

      } catch (error){
        console.error(error);
      } finally {
        //Only once having successufuly completed the fetch instruction, it will set the loading state to false
        setLoading(false);
      }
    };
    //Fetching the data once the page gets loaded
    useEffect(() => {
      getData();
    }, []);
    
    /*SETTING UP A DEFAULT DRIVER DATA, DON'T KNOW IF IT'S NEEDED */
    const driver_info: DriverInfo = driver_info_data ?? {
      permanentNumber: 0, // Default permanentNumber value
      givenName: "None", // Default givenName value
      familyName: "None", // Default familyName value
      dateOfBirth: "00/00/0", // Default dateOfBirth value
      nationality: "None"
    };
    const team_info: Contructor = teamData ?? {
      constructorId:"",
      name:""
    };
    
    //Return a loading icon, while waiting for the fetch of the data
    //Once the loading is complete, it will render the rest of the page
    return (
      <SafeAreaView style={[{flex: 1}, theme.card]}>
        {loading ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView>
            <Driver_Basic_Info_Component darkMode={darkMode} DriverInfo={driver_info} />
            <Driver_Team_Component darkMode={darkMode} team={team_info} />
            {/* <DriversStats><DriversStats/> */}
            {/* CURRENT SEASON PLACEMENT */}
          </ScrollView>
        )}
      </SafeAreaView>
    );
};