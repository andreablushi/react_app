Formula 1 Statistics Application
Overview
This project is a mobile application developed using React Native, designed to provide users with detailed statistics and historical data on Formula 1 races. The application offers a user-friendly interface to explore race results, driver statistics, and constructor standings.

Features

Home Page
Upcoming Race Information: Displays details about the next scheduled race, including a countdown timer.
Top 5 Drivers and Constructors: Shows the top five drivers and top three constructors in the current standings.
Navigation: A consistent navigation bar across the application facilitates easy access to various sections.
Schedule
Race Schedule: Displays a list of races for the selected season. Users can navigate to detailed information about each race, including circuit images and past results.
Season Selection: A dropdown menu allows users to choose the season they are interested in.
Standings
Driver and Constructor Standings: Presents the current season's standings with basic information and points. Users can click on an item to view more detailed statistics.
Detailed View: For drivers, this includes personal details, recent race results, and more. For constructors, it shows team members, the car they are driving, and nationality.
Design Choices
Persistent Theme
The application supports both dark and light themes, which can be changed by the user through the settings menu. The theme preference is stored on the device, so it persists across sessions.
API Integration
The application uses the ERGAST API to fetch data. These APIs are well-documented and freely accessible, providing extensive data on Formula 1 seasons, races, drivers, and teams from 1950 onwards.
Caching
To reduce the number of API calls and improve loading times, a caching system is implemented using TanstackQuery. Key data is pre-fetched during the initial loading phase.
Navigation
The application allows seamless navigation between different sections, ensuring users can easily access detailed information about any driver, constructor, or race.
Handling Legacy Data and Missing Images
For older drivers and seasons where less data is available, a different approach is used. If specific images are unavailable, they are replaced with a default placeholder.
Challenges
Theme Management
Implementing a consistent theme across all screens required the use of a global event listener due to limitations in React Native regarding data passing between components.
Dynamic Image Loading
Neither React Native nor the chosen APIs provided support for dynamic image loading. This was resolved by creating a custom ImageDB.js file that maps keys (e.g., driver surnames) to the corresponding image files.
Future Extensions
Real-Time Race Management
A planned feature to provide live race statistics was not implemented due to limitations in the current API.
Enhanced Historical Data
The application currently includes images only for the current season. Future updates may incorporate images from past seasons to replace the default "not found" placeholders.
Authors
Davide Donà - [VR485945]
Andrea Blushi - [VR485743]
Zeno Bogoni - [VR487733]
