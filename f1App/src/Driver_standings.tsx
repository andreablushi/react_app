import React, { useEffect, useState } from 'react';
import Styles from '../stylesheets/Styles';
import {
  Button,
  Image,
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
/*Defining the type DRIVER
    Pos:          Position, in the driver rankings
    Driver:       Name and Surname of the driver
    Constructor:  Team that the driver is racing for 
    Points:       Number of point, in the current season
*/
type Driver = {
  pos: number;
  driver: string;
  constructor: string;
  points: number;
}

type Props = {
  darkMode: boolean
  driver: Driver
}

function Driver(props: Props): React.JSX.Element {
  // import prop
  const isDarkMode = props.darkMode;
  const driver = props.driver;
  
  // dark theme
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? '#bfbfbf' : '#262626',
  };
  
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
};

  
function Driver_standings(): React.JSX.Element {
  // hooks
  const [darkMode, setDarkMode] = useState(useColorScheme() === 'dark');
  const [race, setRace] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);

  // control variables
  const isDarkMode = darkMode;
  let year = 2023;
  let apiUrl = "https://ergast.com/api/f1/"+ year +".json";

  // dark theme 
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? 'white' : 'black',
  };

  // data fetching
  const getRace =  async() => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRace(data.MRData.RaceTable.Races);
      console.log("retrieving data");
    } catch (error){
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // fetch data at the start of the page
  useEffect(() => {
    getRace();
  }, []);

  // theme manager
  const switchTheme= () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  }
  
  return (
      <SafeAreaView style={[backgroundStyle, {flex: 11}]}>
        <View style={[{backgroundColor: backgroundStyle.backgroundColor}, styles.topBar]}>
          <Text style={[styles.topBarText, {color: backgroundStyle.color}]}>Schedule</Text>
          <View style={{marginLeft: 20, flex: 1,}}>
            <Text style={[styles.topBarYear, {color: backgroundStyle.color}]}>Year: {year}</Text>
          </View>
        </View>
        <View style={[{flex: 10}]}>
          <ScrollView>
            {race.map( race => <View key={race.round}>
              <RaceSchedule darkMode={darkMode} race={race}></RaceSchedule>
            </View>)}
          </ScrollView>
          
          <Button onPress={switchTheme} title='switch theme'></Button>
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
