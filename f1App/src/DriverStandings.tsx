import React, { useEffect, useState } from 'react';
import Styles from "../stylesheets/Styles";
import { Light, Dark } from "../stylesheets/Theme";
import { NavigationBar } from './NavigationBar';
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
type driverStandings = {
  position: number;
  points: number;
  Driver: {
    driverId: string;
    givenName: string; 
    familyName: string;
  }
  Constructors: [{
    constructorId: string;
    name: string;
  }]
}
/*Type props, used for passing the parameters to the DriverElement function*/
type Props = {
  darkMode: boolean
  driver_standing: driverStandings
}

function DriverElement(props: Props): React.JSX.Element {
  // import prop, to improve readability
  const theme = props.darkMode ? Dark : Light;
  const result= props.driver_standing;
  const driver = result.Driver;
  const team = result.Constructors[0];
  
  return (
    <View style={[Styles.driverResultWrapper, theme.card,]}>
      <Text style={[Styles.positionResult, theme.card, {flex:1}]}>{result.position}</Text>
      <Image style={[Styles.driverPictureResult, ]} source={imageSource.getDriverSide(driver.familyName)}></Image>
      <View style={[Styles.driverResult, theme.card, {flex: 5}]}>
        <Text style={[Styles.driverTextResult, theme.card]}>{driver.givenName} {driver.familyName}</Text>
        <Text style={[Styles.teamTextResult, theme.card]}>{team.name}</Text>
      </View>
      <Text style={[Styles.timeResult, theme.card, {flex: 1, fontSize: 20}]}>{result.points}</Text>
    </View>
  )
};



/*Main function of this page*/
function Driver_standings({navigation, route}: any): React.JSX.Element {
  // -------- THEME -------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(globalThemeControl.getTheme());
  const theme = darkMode ? Dark : Light;
  //-----------------------------------------------------------------------------
 
  //Hook for the fetch of the data
  const [driver_standings_data, setDriverStanding] = useState<driverStandings[]>([]);
  //Hook for the loading state, setted to true
  const [loading, setLoading] = useState(true);

  //Api url, fetching the driverStanding from the current season
  const apiUrl = "http://ergast.com/api/f1/current/driverStandings.json";

  //Fetching the drivers data from the api
  const getData =  async() => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDriverStanding(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      console.log("retrieving data");
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

  return (
      <SafeAreaView style={[theme.card, {flex: 11}]}>
        <View style={[{backgroundColor: theme.card.backgroundColor, flex:1.7}, ]}>
          <Text style={[Styles.topBarText, theme.title_bar, {flex: 1.5}]}>Driver Standings</Text>
          <View style={[theme.title_bar, {flexDirection: 'row', flex: 1}]}>
            <Image source={darkMode ? require("../img/podiumdark.png") : require("../img/podiumlight.png")} style={{resizeMode: 'contain', height: 30, flex: .9, alignSelf: 'center'}}></Image>
            <View style={{width: 70}}></View>
            <Text style={[theme.title_bar, {flex: 3, textAlignVertical: 'center', fontSize: 20, fontWeight: "600"}]}>Driver</Text>
            <Text style={[theme.title_bar, {flex: 1.2, textAlignVertical: 'center', fontSize: 20, fontWeight: "600"}]}>Points</Text>
          </View>
        </View>
        <View style={[{flex: 10}]}>
          {/*Creating the section where the driver standings will be shown:
            - For evry position, it will call the DriverElement funcion, for getting the element (name, image, points...) for the single driver
            - By clicking on the element, the user will get redirected to the single driver info
          */}
          <ScrollView>
            {driver_standings_data.map( driver_standings_data => <Pressable key={driver_standings_data.position} onPress={() => {navigation.navigate("DriverInfo", {driver: driver_standings_data.Driver.driverId})}}>
                <DriverElement darkMode={darkMode} driver_standing={driver_standings_data}></DriverElement>
            </Pressable>)}
          </ScrollView>
        </View>
        <NavigationBar/>
      </SafeAreaView>
  );
}
export default Driver_standings;
