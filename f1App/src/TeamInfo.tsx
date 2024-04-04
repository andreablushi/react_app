import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, View, Pressable} from 'react-native';

// Styles and Theme imports
import Styles from "../stylesheets/Styles";
import { Light, Dark } from "../stylesheets/Theme";

//Import used to implement navigation
import { useNavigation } from "@react-navigation/native";
import { HomePageNavigationProp } from "./HomePage";

// Helper functions and constants imports
import { cfg, globalThemeControl, imageSource } from './App';
import { NavigationBar } from './NavigationBar';
import { convertNationalityToNation } from '../utils/convertNationalityToNation';

// Define types for API response data
type DriverInfo = {
    permanentNumber: number;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
    driverId: string;
}[];

type Constructor = {
    constructorId: string;
    name: string;
    nationality: string;
}[];

// Define props types
type DriverProps = {
    darkMode: boolean;
    driverInfo: DriverInfo;
};

type TeamProps = {
    darkMode: boolean;
    team: Constructor;
};

// Component to display team information
function TeamComponent(prop: TeamProps): React.ReactElement {
    const theme = prop.darkMode ? Dark : Light;
    const teamData = prop.team[0];

    return (
        <View style = {[{flexDirection: 'column', alignItems: 'center'}, theme.title_bar]}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 }}>
                <View style = {{flexDirection: 'column', flex: 3}}>
                    <Text style={[theme.title_bar, { fontSize: 30, fontWeight: '800', paddingTop: 7, paddingBottom:7 }]}>{teamData.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[theme.title_bar, { fontSize: 18, fontWeight: '500', paddingRight:10 }]}>{teamData.nationality}</Text>
                        <Image source={imageSource.getFlag(convertNationalityToNation(teamData.nationality))} style={{ resizeMode: 'contain', width: 50, height: 50 }} />
                    </View>
                </View>
                <Image source={imageSource.getTeamBadge(teamData.constructorId)} style={{ resizeMode: 'contain', width: 100, height: 100 }} />
            </View>
        <Image source={imageSource.getTeamCar(teamData.constructorId)} style={{ resizeMode: 'contain', width: 216, height: 64, marginTop: 20}}/>
        </View>
    );
}

// Component to display driver information
function DriverComponent(prop: DriverProps): React.ReactElement {
    const theme = prop.darkMode ? Dark : Light;
    const drivers = prop.driverInfo;
    
    //Added to implement navigation
    const navigation = useNavigation<HomePageNavigationProp>();
    return (
        <View>
            {drivers.map((driver) => (
                <Pressable  key={driver.driverId} onPress={() =>  navigation.navigate("DriverInfo", {driver: driver.driverId})}>
                    <View style={[{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 }, Styles.horizontalListElement, theme.horizontalList_element]}>
                        <View style={{ flex: 3, paddingBottom: 10}}>
                            <Text style={[theme.minortext, {fontSize: 20, fontWeight: '400' }]}>{driver.givenName}</Text>
                            <Text style={[theme.minortext, {fontSize: 24, fontWeight: '800' }]}>{driver.familyName}</Text>
                            <Text style={[theme.minortext, {fontSize: 16 }]}>{driver.permanentNumber}</Text>
                            <Text style={[theme.minortext, {fontSize: 15 }]}>{driver.nationality}</Text>
                            <Text style = {theme.minortext}>{driver.dateOfBirth}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={imageSource.getDriverSide(driver.familyName)} style={{ resizeMode: 'contain', width: 100, height: 100 }} />
                        </View>
                    </View>
                    {/* <View style={Styles.light_separator} /> */}
                </Pressable>
                
            ))}
        </View>
    );
}

// Main component for the driver info page
export default function DriverInfo({ route }: any) {
    // State for theme
    const [darkMode, setDarkMode] = useState(cfg.darkMode);
    const theme = darkMode ? Dark : Light;

    // Getting team ID from route params
    const { team: teamId } = route.params;

    // State for data and loading indicator
    const [driverInfoData, setDriverInfoData] = useState<DriverInfo>([]);
    const [teamData, setTeamData] = useState<Constructor>([]);
    const [loading, setLoading] = useState(true);

    // API URLs for data fetching
    const driverListInfoApiUrl = `http://ergast.com/api/f1/2024/constructors/${teamId}/drivers.json`;
    const teamApiUrl = `http://ergast.com/api/f1/2024/constructors/${teamId}.json`;

    // Function to fetch data
    const getData = async () => {
        try {
            const [driverResponse, teamResponse] = await Promise.all([
                fetch(driverListInfoApiUrl).then(res => res.json()),
                fetch(teamApiUrl).then(res => res.json())
            ]);
            setDriverInfoData(driverResponse.MRData.DriverTable.Drivers);
            setTeamData(teamResponse.MRData.ConstructorTable.Constructors);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <SafeAreaView style={[{ flex: 1 }, theme.card]}>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                    <Text style={Styles.loadingText}>Loading data...</Text>
                </View>
            ) : (
                <ScrollView>
                    <TeamComponent darkMode={darkMode} team={teamData} />
                    <Text style={[theme.card, { fontSize: 22, fontWeight: '800', paddingTop: 10 }]}> Drivers: </Text>
                    <DriverComponent darkMode={darkMode} driverInfo={driverInfoData} />
                </ScrollView>
            )}
            <NavigationBar/>
        </SafeAreaView> 
    );
}
