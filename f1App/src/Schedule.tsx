import React, { useEffect, useState } from 'react';
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


export type Race = {
  round: number,
  raceName: string
  Circuit: {
    circuitName: string,
    circuit: string,
    Location: {
      country: string,
    }
  }
  date: string
}

type Props = {
  darkMode: boolean
  race: Race
}


function RaceSchedule(props: Props,): React.JSX.Element {
  // import prop
  const isDarkMode = props.darkMode;
  const race = props.race;

  // date formatting
  const day = race.date.slice(8, 10);
  const month = race.date.slice(5, 7);
  const year = race.date.slice(0, 4);
  const date = day + "/" + month + "/" + year;

  // dark theme
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? '#bfbfbf' : '#262626',
  };

  return (
      <View style={[styles.raceScheduleContainer, {flex: 1, paddingVertical: 7}]}>
        <View>
          <Image source={require('../Formula1-Images-API/public/countries/italy.png')} style={[{resizeMode:'contain',  width: 70, height:70,  flex: 1}]}></Image>
        </View>
        <View style={[{marginHorizontal: 10, flex: 12},]}>
          <Text style={[styles.sectionDescription, styles.highlight, backgroundStyle, {fontSize: 16} ]}>Round {race.round}</Text>
          <Text style={[styles.sectionDescription, backgroundStyle]}>{race.raceName}</Text>
          <Text style={[styles.sectionDescription, backgroundStyle]}>{race.Circuit.circuitName}</Text>
        </View>
        <Text style={[{textAlign: 'right', flex: 5, marginRight: 10},  styles.sectionDescription, styles.highlight, backgroundStyle,]}>{date}</Text>
    </View>
  );
};

  
function Schedule({navigation}): React.JSX.Element {
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
      console.log("retrieving races");
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
            {race.map( race => <Pressable key={race.round} onPress={() => {navigation.navigate("RaceResult", {race: race, season: year})}}>
                <RaceSchedule darkMode={darkMode} race={race}></RaceSchedule>
            </Pressable>)}
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
  raceScheduleContainer: { 
    marginHorizontal: 10,
    flexDirection: 'row',
    flex: .1,
    alignItems: 'center',
  }, 

});

export default Schedule;
