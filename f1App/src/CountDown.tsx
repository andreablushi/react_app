import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Dark, Light } from '../stylesheets/Theme';

type UpcomingRaceProps = {
  date: string;
  time: string;
  darkMode: boolean
}
/*
  Defining the Upcoming Race ELEMENT. This eleements create a COUNTDOWN to a race
  which DATE AND TIME are being passed as a parameter. The countdown is updated every second
*/
function UpcomingRace(props: UpcomingRaceProps): React.JSX.Element {
  const theme = props.darkMode ? Dark : Light;

  //Setting up the countdown hook. It-s initialized as an empty string
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
  };

  // Return the countdown string wrapped within a Text component

  return( 
    <Text style = {[theme.minortext, {fontSize:28, fontFamily:'Formula1-Wide'}]}>
      {countdown}
    </Text>
  )
};

export default UpcomingRace;