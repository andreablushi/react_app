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

//Pagina start inserita qua per semplicità
export const StartingScreen = () => {

  const navigation = useNavigation<RootStackNavigationProp>();//utilizzo parametri nel navigator

  return (//Struttura di Starting Screen che setta l'immagine a tutto schermo con possibilità di tocco
    <View style={styles.starting_container}>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')} >
      <Image source={require('../img/starting-image.jpg')} style={styles.starting_image} />
      </TouchableOpacity>
    </View>
  );
};

//Struttura generale App > headerShown obbligatoria in quanto richiesta dal compilatore
const App = () => {
  return (
    //Sezione che si occupa della gestione del Navigator come i vari Screen settati
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartingScreen" component={StartingScreen}  options={{ headerShown: false }/* nasconde headre */ } />
        <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name='Schedule' component={Schedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

//style semplici utili al setting della starting page
const styles = StyleSheet.create({
  starting_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starting_image: {
    width: Dimensions.get('window').width, // Larghezza dell'immagine pari alla larghezza dello schermo
    height: Dimensions.get('window').height, // Altezza dell'immagine pari all'altezza dello schermo
    resizeMode: 'cover', // Adatta l'immagine per coprire completamente l'area
  },
});

