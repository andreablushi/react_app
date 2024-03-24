import { forSlideLeft } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/HeaderStyleInterpolators";
import React from "react";
import { StyleSheet } from "react-native";


const Styles = StyleSheet.create({
  driverResultWrapper: {
    flexDirection: 'row',
    flex: 1,
    columnGap: 5,
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
  driverPictureResult: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    borderRadius: 50,
    backgroundColor: 'gray',
  },
  positionResult: {
    paddingRight: 3,
    textAlign: 'center',
    width: 30,
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
  driverResult: {
    flex: 6,
    paddingLeft: 5,
    
  },
  driverTextResult: {
    fontSize: 17,
    fontWeight: '600',
    textAlignVertical: 'bottom',
    flex: 1
  },
  teamTextResult: {
    textAlignVertical: 'top',
    flex: 1
  },
  timeResult: {
    paddingRight: 5,
    textAlignVertical: 'center',
    fontWeight: '500'
  }
});

export default Styles;