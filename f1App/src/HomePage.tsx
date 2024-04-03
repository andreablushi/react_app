import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList} from './App'; // Importa RootParamList da App.tsx
import UpcomingRace from "./CountDown"
import Styles from "../stylesheets/Styles";
import { Dark, Light } from '../stylesheets/Theme';

import { SafeAreaView } from 'react-native-safe-area-context';
import { globalThemeControl, imageSource, queryClient} from './App';
import { NavigationBar } from './NavigationBar';

import { EventRegister } from 'react-native-event-listeners';



export type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
type teamStandings = {
  position: number;
  points: number;
  wins: number;
  Constructor: {
    constructorId: string;
    name: string;
  }
}

type Race = {
  season: string;
  round: string;
  raceName: string;
  date: string;
  time: string;
  Circuit:{
    Location:{
      country: string
    }
  }
}

type DriverProp = {
  darkMode: boolean
  driver_standing: driverStandings
}
type TeamProp = {
  darkMode: boolean
  team_standing: teamStandings
}
type NextRaceProp = {
  darkMode: boolean
  next_race: Race[]
}


function Next_Race_Element(props: NextRaceProp): React.JSX.Element {
  const theme = props.darkMode ? Dark : Light;
  const next_race = props.next_race[0];
  const country = next_race.Circuit.Location.country
  const boldTextColor = !props.darkMode ? 'black' : 'white';

  return(

    <View style = {[Styles.horizontalListElement, theme.horizontalList_element, {padding: 10}]}>
      {/* CircuiT information */}
      <View style = {{flex:3, flexDirection:'column'}}>
        <Text style = {{color: boldTextColor, fontSize: 21, fontWeight: '900'}} >{next_race.raceName}</Text>
        <Text>{country}</Text>
        <Text style = {{color: 'red', fontSize: 20, fontWeight: '800'}}>Round {next_race.round}</Text>
      </View>

      <View style = {{flex: 2}}>
      <Image source={imageSource.getFlag(country)} style={[{resizeMode:'contain',  width: 70, height:70, alignSelf: 'center'}]}></Image>
        <View style = {{flex: 1, justifyContent: 'flex-end', paddingBottom: 20}}>
          <UpcomingRace date={next_race.date} time={next_race.time} darkMode={props.darkMode}/>
        </View>
      </View>
      
    </View>
  )
}

function Driver_Standings_Element (props: DriverProp): React.JSX.Element {
  // import prop, to improve readability
  const theme = props.darkMode ? Dark : Light;
  const boldTextColor = !props.darkMode ? 'black' : 'white';
  const driver = props.driver_standing.Driver
  const standing = props.driver_standing
  
  return(
    <View style = {[Styles.horizontalListElement, theme.horizontalList_element]}>
      {/* View containing position, name and team*/}
      <View style = {{flexDirection:'column'}}>
        <View style = {{flex: 1}}>
          <Text style = {{fontSize: 40, fontWeight: '800', color: 'red'}}>{standing.position}</Text>
        </View>
        <View style = {[{flex: 1}, theme.horizontalList_element]}>          
          <Text style = {theme.minortext}>{driver.givenName}</Text>
          <Text style = {{fontSize: 20, fontWeight: '700', color: boldTextColor}}>{driver.familyName}</Text>
        </View>
      </View>
      <Image source={imageSource.getDriverSide(driver.familyName)} style = {{flex: 1, height: 110, width: 110, resizeMode: 'contain', alignSelf: 'flex-end'}}></Image>
    </View>
  )
};

function Team_Standings_Element (props: TeamProp): React.JSX.Element {
  // import prop, to improve readability
  const theme = props.darkMode ? Dark : Light;
  const boldTextColor = !props.darkMode ? 'black' : 'white';

  const team = props.team_standing.Constructor
  const standing = props.team_standing
  return(
    <View style = {[Styles.horizontalListElement, theme.horizontalList_element]}>
      <View style = {{flexDirection:'column'}}>
        
        <View style = {{flex: 1}}>
          <Text style = {{fontSize: 40, fontWeight: '800', color: 'red'}}>{standing.position}</Text>
        </View>
        
        <View style = {{flex: 1}}>
          <Text style = {{ fontSize: 20, fontWeight: '800', color: boldTextColor}}>{team.name}</Text>
          <Text style = {theme.minortext}>Wins:{standing.wins}</Text>
        </View>
      </View>
      <View >
        <Image source={imageSource.getTeamBadge(team.constructorId)} style = {{flex: 1, height: 76, width: 76, resizeMode: 'contain', marginLeft:20}}></Image>
      </View>
    </View>
  )
};
const HomePage = () => {

    // -------- THEME -------------------------------------------------------------
    const [darkMode, setDarkMode] = useState(globalThemeControl.getTheme());
    const switchTheme= () => {
      globalThemeControl.getTheme() ? setDarkMode(false) : setDarkMode(true);
      globalThemeControl.changeTheme()
      EventRegister.emit('theme', globalThemeControl.getTheme())
    }
    const theme = darkMode ? Dark : Light;
    //-----------------------------------------------------------------------------


  //I "create" the same navigation by taking HomePageNavigationProp which for now is a copy of
  //NativeStackNavigationProp from App.tsx
  const navigation = useNavigation<HomePageNavigationProp>();
  
 
  //------ GETTING DATA FROM CACHE API --------------------------------------------
    //Hooks
    const [driver_standings_data, setDriverStanding] = useState<driverStandings[]>([]);
    const [team_standings_data, setTeamStanding] = useState<teamStandings[]>([]);
    const [next_race_data, setNextRace] = useState<Race[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const driver_Cached_Data : any = queryClient.getQueryData(['driverStandings']);
      setDriverStanding(driver_Cached_Data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      
      const team_Cached_Data : any = queryClient.getQueryData(['teamStandings']);
      setTeamStanding(team_Cached_Data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

      const race_Cached_Data: any = queryClient.getQueryData(['next']);
      setNextRace(race_Cached_Data.MRData.RaceTable.Races);
      
      setIsLoading(false);
    }, []);

  //-------------------------------------------------------------------------------
  
  if(!isLoading){
    return (  
      <SafeAreaView style={[styles.safeAreaView, theme.card]}>
        <View style = {{flex: 1.5}}>
          <Next_Race_Element darkMode={darkMode} next_race={next_race_data}/>
        </View>
        <ScrollView style = {{flex: 1}} horizontal={true}>
        {driver_standings_data.slice(0, 5).map( 
          driver_standings_data => <Driver_Standings_Element key = {driver_standings_data.Driver.driverId} darkMode={darkMode} driver_standing={driver_standings_data}></Driver_Standings_Element>
        )}
        </ScrollView>
      
        <ScrollView style = {{flex: 1}} horizontal={true}>
          {team_standings_data.slice(0,3).map( 
            team_standings_data => <Team_Standings_Element key = {team_standings_data.Constructor.constructorId} darkMode={darkMode} team_standing={team_standings_data}></Team_Standings_Element>
          )}
        </ScrollView>
        
        <View style={[styles.container, theme.card, {flex: 2}]}>
            <Text style={[styles.title, theme.card]}>Welcome to the Homepage</Text>
            <Button onPress={switchTheme} title='Switch Theme' />
            <Text style={[theme.card, {fontSize: 18}]}>Current theme: {darkMode ? "Dark" : "Light"}</Text>
        </View>
        <NavigationBar key={darkMode ? 'dark' : 'light'}  />{/* Imported the navigation bar from the NavigationBar.tsx component as it's defined*/}
      </SafeAreaView>
      
    );
  }
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomePage;
