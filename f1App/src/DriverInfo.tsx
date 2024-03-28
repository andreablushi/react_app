/* TO DO:
    IMPLEMENT ALL API CALLS in the main method:
    make the team clickable, redirecting to the teaminfo page
    https://ergast.com/api/f1/2024/drivers/alonso/results: get the current season placements
*/

import React, { useEffect, useState } from 'react';
import Styles from "../stylesheets/Styles";
import { Light, Dark } from "../stylesheets/Theme";
import {
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
  constructorId: String
  name: string
}

/*Type props, used for passing the parameters to the DriverElement function*/
type Props = {
  darkMode: boolean
  DriverInfo: DriverInfo
  driverId: string
}

function Driver_Team_Component(prop: Props) : React.JSX.Element{
  
  //Setting the parameters
  const theme = prop.darkMode ? Dark : Light;
  const driver_id = prop.driverId
  
  //Hook to fetch the team data needed
  const [teamData, setTeamData] = useState<Contructor | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(driver_id)
  const apiUrl = "http://ergast.com/api/f1/2024/drivers/"+driver_id+"/constructors.json"

  const getData =  async() => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTeamData(data.MRData.ConstructorTable.Constructors[0]);
    } catch (error){
      console.error(error);
    } finally {
      //Only once having successufuly completed the fetch instruction, it will set the loading state to false
      setLoading(false);
    }
  };
  //Fetching the data once the element get's loaded
  useEffect(() => {
    getData();
  }, []);
  console.log(teamData?.constructorId)
  return(
    <View style={[{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10}, theme.title_bar ]}>
            <View style={[theme.title_bar, {flex: 3}]}>
            <Text style={[theme.title_bar, {fontSize: 16, fontWeight: '400'}]}>Team:</Text>
            <Text style={[theme.title_bar, {fontSize: 20, fontWeight: '800'}]}>{teamData?.name}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={imageSource.getTeamBadge("red_bull")} style={{ resizeMode: 'contain', width: 60, height: 60}}></Image>
            </View>
        </View>
  );
};



/*Gives the main information of the driver, along with their image*/
function Driver_Basic_Info_Component(prop: Props) : React.JSX.Element{
    
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

export default function DriverInfo ({route}: any) {
    // -------- THEME -------------------------------------------------------------
    const [darkMode, setDarkMode] = useState(globalThemeControl.getTheme());
    const theme = darkMode ? Dark : Light;
    //-----------------------------------------------------------------------------
    //Getting driver_id from route
    const { driver: driver_id } = route.params;
    
    const [driver_info_data, setDriver_Info_Data] = useState<DriverInfo | null>(null);
    //Hook for the loading state, setted to true
    const [loading, setLoading] = useState(true);
    
    //Api url, fetching the driverStanding from the current season
    const apiUrl = "http://ergast.com/api/f1/drivers/"+driver_id+".json";
    
    //Fetching the drivers data from the api
    const getData =  async() => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setDriver_Info_Data(data.MRData.DriverTable.Drivers[0]);
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

        return(
          <SafeAreaView style={[{flex: 1}, theme.card]}>
            <ScrollView>
                <Driver_Basic_Info_Component darkMode = {darkMode} DriverInfo={driver_info} driverId=''></Driver_Basic_Info_Component>
                <Driver_Team_Component darkMode = {darkMode} DriverInfo={driver_info} driverId = {driver_id}></Driver_Team_Component>
                {/* <DriversStats><DriversStats/> */}

                {/* CURRENT SEASON PLACEMENT */}
            </ScrollView>
            </SafeAreaView>
        );
};