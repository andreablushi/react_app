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

/**========================================================================
 *                           IMPORTING TYPES
 *========================================================================**/
import { Race } from "./Schedule";
import { driverStandings, Props as DriverProp } from './DriverStandings';
import { teamStandings, Props as TeamProp } from './TeamStandings';


export type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
    <View style = {[Styles.horizontalListElement, theme.horizontalList_element, {padding: 10, flexDirection:'column'}]}>
      
      {/* View containing circuit info and flag */}
      <View style = {{flex: 2, flexDirection:'row'}}>
        <View style = {{flex:3, flexDirection:'column'}}>
          <Text style = {{color: boldTextColor, fontSize: 21, fontWeight: '900'}} >{next_race.raceName}</Text>
          <Text>{country}</Text>
          <Text style = {{color: 'red', fontSize: 20, fontWeight: '800'}}>Round {next_race.round}</Text>
        </View>
        <Image source={imageSource.getFlag(country)} style={[{resizeMode:'contain',  width: 70, height:70, alignSelf: 'center', flex: 1}]}></Image>
      </View>
      
      <View style = {{flex: 1, justifyContent: 'flex-end', paddingBottom: 20}}>
        <UpcomingRace date={next_race.date} time={next_race.time} darkMode={props.darkMode}/>
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
          <Text style = {theme.minortext}>{standing.points} pts</Text>
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

        {/* HEADER COMPONENT */}
        <View style={[theme.title_bar, styles.title_container]}>
          <Image source={require('../img/ic_launcher.png')} style={[styles.icon, {flex: 1}]}/>
          <Text style={[Styles.topBarText, theme.title_bar, { flex: 10, color:'red', margin: 10}]}>FORMULA 1</Text>
          <Pressable onPress={() => setSettingVisible(true)}>
            <Image source={darkMode ? require("../img/icon/dark/gear.png") : require("../img/icon/light/gear.png")} style={[styles.gearIcon]}></Image>
          </Pressable>
        </View>

        {/* NEXT RACE */}
        <View style = {{flex: 1.5}}>
          <Next_Race_Element darkMode={darkMode} next_race={next_race_data}/>
        </View>
        
        {/* DRIVER STANDINGS */}
        <View style ={{flexDirection: 'row', position: 'relative', paddingLeft: 10}}>
          <Text style = {{flex: 1}}>Driver Standing</Text>
          <Pressable
            style={{ flex: 1, justifyContent: 'center', position: 'absolute', right: 15 }}
            onPress={() => navigation.navigate('Drivers')}
          >
            <Text style={{ textDecorationLine: 'underline' }}>View more:</Text>
          </Pressable>
        </View>

        <ScrollView style = {{flex: 1}} horizontal={true}>
        {driver_standings_data.slice(0, 5).map( 
          driver_standings_data => 
          <Pressable key = {driver_standings_data.Driver.driverId} onPress={() => navigation.navigate('DriverInfo', {driver: driver_standings_data.Driver.driverId})}>
            <Driver_Standings_Element  darkMode={darkMode} driver_standing={driver_standings_data}></Driver_Standings_Element>
          </Pressable>
        )}
        </ScrollView>
          

        {/* TEAM STANDINGS */}
        <View style ={{flexDirection: 'row', position: 'relative', paddingLeft: 10}}>
          <Text style = {{flex: 1}}>Team Standing</Text>
          <Pressable
            style={{ flex: 1, justifyContent: 'center', position: 'absolute', right: 15 }}
            onPress={() => navigation.navigate('Teams')}
          >
            <Text style={{ textDecorationLine: 'underline' }}>View more:</Text>
          </Pressable>
        </View>

        <ScrollView style = {{flex: 1}} horizontal={true}>
          {team_standings_data.slice(0,3).map( 
            team_standings_data =>
            <Pressable key = {team_standings_data.Constructor.constructorId} onPress={() => navigation.navigate("TeamInfo", {team: team_standings_data.Constructor.constructorId})}> 
              <Team_Standings_Element darkMode={darkMode} team_standing={team_standings_data}></Team_Standings_Element>
            </Pressable>
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
    width: 20,
    height: 20,
    padding: 20,
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
    alignSelf: 'flex-end',
    height: 30,
    width: 30,
    resizeMode: 'contain',
    opacity: 0.8

  }
});

export default HomePage;
