/*  
    To use:
        define a list of json elements, similar to the one specified for the drivers.
        It should comprend an ID, which can be used to refer to a precise element (as ex: drivers familyName dor the drivers)
        and an src, the rrquire with the image url.

        You should also implement a function, similar to the getImageSource from the DriverStandings

    To fix:
        driver bearman has only side images 
*/

const ImagesDB = 
{
  "driverNotFound": require("../img/driverNotFound.png"),
  "notfound": require("../img/notfound.png"),
  "drivers-side": [
    {
      "name": "Albon",
      "src": require("../img/drivers/albon.png"),
    },
    {
      "name": "Alonso",
      "src": require("../img/drivers/alonso.png"),
    },
    {
      "name": "Bottas",
      "src": require("../img/drivers/bottas.png"),
    },
    {
      "name": "Gasly",
      "src": require("../img/drivers/gasly.png"),
    },
    {
      "name": "Hamilton",
      "src": require("../img/drivers/hamilton.png"),
    },
    {
      "name": "Hülkenberg",
      "src": require("../img/drivers/hulkenberg.png"),
    },
    {
      "name": "Magnussen",
      "src": require("../img/drivers/kevin_magnussen.png"),
    },
    {
      "name": "Leclerc",
      "src": require("../img/drivers/leclerc.png"),
    },
    {
      "name": "Verstappen",
      "src": require("../img/drivers/max_verstappen.png"),
    },
    {
      "name": "Norris",
      "src": require("../img/drivers/norris.png"),
    },
    {
      "name": "Ocon",
      "src": require("../img/drivers/ocon.png"),
    },
    {
      "name": "Pérez",
      "src": require("../img/drivers/perez.png"),
    },
    {
      "name": "Piastri",
      "src": require("../img/drivers/piastri.png"),
    },
    {
      "name": "Ricciardo",
      "src": require("../img/drivers/ricciardo.png"),
    },
    {
      "name": "Russell",
      "src": require("../img/drivers/russell.png"),
    },
    {
      "name": "Sainz",
      "src": require("../img/drivers/sainz.png"),
    },
    {
      "name": "Sargeant",
      "src": require("../img/drivers/sargeant.png"),
    },
    {
      "name": "Stroll",
      "src": require("../img/drivers/stroll.png"),
    },
    {
      "name": "Tsunoda",
      "src": require("../img/drivers/tsunoda.png"),
    },
    {
      "name": "Zhou",
      "src": require("../img/drivers/zhou.png"),
    },
    {
      "name": "Bearman",
      "src": require("../img/drivers/bearman-side.png"),
    },
  ],
  "drivers-front": [
    {
      "name": "Albon",
      "src": require("../img/drivers/albon_front.png"),
    },
    {
      "name": "Alonso",
      "src": require("../img/drivers/alonso_front.png"),
    },
    {
      "name": "Bottas",
      "src": require("../img/drivers/bottas_front.png"),
    },
    {
      "name": "Gasly",
      "src": require("../img/drivers/gasly_front.png"),
    },
    {
      "name": "Hamilton",
      "src": require("../img/drivers/hamilton_front.png"),
    },
    {
      "name": "Hülkenberg",
      "src": require("../img/drivers/hulkenberg_front.png"),
    },
    {
      "name": "Magnussen",
      "src": require("../img/drivers/kevin_magnussen_front.png"),
    },
    {
      "name": "Leclerc",
      "src": require("../img/drivers/leclerc_front.png"),
    },
    {
      "name": "Verstappen",
      "src": require("../img/drivers/max_verstappen_front.png"),
    },
    {
      "name": "Norris",
      "src": require("../img/drivers/norris_front.png"),
    },
    {
      "name": "Ocon",
      "src": require("../img/drivers/ocon_front.png"),
    },
    {
      "name": "Pérez",
      "src": require("../img/drivers/perez_front.png"),
    },
    {
      "name": "Piastri",
      "src": require("../img/drivers/piastri_front.png"),
    },
    {
      "name": "Ricciardo",
      "src": require("../img/drivers/ricciardo_front.png"),
    },
    {
      "name": "Russell",
      "src": require("../img/drivers/russell_front.png"),
    },
    {
      "name": "Sainz",
      "src": require("../img/drivers/sainz_front.png"),
    },
    {
      "name": "Sargeant",
      "src": require("../img/drivers/sargeant_front.png"),
    },
    {
      "name": "Stroll",
      "src": require("../img/drivers/stroll_front.png"),
    },
    {
      "name": "Tsunoda",
      "src": require("../img/drivers/tsunoda_front.png"),
    },
    {
      "name": "Zhou",
      "src": require("../img/drivers/zhou_front.png"),
    },
    {
      "name": "Bearman",
      "src": require("../img/drivers/bearman-side.png"),
    },
  ],
  "circuits": [
    {
      "name": "Albert Park Grand Prix Circuit",
      "src": require("../img/circuits/albert_park.png"),
    }, 
    {
      "name": "Circuit of the Americas",
      "src": require("../img/circuits/americas.png"),
    },
    {
      "name": "Bahrain International Circuit",
      "src": require("../img/circuits/bahrain.png"),
    },
    {
      "name": "Baku City Circuit",
      "src": require("../img/circuits/baku.png"),
    },
    {
      "name": "Circuit de Barcelona-Catalunya",
      "src": require("../img/circuits/catalunya.png"),
    },
    {
      "name": "Hungaroring",
      "src": require("../img/circuits/hungaroring.png"),
    },
    {
      "name": "Autodromo Enzo e Dino Ferrari",
      "src": require("../img/circuits/imola.png"),
    },
    {
      "name": "Autódromo José Carlos Pace",
      "src": require("../img/circuits/interlagos.png"),
    },
    {
      "name": "Jeddah Corniche Circuit",
      "src": require("../img/circuits/jeddah.png"),
    },
    {
      "name": "Losail International Circuit",
      "src": require("../img/circuits/losail.png"),
    },
    {
      "name": "Marina Bay Street Circuit",
      "src": require("../img/circuits/yas_marina.png"),
    },
    {
      "name": "Miami International Autodrome",
      "src": require("../img/circuits/miami.png"),
    },
    {
      "name": "Circuit de Monaco",
      "src": require("../img/circuits/monaco.png"),
    },
    {
      "name": "Autodromo Nazionale di Monza",
      "src": require("../img/circuits/monza.png"),
    },
    {
      "name": "Red Bull Ring",
      "src": require("../img/circuits/red_bull_ring.png"),
    },
    {
      "name": "Autódromo Hermanos Rodríguez",
      "src": require("../img/circuits/rodriguez.png"),
    },
    {
      "name": "Shanghai International Circuit",
      "src": require("../img/circuits/shanghai.png"),
    },
    {
      "name": "Silverstone Circuit",
      "src": require("../img/circuits/silverstone.png"),
    },
    {
      "name": "Circuit de Spa-Francorchamps",
      "src": require("../img/circuits/spa.png"),
    },
    {
      "name": "Suzuka Circuit",
      "src": require("../img/circuits/suzuka.png"),
    },
    {
      "name": "Las Vegas Strip Street Circuit",
      "src": require("../img/circuits/vegas.png"),
    },
    {
      "name": "Circuit Gilles Villeneuve",
      "src": require("../img/circuits/villeneuve.png"),
    },
    {
      "name": "Circuit Park Zandvoort",
      "src": require("../img/circuits/zandvoort.png"),
    },
  ],
  "flags": [
    {
      "nation": "australia",
      "src": require("../img/countries/australia.png"),
    },
    {
      "nation": "austria",
      "src": require("../img/countries/austria.png"),
    },
    {
      "nation": "azerbaijan",
      "src": require("../img/countries/azerbaijan.png"),
    },
    {
      "nation": "bahrain",
      "src": require("../img/countries/bahrain.png"),
    },
    {
      "nation": "belgium",
      "src": require("../img/countries/belgium.png"),
    },
    {
      "nation": "brazil",
      "src": require("../img/countries/brazil.png"),
    },
    {
      "nation": "canada",
      "src": require("../img/countries/canada.png"),
    },
    {
      "nation": "france",
      "src": require("../img/countries/france.png"),
    },
    {
      "nation": "hungary",
      "src": require("../img/countries/hungary.png"),
    },
    {
      "nation": "italy",
      "src": require("../img/countries/italy.png"),
    },
    {
      "nation": "japan",
      "src": require("../img/countries/japan.png"),
    },
    {
      "nation": "mexico",
      "src": require("../img/countries/mexico.png"),
    },
    {
      "nation": "monaco",
      "src": require("../img/countries/monaco.png"),
    },
    {
      "nation": "netherlands",
      "src": require("../img/countries/netherlands.png"),
    },
    {
      "nation": "qatar",
      "src": require("../img/countries/qatar.png"),
    },
    {
      "nation": "saudi arabia",
      "src": require("../img/countries/saudi_arabia.png"),
    },
    {
      "nation": "singapore",
      "src": require("../img/countries/singapore.png"),
    },
    {
      "nation": "spain",
      "src": require("../img/countries/spain.png"),
    },
    {
      "nation": "uae",
      "src": require("../img/countries/uae.png"),
    },
    {
      "nation": "uk",
      "src": require("../img/countries/uk.png"),
    },
    {
      "nation": "switzerland",
      "src": require("../img/countries/switzerland.png"),
    },
    {
      "nation": "usa",
      "src": require("../img/countries/usa.png"),
    },
    {
      "nation": "United States",
      "src": require("../img/countries/usa.png"),
    },
    {
      "nation": "china",
      "src": require("../img/countries/china.png"),
    },
    {
      "nation": "germany",
      "src": require("../img/countries/germany.png"),
    },
  ],
  "team_icon": [
    {
      "team_name": "alpine",
      "src": require("../img/teams_icon/alpine.png"),
    },
    {
      "team_name": "aston_martin",
      "src": require("../img/teams_icon/aston_martin.png"),
    },
    {
      "team_name": "ferrari",
      "src": require("../img/teams_icon/ferrari.png"),
    },
    {
      "team_name": "haas",
      "src": require("../img/teams_icon/haas.png"),
    },
    {
      "team_name": "mclaren",
      "src": require("../img/teams_icon/mclaren.png"),
    },
    {
      "team_name": "mercedes",
      "src": require("../img/teams_icon/mercedes.png"),
    },
    {
      "team_name": "rb",
      "src": require("../img/teams_icon/rb.png"),
    },
    {
      "team_name": "red_bull",
      "src": require("../img/teams_icon/red_bull.png"),
    },
    {
      "team_name": "sauber",
      "src": require("../img/teams_icon/sauber.png"),
    },
    {
      "team_name": "williams",
      "src": require("../img/teams_icon/williams.png"),
    },
  ],
  "team_car": [
    {
      "team_name": "alpine",
      "src": require("../img/car/alpine.png"),
    },
    {
      "team_name": "aston_martin",
      "src": require("../img/car/aston_martin.png"),
    },
    {
      "team_name": "ferrari",
      "src": require("../img/car/ferrari.png"),
    },
    {
      "team_name": "haas",
      "src": require("../img/car/haas.png"),
    },
    {
      "team_name": "mclaren",
      "src": require("../img/car/mclaren.png"),
    },
    {
      "team_name": "mercedes",
      "src": require("../img/car/mercedes.png"),
    },
    {
      "team_name": "rb",
      "src": require("../img/car/rb.png"),
    },
    {
      "team_name": "red_bull",
      "src": require("../img/car/red_bull.png"),
    },
    {
      "team_name": "sauber",
      "src": require("../img/car/sauber.png"),
    },
    {
      "team_name": "williams",
      "src": require("../img/car/williams.png"),
    },
  ],
  
};

export default ImagesDB;