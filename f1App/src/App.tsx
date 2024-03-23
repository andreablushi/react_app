import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import HomePage from './HomePage';
import Schedule from './Schedule';
import { StackNavigationProp } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  StartingScreen: undefined;
  HomePage: undefined;
  Schedule: undefined;
  // Aggiungere screen qua
};


//Variabile utile al passaggio di parametri tra screen e lo spostamento tra essi
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

/*STARTING SCREEN component*/
export const StartingScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();//utilizzo parametri nel navigator
  return (
    <View style={styles.starting_container}>
      {/*Making the startingScreen clickable. By clicking it the user will get redirected to the HomePage.
        By using replace instead of navigate we can make sure the user can't come back to the starting screen*/}
      <TouchableOpacity onPress={() => navigation.replace('HomePage')} >
      <Image source={require('../img/starting-image.jpg')} style={styles.starting_image} />
      </TouchableOpacity>
    </View>
  );
};

/*Structure for the navigation system of the app*/
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*We are setting the headerShown to false, to hide the bar in the top of the screen for the navigation*/}
        <Stack.Screen name="StartingScreen" component={StartingScreen}  options={{ headerShown: false }} />
        <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false }} />
        
        {/*Here instead, the header will take you to the homePage*/}
        <Stack.Screen name='Schedule' component={Schedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


//Styles used only for the starting screen
const styles = StyleSheet.create({
  starting_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starting_image: {
    width: Dimensions.get('window').width, // Width of the image is setted to the width of the screen
    height: Dimensions.get('window').height, // Height of the image is setted to the height of the screen
    resizeMode: 'cover', // resize the image to cover the whole screen
  },
});

