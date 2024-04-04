import React, {useEffect, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, useColorScheme, AppState} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Dark, Light } from '../stylesheets/Theme';
import { EventRegister } from 'react-native-event-listeners';
import { QueryClient, QueryClientProvider, replaceEqualDeep, useQueries,} from '@tanstack/react-query'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Our Component
import HomePage from './HomePage';
import Schedule, { Race, ScheduleFetch } from './Schedule';
import Drivers from './DriverStandings';
import DriverInfo from './DriverInfo';
import TeamInfo from './TeamInfo';
import RaceResult from './RaceResult';
import Teams from './TeamStandings';
import ImagesDB from '../utils/ImagesDB';


const Stack = createNativeStackNavigator();

/**========================================================================
 **                            ASYNC STORAGE
 *========================================================================**/

export let cfg: Config = {
  darkMode: true
}
export const setConfig = async (config: Config) => {
  try {
    cfg = config;
    const jsonConfig = JSON.stringify(config);
    console.log(jsonConfig);
    await AsyncStorage.setItem('config', jsonConfig);
  } catch (e) {
    console.error(e);
  }
};

export const getConfig = async () => {
  try {
    const jsonConfig = await AsyncStorage.getItem('config');
    return jsonConfig != null ? JSON.parse(jsonConfig) : null;
  } catch (e) {
    console.error(e);
  }
};

/**========================================================================
 **                          CACHING METHODS
 *========================================================================**/

//Defyning a queryClient element. Each page using cached api calls should import this component
export const queryClient = new QueryClient()

/*The app component should be wrapped inside the queryClientProvider component*/
export default function CachedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  )
}

/*Defining a default method to perform the fetching of the data
  PARAMETERS: an apiUrl, passed as a string
  RETURNS the data fetched from the apiUrl
*/ 
export async function fetchData(apiUrl: string) {
  try{
    const response = await axios.get(apiUrl);
    return response.data;
  }
  catch(error){
    console.log(error)
  }
}

/**========================================================================
 **                          THEME METHODS
 *========================================================================**/
export class globalThemeControl {
  static theme = true;

  public static changeTheme() {
    globalThemeControl.theme ? globalThemeControl.theme = false : globalThemeControl.theme = true;
    console.log("switching theme, now: " + (globalThemeControl.theme ? "Dark": "Light"))
  }

  public static getTheme() {
    return globalThemeControl.theme;
  }

  public static setTheme(darkMode: boolean) {
    globalThemeControl.theme = darkMode
  }
}

/**========================================================================
 **                           IMAGES METHODS
 *========================================================================**/
export class imageSource {
  
  //Return the image of the driver, given the driver id
  public static getDriverSide(name: string) {
    const imageObject = ImagesDB['drivers-side'].find(driver => driver.name.toLowerCase() === name.toLowerCase());
    return imageObject ? imageObject.src : ImagesDB.driverNotFound;
  };

  //Return the flag of the nation, given the nation
  public static getFlag(nation: string) {
    const imageObject = ImagesDB['flags'].find(flag => flag.nation.toLowerCase() === nation.toLowerCase());
    return imageObject ? imageObject.src : ImagesDB.notfound;
  };

  //Return the teamIcon, given the team id
  public static getTeamBadge(team_id: string){
    const imageObject = ImagesDB['team_icon'].find(team => team.team_name.toLowerCase() === team_id.toLowerCase());
    return imageObject ? imageObject.src : ImagesDB.notfound;
  }

  //Return the teamCar, given the team id
  public static getTeamCar(team_id: string){
    const imageObject = ImagesDB['team_car'].find(team => team.team_name.toLowerCase() === team_id.toLowerCase());
    return imageObject ? imageObject.src : ImagesDB.notfound;
  }
}
/**========================================================================
 **                          TYPES
 *========================================================================**/
export type RootStackParamList = {
  StartingScreen: undefined;
  HomePage: undefined;
  Schedule: undefined;
  Drivers: undefined;
  Teams: undefined;
  RaceResult: {
    season: number
    race: Race
  };
  DriverInfo:{
    driver: string
  };
  TeamInfo: {
    team: string
  };
};

