import React, {useEffect, useRef, useState } from 'react';
import Styles from "../stylesheets/Styles";
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Dark, Light } from '../stylesheets/Theme';
import { HomePageNavigationProp } from './HomePage';
import { useNavigation } from '@react-navigation/native';
import { cfg, globalThemeControl, imageSource, queryClient } from './App';
import { NavigationBar } from './NavigationBar';
import axios, { Axios, AxiosResponse } from 'axios';
import Search from './Search';
import { faD } from '@fortawesome/free-solid-svg-icons';

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
  time: string
}
export type Season = {
  season: number,
  url: string
}

type Props = {
  darkMode: boolean
  race: Race
}

export class ScheduleFetch{
  static seasonUrl = "https://ergast.com/api/f1/seasons.json?limit=75";

  public static async getSeasons() {
  try {
      console.log("retrieving seasons")
      const response = await axios.get(ScheduleFetch.seasonUrl);
      return response.data;  
    } catch(error) {
      console.error(error);
    }
  }  
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
      <View style={[Styles.raceScheduleContainer, theme.card, {flex: 1, paddingVertical: 7, }, theme.divisor]}>
        <View>
          <Image source={imageSource.getFlag(country)} style={[{resizeMode:'contain',  width: 70, height:70,  flex: 1}]}></Image>
        </View>
        <View style={[{paddingHorizontal: 10, flex: 12},]}>
          <Text style={[Styles.section14, styles.highlight, theme.card, {fontSize: 16} ]}>Round {race.round}</Text>
          <Text style={[Styles.section14, theme.card]}>{race.raceName}</Text>
          <Text style={[Styles.section14, theme.card]}>{race.Circuit.circuitName}</Text>
        </View>
        <Text style={[{textAlign: 'right', flex: 6, paddingRight: 10},  Styles.section14, styles.highlight, theme.card,]}>{date}</Text>
    </View>
  );
};

  
function Schedule({route}: any): React.JSX.Element {

  // -------- THEME -------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(cfg.darkMode);

  
  const theme = darkMode ? Dark : Light;
  //-----------------------------------------------------------------------------

  // hooks
  const [race, setRace] = useState<Race[]>([]);
  const [seasons, setSeason] = useState<Season[]>([])
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2024);
  const [textInput, setTextInput] = useState("");
  const [search, setSearch] = useState(false);
  const navigation = useNavigation<HomePageNavigationProp>();
  
  let apiUrl = "https://ergast.com/api/f1/"+ year +".json";
 
  
  // data fetching
  const getRace = async () => {
    console.log(year);
    try {
      console.log("retrieving races");
      const response= await axios.get(apiUrl);
      // const data = await response.json();
      setRace(response.data.MRData.RaceTable.Races);
    } catch (error){
      console.error(error);
    }
  }
  
  

  useEffect(() => {
    setLoading(true)
    const response: any = queryClient.getQueryData(['seasons']);
    setSeason(response.MRData.SeasonTable.Seasons.reverse());
  
    year !== 2024
      ? getRace()
      : (() => {
          const schedule_data: any = queryClient.getQueryData(['schedule']);
          setRace(schedule_data.MRData.RaceTable.Races);
        })();
    setLoading(false)
  }, [year]);

  /*================== ANIMAZIONE =================*/
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, [loading])
  
  return (
      <SafeAreaView style={[theme.title_bar, {flex: 11}]}>
        <View style={[{backgroundColor: theme.title_bar.backgroundColor, maxHeight: 60,  minHeight: 60}, styles.topBar]}>
          <Text style={[Styles.topBarText, theme.title_bar, {flex: 5, textAlign:'left', paddingLeft:10}]}>Schedule {year}</Text>
          <Pressable style={[{flex: 1, justifyContent: 'center'}]} onPress={() => setSearch(true)}>
            <Image 
              source={darkMode ? require("../img/icon/dark/magni.png") : require("../img/icon/light/magni.png")}
              style={[{maxHeight: 30, resizeMode: 'contain', maxWidth: 30, flex: 1, alignSelf: 'center'}]}>  
              </Image>
          </Pressable>
        </View>
        <View style={[{flex: 10, }]}>
          <Animated.ScrollView style={{opacity:fadeAnim}}>
            {race.map( race => <Pressable key={race.round}
              onPress={() => {navigation.navigate("RaceResult", {race: race, season: year})}}
            >
              <RaceSchedule darkMode={darkMode} race={race}></RaceSchedule>
            </Pressable>)}
          </Animated.ScrollView>
        </View>
        {search ? <Search 
                    setSearch={setSearch} 
                    textInput={textInput}
                    setTextInput={setTextInput}
                    seasons={seasons}
                    setYear={setYear}
                    darkMode={darkMode}>
                  </Search> : <View></View>}
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
   topBar: {
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
