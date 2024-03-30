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

import { globalThemeControl, imageSource } from './App';

/*Defining the type driverStandings
    position: Position, in the driver rankings
    Points: Number of point, in the current season
    Constructor: {
      constructorId: id of the team
      name: name of the team
    }
*/
type teamStandings = {
  position: number;
  points: number;
  wins: number;
  Constructor: {
    constructorId: string;
    name: string;
  }
}
/*Type props, used for passing the parameters to the TeamElement function*/
type Props = {
  darkMode: boolean
  team_standing: teamStandings
}

function TeamElement(props: Props): React.JSX.Element {
  // import prop, to improve readability
  const theme = props.darkMode ? Dark : Light;
  const result = props.team_standing;
  const team = result.Constructor;

  //returns the basic structure for the team element
  return (
    <View style={[Styles.teamResultWrapper, theme.card, theme.divisor]}>
    <Text style={[Styles.positionResult, theme.card, {flex:1}]}>{result.position}</Text>
    <Image style={[Styles.teamPictureResult, ]} source={imageSource.getTeamBadge(String(team.constructorId))}></Image>
    <View style={[Styles.teamResult, theme.card, {flex: 5}]}>
      <Text style={[Styles.constructorTextResult, theme.card]}>{team.name}</Text>
    </View>
    <Text style={[Styles.timeResult, theme.card, {flex: 1, fontSize: 20}]}>{result.points}</Text>
  </View>
  )
};



/*Main function of this page*/
function Team_standings({navigation, route}: any): React.JSX.Element {
  // -------- THEME -------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(globalThemeControl.getTheme());
  const theme = darkMode ? Dark : Light;
  //-----------------------------------------------------------------------------
 
  //Hook for the fetch of the data
  const [constructorStandings, setConstructorStandings] = useState<teamStandings[]>([]);
  //Hook for the loading state, setted to true
  const [loading, setLoading] = useState(true);

  //Api url, fetching the constructorStanding from the current season
  const apiUrl = "https://ergast.com/api/f1/current/constructorStandings.json";

  //Fetching the drivers data from the api
  const getData =  async() => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      setConstructorStandings(standings);
      console.log("retrieving data");
    } catch (error){
      console.error(error);
    } finally {
      //Only once having successufuly completed the fetch instruction, it will set the loading state to false
      setLoading(false);
    }
  };
  //Fetching the data once the page gets loaded
  useEffect(() => {
    getData();
  }, []);

  return (
      <SafeAreaView style={[theme.card, {flex: 1}]}>
        <View style={[{backgroundColor: theme.card.backgroundColor, flex:1.7}, ]}>
          <Text style={[Styles.topBarText, theme.title_bar, {flex: 1.5}]}>Team Standings</Text>
          <View style={[theme.title_bar, {flexDirection: 'row', flex: 1}]}>
            <Image source={darkMode ? require("../img/podiumdark.png") : require("../img/podiumlight.png")} style={{resizeMode: 'contain', height: 30, flex: .9, alignSelf: 'center'}}></Image>
            <View style={{width: 70}}></View>
            <Text style={[theme.title_bar, {flex: 3, textAlignVertical: 'center', fontSize: 20, fontWeight: "600"}]}>Team</Text>
            <Text style={[theme.title_bar, {flex: 1.2, textAlignVertical: 'center', fontSize: 20, fontWeight: "600"}]}>Points</Text>
          </View>
        </View>
        <View style={[{flex: 10}]}>
          {/*Creating the section where the constructor standings will be shown:
            - For every position, it will call the COnstructorElement funcion, for getting the element (name, image, points...) for the single team
            - By clicking on the element, the user will get redirected to the single team info
          */}
          <ScrollView>
            {constructorStandings.map( constructorStandings => <Pressable key={constructorStandings.position} onPress={() => {navigation.navigate("TeamInfo", {team: constructorStandings.Constructor.constructorId})}}>
                <TeamElement darkMode={darkMode} team_standing={constructorStandings}></TeamElement>
            </Pressable>)}
          </ScrollView>
        </View>
        <NavigationBar/>
      </SafeAreaView>
  );
}
export default Team_standings;
