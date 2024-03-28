import React, { useEffect, useState } from 'react';
import Styles from "../stylesheets/Styles";
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Dark, Light } from '../stylesheets/Theme';
import { HomePageNavigationProp } from './HomePage';
import { useNavigation } from '@react-navigation/native';
import { globalThemeControl, imageSource } from './App';
import { NavigationBar } from './NavigationBar';
import { Dropdown } from 'react-native-element-dropdown';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

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
type Season = {
  season: number,
  url: string
}

type Props = {
  darkMode: boolean
  race: Race
}


function RaceSchedule(props: Props,): React.JSX.Element {

  // import prop
  const race = props.race;
  const darkMode = props.darkMode
  const theme = darkMode ? Dark : Light;
  const country = race.Circuit.Location.country;
  
  // date formatting
  const day = race.date.slice(8, 10);
  const month = race.date.slice(5, 7);
  const year = race.date.slice(0, 4);
  const date = day + "/" + month + "/" + year;
 
  return (
      <View style={[Styles.raceScheduleContainer, theme.card, {flex: 1, paddingVertical: 7}]}>
        <View>
          <Image source={imageSource.getFlag(country)} style={[{resizeMode:'contain',  width: 70, height:70,  flex: 1}]}></Image>
        </View>
        <View style={[{paddingHorizontal: 10, flex: 12},]}>
          <Text style={[Styles.sectionDescription, styles.highlight, theme.card, {fontSize: 16} ]}>Round {race.round}</Text>
          <Text style={[Styles.sectionDescription, theme.card]}>{race.raceName}</Text>
          <Text style={[Styles.sectionDescription, theme.card]}>{race.Circuit.circuitName}</Text>
        </View>
        <Text style={[{textAlign: 'right', flex: 5, paddingRight: 10},  Styles.sectionDescription, styles.highlight, theme.card,]}>{date}</Text>
    </View>
  );
};

  
function Schedule({route}: any): React.JSX.Element {


  // -------- THEME -------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(globalThemeControl.getTheme());

  const switchTheme= () => {
    globalThemeControl.getTheme() ? setDarkMode(false) : setDarkMode(true);
    globalThemeControl.changeTheme()
  }
  const theme = darkMode ? Dark : Light;
  //-----------------------------------------------------------------------------

  // hooks
  const [race, setRace] = useState<Race[]>([]);
  const [seasons, setSeason] = useState<Season[]>([])
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2024);
  const navigation = useNavigation<HomePageNavigationProp>();

  
  // control variables
  let apiUrl = "https://ergast.com/api/f1/"+ year +".json";
  const seasonUrl = "https://ergast.com/api/f1/seasons.json?limit=75";
  
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

  const getSeasons = async() => {
    try {
      console.log("retrieving seasons")
      const response = await fetch(seasonUrl);
      const data = await response.json();
      setSeason(data.MRData.SeasonTable.Seasons.reverse());
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRace();
    getSeasons();
  }, [])

  //--------------------------------------------
    const verifyAndChange = (text: string) => {
      const pattern = new RegExp("20[0-1][0-9]|19[5-9][0-9]|202[0-4]");
      pattern.test(text) ? (
        setYear(parseInt(text, 10))
      ) : console.log();
    }

  //--------------------------------------------

  useEffect(() => {
    getRace()
  }, [year])

  
  return (
      <SafeAreaView style={[theme.title_bar, {flex: 11}]}>
        <View style={[{backgroundColor: theme.title_bar.backgroundColor, maxHeight: 70,  minHeight: 70}, styles.topBar]}>
          <Text style={[styles.topBarText, {color: theme.title_bar.color, flex: 1}]}>Schedule</Text>
          <View  style={{flex: 1, backgroundColor: theme.card.backgroundColor, marginVertical: 10, borderRadius: 30}}>
            <TextInput keyboardType='numeric' style={{marginHorizontal: 10, color: theme.card.color, flex: 1, textAlign: 'right', textAlignVertical: 'center', fontSize: 20}} onChangeText={text => verifyAndChange(text)}>{year}</TextInput>
          </View>
          <View style={[theme.card,{flex: .9, flexDirection: 'row'}]}>
            
            <Dropdown data={seasons} labelField="season" valueField={"season"} value={year.toString()} 
            onChange={season => {
              setYear(season.season);
            }}
            style={[{flex:1, paddingRight: 20}, theme.title_bar]} 
            placeholderStyle={[theme.title_bar, {textAlign: 'right'}]}
            selectedTextStyle={[!theme.title_bar, {fontSize: 20, textAlign: 'right', paddingRight: 7, fontWeight: '700'}]}
            itemContainerStyle={[{}, theme.card]}
            activeColor={theme.title_bar.backgroundColor}
            itemTextStyle={[{flex: 1, textAlign: 'center', color: theme.card.color, fontSize: 18, fontWeight: '500'}]}
            containerStyle={[{borderRadius: 10}, theme.card]}
            ></Dropdown>
          </View>
        </View>
        <View style={[{flex: 10}]}>
          <ScrollView>
            {race.map( race => <Pressable key={race.round}
              onPress={() => {navigation.navigate("RaceResult", {race: race, season: year})}}
            >
              <RaceSchedule darkMode={darkMode} race={race}></RaceSchedule>
            </Pressable>)}
          </ScrollView>
        </View>
        <NavigationBar/>
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
});

export default Schedule;
