import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, cfg, setConfig} from './App'; // Importa RootParamList da App.tsx
import UpcomingRace from "./CountDown"
import Styles from "../stylesheets/Styles";
import { Dark, Light } from '../stylesheets/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalThemeControl, imageSource, queryClient} from './App';
import { NavigationBar } from './NavigationBar';
import { EventRegister } from 'react-native-event-listeners';
import Settings from './Settings';

export type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**========================================================================
 *                           TYPES
 *========================================================================**/
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

/**========================================================================
 *                           NEXT RACE COMPONENT
 *========================================================================**/
function Next_Race_Element(props: NextRaceProp): React.JSX.Element {
  const theme = props.darkMode ? Dark : Light;
  const next_race = props.next_race[0];
  const country = next_race.Circuit.Location.country
  const boldTextColor = !props.darkMode ? 'black' : 'white';

  // RENDER _________________________________________________________
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

/**========================================================================
 *                           DRIVER STANDINGS COMPONENT
 *========================================================================**/
function Driver_Standings_Element (props: DriverProp): React.JSX.Element {
  // import prop, to improve readability
  const theme = props.darkMode ? Dark : Light;
  const boldTextColor = !props.darkMode ? 'black' : 'white';
  const driver = props.driver_standing.Driver
  const standing = props.driver_standing
  
  // RENDER _____________________________________________________________
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

/**========================================================================
 *                           TEAM STANDINGS COMPONENT
 *========================================================================**/
function Team_Standings_Element (props: TeamProp): React.JSX.Element {
  // import prop, to improve readability
  const theme = props.darkMode ? Dark : Light;
  const boldTextColor = !props.darkMode ? 'black' : 'white';

  const team = props.team_standing.Constructor
  const standing = props.team_standing

  // RENDER ___________________________________________________________
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

/**========================================================================
 *                           HOME PAGE COMPONENT
 *========================================================================**/
const HomePage = () => {

    //_______________________ THEME ________________________________________
    const [darkMode, setDarkMode] = useState(cfg.darkMode);
    const switchTheme = async() => {
      const tmp = darkMode ? false : true
      await setConfig({darkMode: tmp})
      EventRegister.emit('cfg', tmp)
      console.log("cfg " + cfg.darkMode)
      setDarkMode(tmp) 
      /* globalThemeControl.getTheme() ? setDarkMode(false) : setDarkMode(true);
      globalThemeControl.changeTheme()
      EventRegister.emit('theme', globalThemeControl.getTheme()) */
    }
    const theme = darkMode ? Dark : Light;
    


  //I "create" the same navigation by taking HomePageNavigationProp which for now is a copy of
  //NativeStackNavigationProp from App.tsx
  const navigation = useNavigation<HomePageNavigationProp>();
  
 
  //_________________ GETTING DATA FROM CACHE API ____________________________________
    //Hooks
    const [driver_standings_data, setDriverStanding] = useState<driverStandings[]>([]);
    const [team_standings_data, setTeamStanding] = useState<teamStandings[]>([]);
    const [next_race_data, setNextRace] = useState<Race[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSettingVisible, setSettingVisible] = useState(false);

    useEffect(() => {
      const driver_Cached_Data : any = queryClient.getQueryData(['driverStandings']);
      setDriverStanding(driver_Cached_Data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      
      const team_Cached_Data : any = queryClient.getQueryData(['teamStandings']);
      setTeamStanding(team_Cached_Data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

      const race_Cached_Data: any = queryClient.getQueryData(['next']);
      setNextRace(race_Cached_Data.MRData.RaceTable.Races);
      
      setIsLoading(false);
    }, []);

  //_________________________________ RENDER ____________________________________________
  if(!isLoading){
    return (  
      <SafeAreaView style={[styles.safeAreaView, theme.card]}>
        <View style={[theme.title_bar, styles.title_container]}>
          <Image source={require('../img/ic_launcher.png')} style={ styles.icon}/>
          <Text style={[Styles.topBarText, theme.title_bar, { flex: 5, color:'red' }]}>FORMULA 1</Text>
          <Pressable onPress={() => setSettingVisible(true)}>
            <Image source={darkMode ? require("../img/icon/dark/gear.png") : require("../img/icon/light/gear.png")} style={[styles.gearIcon]}></Image>
          </Pressable>
        </View>
        
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

        {isSettingVisible ? <Settings 
          setSettingsVisible = {setSettingVisible} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}>
        </Settings> : <View></View>}

        <NavigationBar key={darkMode ? 'dark' : 'light'}  />{/* Imported the navigation bar from the NavigationBar.tsx component as it's defined*/}
      </SafeAreaView>
      
    );
  }
};

/**========================================================================
 *                           STYLESHEET
 *========================================================================**/
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
  icon: {
    flex:1,
    width: 30,
    height: 30,
    padding: 30,
    resizeMode:'contain',
  },
  title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  gearIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    opacity: 0.8

  }
});

export default HomePage;
