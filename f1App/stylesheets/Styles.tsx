
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
    fontFamily:'Formula1-Black'
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
    fontFamily:'Formula1-Bold-4',
    textAlignVertical: 'center',
    textAlign:'center',
    color: 'white',
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
  header_arrow:{
    maxHeight: 25,
    maxWidth: 25, 
    resizeMode: 'contain', 
    alignSelf: 'center'
  },
  header_container: {
    backgroundColor: 'red',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  header_backButton: {
    marginRight: 10,
  },
  horizontalListElement: {
    flex: 1,
    flexDirection: 'row',
    margin: 12,
    marginHorizontal: 4,
    padding: 5,
    paddingLeft: 8,
    paddingBottom: 0,
    borderWidth: 2,
    borderRadius: 15
  }
});

export default Styles;