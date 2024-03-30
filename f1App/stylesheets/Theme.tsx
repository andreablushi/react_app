import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const Dark = StyleSheet.create({
  title_bar: {
    backgroundColor: '#191919',
    color: '#bfbfbf'
  },
  card: {
    backgroundColor: Colors.darker,
    color: '#d9d9d9'
  },
  //Add the border between the elements
  divisor: {
    borderTopWidth: 1, // Add border at the top
    borderTopColor: '#191919', // Color of the top border
    borderBottomWidth: 1, // Add border at the bottom
    borderBottomColor: '#191919', // Color of the bottom border  
  },
})

export const Light = StyleSheet.create({
  title_bar: {
    backgroundColor: '#e6e6e6',
    color: Colors.darker
  },
  card: {
    backgroundColor: Colors.lighter,
    color: Colors.dark
  },
  divisor: {
    borderTopWidth: 1, 
    borderTopColor: '#e6e6e6', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e6e6e6',
  }
})