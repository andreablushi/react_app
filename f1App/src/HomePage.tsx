import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, cfg, setConfig} from './App'; // Importa RootParamList da App.tsx
import UpcomingRace from "./CountDown"
import Styles from "../stylesheets/Styles";
import { Dark, Light } from '../stylesheets/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { imageSource, queryClient} from './App';
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

type RaceProp = {
  darkMode: boolean
  next_race: Race
}

/**========================================================================
 *                           PSOITION SUFFIX METHOD
 *========================================================================**/
export const addPositionSuffix = (position: number) => {
  let suffix: string;
  switch (position <= 20) {
    case position == 1 || (position > 20 && position % 10 == 1): 
      suffix = 'st';
      break;

    case position == 2 || (position > 20 && position % 10 == 2): 
      suffix = 'nd';
      break;

    case position == 3 || (position > 20 && position % 10 == 3): 
      suffix = 'rd';
      break;

    default:
      suffix = 'th';
      break;
  }

  return position.toString() + suffix

}

/**========================================================================
 *                           DATE FORMATTER
 *========================================================================**/
function formatDate(inputDate: string): string {
  const [year, month, day] = inputDate.split("-");
  
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName: string = months[date.getMonth()];
  
  const formattedDate: string = `${day} ${monthName} ${year}`;
  return formattedDate;
}

/**========================================================================
 *                           NEXT RACE COMPONENT
 *========================================================================**/
function Next_Race_Element(props: RaceProp): React.JSX.Element {
  const theme = props.darkMode ? Dark : Light;
  const next_race = props.next_race;
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
 *                           NEXT 5 RACES COMPONENT
 *========================================================================**/
function Race_Element(props: RaceProp): React.JSX.Element {
  const theme = props.darkMode ? Dark : Light;
  const next_race = props.next_race;
  const country = next_race.Circuit.Location.country

  console.log(next_race.Circuit.circuitName)
  /*================== RENDER =================*/
  return(
      <View style = {[Styles.horizontalListElement, theme.horizontalList_element, {padding: 0, flex: 1, flexDirection:'row'}]}>
        <Image source={imageSource.getFlag(country)} style={[{resizeMode:'contain',  width: 70, height:70, alignSelf: 'center', flex: 1}]}></Image>
        <View style = {{flex:3, flexDirection: 'column', padding: 8, justifyContent: 'center'}}>
          <Text style = {{color: 'red', fontSize: 17, fontWeight: '600'}}>Round {next_race.round}</Text>
          <Text style = {theme.minortext}>{next_race.raceName}</Text>
          <Text style = {theme.minortext}>{formatDate(next_race.date)}</Text>
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
      <View style = {[Styles.horizontalListElement, theme.horizontalList_element, {width: 250, justifyContent: 'center'}]}>
        {/* View containing position, name and team*/}
        
        <View style = {{flexDirection:'column', flex: 1, justifyContent: 'center'}}>
          <View style = {{flex: 1}}>
            <Text style = {{fontSize: 30, fontWeight: '800', color: 'red'}}>{addPositionSuffix(standing.position)}</Text>
          </View>
          <View style = {[{flex: 1.5}, theme.horizontalList_element]}>          
            <Text style = {theme.minortext}>{driver.givenName}</Text>
            <Text style = {{fontSize: 20, fontWeight: '700', color: boldTextColor}}>{driver.familyName}</Text>
          </View>
        </View>
        <View style={[{flex: 1}]}>
          <Image source={imageSource.getDriverSide(driver.familyName)} style = {{flex: 1, flexShrink: 1, width: 110, resizeMode: 'contain'}}></Image>
        </View>
        
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
    <View style = {[Styles.horizontalListElement, theme.horizontalList_element, {width: 220}]}>
      <View style = {{flexDirection:'column', flex: 1}}>
        
        <View style = {{flex: 1}}>
          <Text style = {{fontSize: 30, fontWeight: '800', color: 'red'}}>{addPositionSuffix(standing.position)}</Text>
        </View>
        
        <View style = {{flex: 1.5}}>
          <Text style = {{ fontSize: 20, fontWeight: '800', color: boldTextColor}}>{team.name}</Text>
          <Text style = {theme.minortext}>{standing.points} pts</Text>
        </View>
      </View>
      <View style={[{flex: 1}]}>
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
    const [season_data, setSeasonData] = useState<Race[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isSettingVisible, setSettingVisible] = useState(false);

    useEffect(() => {
      const driver_Cached_Data : any = queryClient.getQueryData(['driverStandings']);
      setDriverStanding(driver_Cached_Data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      
      const team_Cached_Data : any = queryClient.getQueryData(['teamStandings']);
      setTeamStanding(team_Cached_Data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

      const race_Cached_Data: any = queryClient.getQueryData(['next']);
      setNextRace(race_Cached_Data.MRData.RaceTable.Races);
     

      const season_Cached_Data: any = queryClient.getQueryData(['schedule']);
      setSeasonData(season_Cached_Data.MRData.RaceTable.Races);
      
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
          <Next_Race_Element darkMode={darkMode} next_race={next_race_data[0]}/>
        </View>

        {/* Next 5 RACES */}
        <Text style = {[theme.minortext,{fontFamily:'Formula1-Bold_web', letterSpacing: 0.9, paddingLeft: 10}]}>Next 5 rounds</Text>
        <ScrollView style = {{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>
          {season_data.slice(next_race_data[0].round, +next_race_data[0].round + 5).map(
            race_data => <Race_Element key = {race_data.round} darkMode={darkMode} next_race={race_data}/>
        )}
        </ScrollView>
        
        {/* DRIVER STANDINGS */}
        <View style ={{flexDirection: 'row', position: 'relative', paddingLeft: 10}}>
          <Text style = {[theme.minortext,{flex: 1, fontFamily:'Formula1-Bold_web', letterSpacing: 0.9}]}>Driver Standings</Text>
          <Pressable
            style={{ flex: 1, justifyContent: 'center', position: 'absolute', right: 15 }}
            onPress={() => navigation.navigate('Drivers')}
          >
            <Text style={[theme.minortext, { textDecorationLine: 'underline' }]}>View more:</Text>
          </Pressable>
        </View>

        <ScrollView style = {{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>
        {driver_standings_data.slice(0, 5).map( 
          driver_standings_data => 
          <Pressable key = {driver_standings_data.Driver.driverId} onPress={() => navigation.navigate('DriverInfo', {driver: driver_standings_data.Driver.driverId})}>
            <Driver_Standings_Element  darkMode={darkMode} driver_standing={driver_standings_data}></Driver_Standings_Element>
          </Pressable>
        )}
        </ScrollView>
          

        {/* TEAM STANDINGS */}
        <View style ={{flexDirection: 'row', position: 'relative', paddingLeft: 10}}>
          <Text style = {[theme.minortext,{flex: 1, fontFamily:'Formula1-Bold_web', letterSpacing: 0.9}]}>Team Standings</Text>
          <Pressable
            style={{ flex: 1, justifyContent: 'center', position: 'absolute', right: 15 }}
            onPress={() => navigation.navigate('Teams')}
          >
            <Text style={[theme.minortext,{ textDecorationLine: 'underline' }]}>View more:</Text>
          </Pressable>
        </View>

        <ScrollView style = {{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>
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
