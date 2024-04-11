import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Dark, Light } from '../stylesheets/Theme';
import { text } from '@fortawesome/fontawesome-svg-core';

type UpcomingRaceProps = {
  date: string;
  time: string;
  darkMode: boolean
}
type Countdown = {
  days: number,
  hours: number,
  minutes: number,
  seconds: number
}
/*
  Defining the Upcoming Race ELEMENT. This eleements create a COUNTDOWN to a race
  which DATE AND TIME are being passed as a parameter. The countdown is updated every second
*/
function UpcomingRace(props: UpcomingRaceProps): React.JSX.Element {
  

  /* //Setting up the countdown hook. It-s initialized as an empty string
  const [countdown, setCountdown] = useState<string>('');

  // Set up a timer to update the countdown every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const countdown = calculateCountdown(props.date, props.time);
      setCountdown(countdown);
    }, 1000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [props.date, props.time]);

  // Function to calculate the countdown
  const calculateCountdown = (dateString: string, timeString: string): string => {
    // Extract year, month, and day from the date string
    const [year, month, day] = dateString.split('-').map(Number);

    // Extract hours, minutes, and seconds from the time string
    const [hours, minutes, seconds] = timeString.slice(0, -1).split(':').map(Number);

    // Create a new Date object with the extracted values
    const raceDateTime = new Date(year, month - 1, day, hours, minutes, seconds);

    // Calculate the difference between the current time and race time
    const now = new Date();
    const diff = raceDateTime.getTime() - now.getTime();

    // Handle cases where the race has already started or is upcoming
    if (diff <= 0) {
      return 'Race started';
    } else {
      // Calculate the remaining time until the race
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }; */

  /*================== PROPS IMPORT & HOOKS =================*/
  
  const theme = props.darkMode ? Dark : Light;
  const time = props.time;
  const date = props.date;

  const [countdown, setCountdown] = useState<Countdown>();
  const [loading, setLoading] = useState(true);

  /*================== DATE & TIME =================*/
  
  const raceDay = parseInt(date.slice(8, 10));
  const raceMonth = parseInt(date.slice(5, 7));
  const raceYear = parseInt(date.slice(0, 4));

  const raceHour = parseInt(time.slice(0, 2));
  const raceMinutes = parseInt(time.slice(3, 5))

  /*================== COUNTDOWN METHODS =================*/

  const updateCountdown = () => {
    const raceDate = new Date(raceYear, raceMonth, raceDay, raceHour, raceMinutes, 0, 0);
    const now = new Date();
    const diff = new Date(raceDate.getTime() - now.getTime())

    const remainingtime: Countdown = {
      days: diff.getUTCDate(),
      hours: diff.getUTCHours(),
      minutes: diff.getUTCMinutes(),
      seconds: diff.getUTCSeconds()
    }

    setCountdown(remainingtime);
  }

  useEffect(() => {
    updateCountdown()
    setLoading(false);
    const interval = setInterval(() => {
      updateCountdown()
    }, 1000)

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Return the countdown string wrapped within a Text component
  
    return(
      <View>
        {loading ? <Text></Text> :
          <Text style = {[theme.minortext, {fontSize:28, fontFamily:'Formula1-Bold-4', textAlign: 'center', textShadowRadius: 2, elevation: 1, textShadowOffset: {width: 1, height: 1}}]}>
            {countdown?.days != 0 ? countdown!.days + 'd ' : ' '}
            {countdown?.hours != 0 ? countdown!.hours + 'h ' : ' '}
            {countdown?.minutes != 0 ? countdown!.minutes + 'm ' : ' '}  
            {countdown?.seconds + 's'}
          </Text>
        }
      </View>
      
    )
  
}
export default UpcomingRace;