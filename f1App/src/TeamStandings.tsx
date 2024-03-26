import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationBar } from './NavigationBar';
import { SafeAreaView } from 'react-native-safe-area-context';


const TeamStandings = () => {


    return (
        <SafeAreaView style={[styles.safeAreaView]}>
      <View style={[styles.container, ]}>
          <Text style={[styles.title]}>Welcome to the Team Standings</Text>
      </View>
      <NavigationBar/>{/* Imported the navigation bar from the NavigationBar.tsx component as it's defined*/}
    </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
    },
    container: {
      flex: 1,
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
export default TeamStandings;
