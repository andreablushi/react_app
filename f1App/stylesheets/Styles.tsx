
import { StyleSheet } from "react-native";


const Styles = StyleSheet.create({
  driverResultWrapper: {
    flexDirection: 'row',
    flex: 1,
    columnGap: 5,
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
  teamResultWrapper: {
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
  teamPictureResult: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    // borderRadius: 50,
    // backgroundColor: 'gray',
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
  teamResult: {
    flex: 6,
    paddingLeft: 15,
  },
  driverTextResult: {
    fontSize: 17,
    fontWeight: '600',
    textAlignVertical: 'bottom',
    flex: 1
  },
  teamTextResult: {//Style for driver standings team
    textAlignVertical: 'top',
    flex: 1
  },
  constructorTextResult: { // Style for team standings
    fontSize: 17,
    fontWeight: '600',
    textAlignVertical: 'center',
    flex: 1
  },
  pointResult:{
    paddingRight: 5,
    textAlignVertical: 'center',
    fontWeight: '500'
  },
  timeResult: {
    paddingRight: 5,
    textAlignVertical: 'center',
    fontWeight: '500'
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
  topBarText: {
    flex: 1,
    fontSize: 30,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    fontWeight: '700',
    color: 'white'
    
  },
  topBar: {
    height: 70,  
    flex:1,
    flexDirection: 'row'

  },
  loadingText:{
    fontWeight: '500', 
    color: '#a1a1a1'
  },
  sectionDescription: {
    fontSize: 15,
    fontWeight: '400',  
  },
  section14: {
    fontSize: 14,
    fontWeight: '400'
  },
  raceScheduleContainer: { 
    paddingHorizontal: 10,
    flexDirection: 'row',
    flex: .1,
    alignItems: 'center',
  },
  notFoundText:{
    fontSize: 23,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor: 'gray',
    textShadowRadius: 5,
    textShadowOffset: {height: 1, width: 1},
    paddingVertical: 20
  },
  separator:{ 
    borderBottomWidth: 4,
     borderBottomColor: '#5A5A5A', 
     marginVertical: 10 
  },
  light_separator:{ 
    borderBottomWidth: 4,
    borderBottomColor: '#5A5A5A',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  }
  
});

export default Styles;