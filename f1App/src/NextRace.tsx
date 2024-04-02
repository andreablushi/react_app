import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { imageSource } from './App';
import axios from 'axios';

interface Race {
  season: string;
  round: string;
  raceName: string;
  date: string;
  time: string;
  country: string;
}

const UpcomingRace: React.FC = () => {
  const [upcomingRace, setUpcomingRace] = useState<Race | null>(null);
  const [countdown, setCountdown] = useState<string>('');

  // Fetch data of the next upcoming race
  useEffect(() => {
    const fetch= async () => {
      try {
        // Fetch data from Ergast API
        const response = await axios.get('https://ergast.com/api/f1/current/next.json');
        // Extract relevant race data from API response
        const data = response.data.MRData.RaceTable.Races[0];
        // Set the upcoming race state
        setUpcomingRace({
          season: data.season,
          round: data.round,
          raceName: data.raceName,
          date: data.date,
          time: data.time,
          country: data.Circuit.Location.country,
        });
      } catch (error) {
        // Handle errors
        console.error('Error');
      }
    };

    fetch();

  }, []);

   // Set up a timer to update the countdown every second
   useEffect(() => {
    if (upcomingRace) {
      const intervalId = setInterval(() => {
        const countdown = calculateCountdown(upcomingRace.date, upcomingRace.time);
        setCountdown(countdown);
      }, 1000);

      // Clean up function to clear the interval when the component changes or when upcomingRace changes
      return () => clearInterval(intervalId);
    }
  }, [upcomingRace]);

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
            return 'started';
        } else {
        // Calculate the number of days remaining until the race

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    };
  

  return (
    <View>
      {upcomingRace ? (
        <View>
          {/* Display upcoming race information */}
          <Text>Next Race: {upcomingRace.raceName}</Text>
          <Text>Season: {upcomingRace.season}</Text>
          <Text>Round: {upcomingRace.round}</Text>
          <Text>Country: {upcomingRace.country}</Text>
          <Image source={imageSource.getFlag(upcomingRace.country)}  />
          <Text>Date: {upcomingRace.date}</Text>
          <Text>Time: {upcomingRace.time}</Text>
          {/* Display countdown */}
          <Text>
            Countdown: {calculateCountdown(upcomingRace.date, upcomingRace.time)}
          </Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default UpcomingRace;
