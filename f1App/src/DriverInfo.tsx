/* TO DO:
    http://ergast.com/api/f1/2024/drivers/<driver_id>/constructors: get the team of the driver
    https://ergast.com/api/f1/2024/drivers/alonso/results: get the current season placement
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

/*Defining the type driverStandings
    position: Position, in the driver rankings
    Points: Number of point, in the current season
    Driver: {
      givenName: first name
      familyName: last name
    }
    Constructor: {
      constructorId: id of the team of the driver
      name: name of the team
    }

*/
type DriverInfo = {
    permanentNumber: number
    givenName: string
    familyName: string
    dateOfBirth: string
    nationality: string
}
/*Type props, used for passing the parameters to the DriverElement function*/
type Props = {
  darkMode: boolean
  DriverInfo: DriverInfo
}

/*Gives the main information of the driver, along with their image*/
function Driver_Basic_Info(prop: Props) : React.JSX.Element{
    
    const theme = prop.darkMode ? Dark : Light;
    //Getting the driver_id from the param. It is the id of the driver wich will be shown on the page
    const driver_id = prop.DriverInfo
    
    return (
        <View style={[{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10}, theme.title_bar ]}>
            <View style={[theme.title_bar, {flex: 3}]}>
            <Text style={[theme.title_bar, {fontSize: 26, fontWeight: '400'}]}>{driver_id.givenName}</Text>
            <Text style={[theme.title_bar, {fontSize: 30, fontWeight: '800'}]}>{driver_id.familyName}</Text>
            <Text style={[theme.title_bar, {fontSize: 22}]}>{driver_id.permanentNumber}</Text>
            <Text style={[theme.title_bar, {fontSize: 16}]}>{driver_id.nationality}</Text>
            <Text style={[theme.title_bar, { fontWeight: '500', color: '#a1a1a1'}]}>{driver_id.dateOfBirth}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={imageSource.getDriverSide(driver_id.familyName)} style={{ resizeMode: 'contain', width: 160, height: 160}}></Image>
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
    
    const [driver_info_data, setDriverStanding] = useState<DriverInfo | null>(null);
    //Hook for the loading state, setted to true
    const [loading, setLoading] = useState(true);
    
    //Api url, fetching the driverStanding from the current season
    const apiUrl = "http://ergast.com/api/f1/drivers/"+driver_id+".json";
    
    //Fetching the drivers data from the api
    const getData =  async() => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setDriverStanding(data.MRData.DriverTable.Drivers[0]);
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
            <ScrollView>
                <Driver_Basic_Info darkMode = {darkMode} DriverInfo={driver_info}></Driver_Basic_Info>
                {/* <ConstructorComponent><ConstructorComponent/> */}
                {/* <DriversStats><DriversStats/> */}

                {/* CURRENT SEASON PLACEMENT */}
            </ScrollView>
        );
};