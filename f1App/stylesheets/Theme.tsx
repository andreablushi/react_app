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
  }
})

export const Light = StyleSheet.create({
  title_bar: {
    backgroundColor: '#e6e6e6',
    color: Colors.darker
  },
  card: {
    backgroundColor: Colors.lighter,
    color: Colors.dark
  }
})