export type Config = {
  darkMode: boolean
}

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

/**========================================================================
 **                           STARTING SCREEN COMPONENT
 *========================================================================**/
export const StartingScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  return (
    <View style={styles.starting_container}>
      <TouchableOpacity onPress={() => navigation.replace('HomePage')}>
        <Image source={require('../img/starting-image.jpg')} style={styles.starting_image} />
      </TouchableOpacity>
    </View>
  );
};

/**========================================================================
 * *                          APP COMPONENT
 *========================================================================**/
const App = () => { 
  const [darkMode, setDarkMode] = useState<boolean>();
  //! WARNING 
    const initCfg = async() => {
      const response = await getConfig();
      response == null ? cfg.darkMode = useColorScheme() === 'dark' : cfg = response;
      console.log("init cfg completato: " + cfg.darkMode);
    }
    
    const initTheme = async() => {
      await initCfg();
      console.log("cfg: " + cfg.darkMode)
      setDarkMode(cfg.darkMode)
      globalThemeControl.setTheme(cfg.darkMode); 
    }
  //!=============== END OF WARNING ==============*/
  
  
  /*================== THEME =================*/

  useEffect(() => {
    initTheme()
    EventRegister.addEventListener('cfg', data => {
      setDarkMode(data);
    })

    return () => {
      EventRegister.removeAllListeners();
    }
  }, [])
  const theme = darkMode ? Dark : Light;

  /*================== API CALLS & METHODS =================*/

  const scheduleUrl =  "https://ergast.com/api/f1/2024.json";
  const driverStandingsUrl = "http://ergast.com/api/f1/current/driverStandings.json";
  const teamStandingsUrl = "https://ergast.com/api/f1/current/constructorStandings.json";
  const seasonUrl = "https://ergast.com/api/f1/seasons.json?limit=75";
  const nextRaceUrl = "https://ergast.com/api/f1/current/next.json";

  /* Performing the four main queries used in the application. The data is not saved locally, but cached by the useQueries function
    -each api call result is saved using a QUERY_KEY (a unique array)
    -cached data, can be re-used using the function: queryClient.getQueryData(QUERY_KEY)
  */
  const results = useQueries({
    queries: [
      { queryKey: ['schedule'], queryFn: () => fetchData(scheduleUrl)},
      { queryKey: ['driverStandings'], queryFn: () => fetchData(driverStandingsUrl)},
      { queryKey: ['teamStandings'], queryFn: () => fetchData(teamStandingsUrl)},
      { queryKey: ['next'], queryFn: () => fetchData(nextRaceUrl)},
      { queryKey: ['seasons'], queryFn: () => fetchData(seasonUrl)},
    ],
  })

  const isLoading = results.some(queryResult => queryResult.isLoading);
  if(!isLoading){
    console.log("loading completed")
  }

  /*================== RENDER =================*/
  return (
      <View style={[{flex: 1, backgroundColor: theme.card.backgroundColor}]}>
        <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="StartingScreen" component={StartingScreen} options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name='Schedule' component={Schedule} options={{ headerShown: false, animation: "fade"}}/>
            <Stack.Screen name='RaceResult' component={RaceResult} options={{ headerShown: false, animation: "fade"}}/>
            <Stack.Screen name='Drivers' component={Drivers} options={{ headerShown: false, animation: "fade" }}/>
            <Stack.Screen name='DriverInfo' component={DriverInfo} options={{ headerShown: false, animation: "fade" }}/>
            <Stack.Screen name='Teams' component={Teams} options={{headerShown: false, animation: "fade"}}/>
            <Stack.Screen name='TeamInfo' component={TeamInfo} options={{headerShown: false, animation: "fade"}}/>
          </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
      </View>
  );
};

/**========================================================================
 * *                          STYLESHEET
 *========================================================================**/
const styles = StyleSheet.create({
  starting_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starting_image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

