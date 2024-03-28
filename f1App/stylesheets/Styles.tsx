
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
    marginHorizontal: 10,
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
  }
});

export default Styles;