import React, { useEffect, useState } from 'react';
import Styles from "../stylesheets/Styles";
import { Light, Dark } from "../stylesheets/Theme";
import ImagesDB from "../utils/ImagesDB";
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
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
    givenName: string, 
    familyName: string,
  }
  Constructors: [{
    constructorId: string;
    name: string;
  }]
}

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
    <View style={[Styles.driverResultWrapper, theme.card]}>
    <Text style={[Styles.positionResult, theme.card]}>{result.position}</Text>
    <Image style={[Styles.driverPictureResult, ]} source={imageSource.getDriverSide(driver.familyName)}></Image>
    <View style={[Styles.driverResult, theme.card]}>
      <Text style={[Styles.driverTextResult, theme.card]}>{driver.givenName} {driver.familyName}</Text>
      <Text style={[Styles.teamTextResult, theme.card]}>{team.name}</Text>
    </View>
    <Text style={[Styles.timeResult, theme.card]}>{result.points}</Text>
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
  const [driver_standings, setDriverStanding] = useState<driverStandings[]>([]);
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
        <View style={[{backgroundColor: theme.card.backgroundColor}, styles.topBar]}>
          <Text style={[styles.topBarText, {color: theme.card.color}]}>Driver Standings</Text>
        </View>
        <View style={[{flex: 10}]}>
          {/*Creating the section where the driver standings will be shown:
            - For evry position, it will call the DriverElement funcion, for getting the element (name, image, points...) for the single driver
            - By clicking on the element, the user will get redirected to the single driver info
          */}
          <ScrollView>
            {driver_standings.map( driver_standings => <Pressable key={driver_standings.position} onPress={() => {navigation.navigate("DriverInfo", {driver: driver_standings.Driver.familyName})}}>
                <DriverElement darkMode={darkMode} driver_standing={driver_standings}></DriverElement>
            </Pressable>)}
          </ScrollView>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 14,
    fontWeight: '400',
    
  },
  highlight: {
    fontWeight: '700',
  },
  topBarText: {
    flex: 1,
    fontSize: 30,
    textAlignVertical: 'center',
    marginHorizontal: 10,
    fontWeight: '700',
    color: 'white'
    
  }, topBar: {
    height: 70,  
    flex:1,
    flexDirection: 'row'

  },
  topBarYear : {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'right',
    paddingRight: 20,
    fontSize: 20,
    fontWeight: '600'
  },
  itemContainer: { 
    marginHorizontal: 10,
    flexDirection: 'row',
    flex: .1,
    alignItems: 'center',
  }, 

});

export default Driver_standings;