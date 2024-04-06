import React, { useEffect, useRef, useState } from 'react';
import Styles from "../stylesheets/Styles";
import { Light, Dark } from "../stylesheets/Theme";
import { NavigationBar } from './NavigationBar';
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { cfg, globalThemeControl, imageSource, queryClient } from './App';
import { faD } from '@fortawesome/free-solid-svg-icons';

/*Defining the type teamStandings
    position: Position, in the driver rankings
    Points: Number of point, in the current season
    Constructor: {
      constructorId: id of the team
      name: name of the team
    }
*/
 export type teamStandings = {
  position: number;
  points: number;
  wins: number;
  Constructor: {
    constructorId: string;
    name: string;
  }
}
/*Type props, used for passing the parameters to the TeamElement function*/
export type Props = {
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
function Team_standings({navigation}: any): React.JSX.Element {
  // -------- THEME -------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(cfg.darkMode);
  const theme = darkMode ? Dark : Light;
  //-----------------------------------------------------------------------------
 
  //Hook for the fetch of the data
  const [constructorStandings, setConstructorStanding] = useState<teamStandings[]>([]);
  //Fetching the teams data from the api
  useEffect(() => {
    const constructor_Cached_Data : any = queryClient.getQueryData(['teamStandings']);
    setConstructorStanding(constructor_Cached_Data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    setLoading(false);
  }, []);

  /*================== ANIMAZIONE =================*/
  const [loading, setLoading] = useState(true)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fadeIn();
  }, [loading])

  return (
      <SafeAreaView style={[theme.card, {flex: 1}]}>
        <View style={[{backgroundColor: theme.card.backgroundColor, flex:1.7}, ]}>
          <Text style={[Styles.topBarText, theme.title_bar, {flex: 1.5}]}>Team Standings</Text>
          <View style={[theme.title_bar, {flexDirection: 'row', flex: 1}]}>
            <Image source={darkMode ? require("../img/icon/dark/podium.png") : require("../img/icon/light/podium.png")} style={{resizeMode: 'contain', height: 30, flex: .9, alignSelf: 'center'}}></Image>
            <View style={{width: 70}}></View>
            <Text style={[theme.title_bar, {flex: 3,fontFamily:'Formula1-Bold_web', textAlignVertical: 'center', fontSize: 18, fontWeight: "600"}]}>Team</Text>
            <Text style={[theme.title_bar, {flex: 1.3,fontFamily:'Formula1-Bold_web', textAlignVertical: 'center', fontSize: 18, fontWeight: "600"}]}>Points</Text>
          </View>
        </View>
        <View style={[{flex: 10}]}>
          {/*Creating the section where the constructor standings will be shown:
            - For every position, it will call the ConstructorElement funcion, for getting the element (name, image, points...) for the single team
            - By clicking on the element, the user will get redirected to the single team info
          */}
          <Animated.ScrollView style={{opacity: fadeAnim}}>
            {constructorStandings.map( constructorStandings => <Pressable key={constructorStandings.position} onPress={() => {navigation.navigate("TeamInfo", {team: constructorStandings.Constructor.constructorId})}}>
                <TeamElement darkMode={darkMode} team_standing={constructorStandings}></TeamElement>
            </Pressable>)}
          </Animated.ScrollView>
        </View>
        <NavigationBar/>
      </SafeAreaView>
  );
}
export default Team_standings;
