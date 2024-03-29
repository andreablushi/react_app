// Define a type for nationality to nation mapping
type NationalityToNationMapping = {
    [key: string]: string;
};

// Function to convert nationality to nation
export const convertNationalityToNation = (nationality: string): string => {
    // Define a mapping of nationality codes to nation names
    const nationalityToNationMapping: NationalityToNationMapping = {
        "Australian": "Australia",
        "Austrian": "Austria",
        "Azerbaijani": "Azerbaijan",
        "Bahraini": "Bahrain",
        "Belgian": "Belgium",
        "Brazilian": "Brazil",
        "British": "uk",
        "Canadian": "Canada",
        "Chinese": "China",
        "Colombian": "Colombia",
        "Czech": "Czech Republic",
        "Danish": "Denmark",
        "Dutch": "Netherlands",
        "Finnish": "Finland",
        "French": "France",
        "German": "Germany",
        "Hungarian": "Hungary",
        "Indian": "India",
        "Indonesian": "Indonesia",
        "Irish": "Ireland",
        "Italian": "Italy",
        "Japanese": "Japan",
        "Korean": "South Korea",
        "Malaysian": "Malaysia",
        "Mexican": "Mexico",
        "Monegasque": "Monaco",
        "New Zealander": "New Zealand",
        "Polish": "Poland",
        "Portuguese": "Portugal",
        "Qatari": "Qatar",
        "Russian": "Russia",
        "Singaporean": "Singapore",
        "South African": "South Africa",
        "Spanish": "Spain",
        "Swedish": "Sweden",
        "Swiss": "Switzerland",
        "Thai": "Thailand",
        "Turkish": "Turkey",
        "Ukrainian": "Ukraine",
        "Uruguayan": "Uruguay",
        "American":"usa"
        // Add more mappings as needed
    };

    // Check if the nationality exists in the mapping
    if (nationality in nationalityToNationMapping) {
        return nationalityToNationMapping[nationality];
    } else {
        // If no mapping is found, return the original nationality
        return nationality;
    }
};
 