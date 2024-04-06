import React, { useEffect, useState } from 'react';
import Styles from "../stylesheets/Styles";
import { Light, Dark } from "../stylesheets/Theme";
import { NavigationBar } from './NavigationBar';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { cfg, globalThemeControl, imageSource, queryClient} from './App';

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
export type driverStandings = {
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
/*Type props, used for passing the parameters to the DriverElement function*/
export type Props = {
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
    <View style={[Styles.driverResultWrapper, theme.card, theme.divisor]}>
      <Text style={[Styles.positionResult, theme.card, {flex:1}]}>{result.position}</Text>
      <Image style={[Styles.driverPictureResult, ]} source={imageSource.getDriverSide(driver.familyName)}></Image>
      <View style={[Styles.driverResult, theme.card, {flex: 5}]}>
        <Text style={[Styles.driverTextResult, theme.card]}>{driver.givenName} {driver.familyName}</Text>
        <Text style={[Styles.teamTextResult, theme.card]}>{team.name}</Text>
      </View>
      <Text style={[Styles.timeResult, theme.card, {flex: 1, fontSize: 20}]}>{result.points}</Text>
    </View>
  )
};



/*Main function of this page*/
function Driver_standings({navigation, route}: any): React.JSX.Element {
  // -------- THEME -------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(cfg.darkMode);
  const theme = darkMode ? Dark : Light;
  //-----------------------------------------------------------------------------
 
  //Hook for the fetch of the data
  const [driver_standings_data, setDriverStanding] = useState<driverStandings[]>([]);

  //This function will be run only once, during the mount of the page
  useEffect(() => {
    /*Tentativo data Caching*/
    const driver_Cached_Data : any = queryClient.getQueryData(['driverStandings']);
    setDriverStanding(driver_Cached_Data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
  }, []);


  return (
      <SafeAreaView style={[theme.card, {flex: 1}]}>
        <View style={[{backgroundColor: theme.card.backgroundColor, flex:1.7}, ]}>
          <Text style={[Styles.topBarText, theme.title_bar, {flex: 1.5}]}>Driver Standings</Text>
          <View style={[theme.title_bar, {flexDirection: 'row', flex: 1}]}>
            <Image source={darkMode ? require("../img/icon/dark/podium.png") : require("../img/icon/light/podium.png")} style={{resizeMode: 'contain', height: 30, flex: .9, alignSelf: 'center'}}></Image>
            <View style={{width: 70}}></View>
            <Text style={[theme.title_bar, {flex: 3, fontFamily:'Formula1-Bold_web',textAlignVertical: 'center', fontSize: 18, fontWeight: "600"}]}>Driver</Text>
            <Text style={[theme.title_bar, {flex: 1.3, fontFamily:'Formula1-Bold_web',textAlignVertical: 'center', fontSize: 18, fontWeight: "600"}]}>Points</Text>
          </View>
        </View>
        <View style={[{flex: 10}]}>
          {/*Creating the section where the driver standings will be shown:
            - For evry position, it will call the DriverElement funcion, for getting the element (name, image, points...) for the single driver
            - By clicking on the element, the user will get redirected to the single driver info
          */}
          <ScrollView>
            {driver_standings_data.map( driver_standings_data => <Pressable key={driver_standings_data.Driver.driverId} onPress={() => {navigation.replace("DriverInfo", {driver: driver_standings_data.Driver.driverId})}}>
                <DriverElement darkMode={darkMode} driver_standing={driver_standings_data}></DriverElement>
            </Pressable>)}
          </ScrollView>
        </View>
        <NavigationBar/>
      </SafeAreaView>
  );
}

export default Driver_standings;
