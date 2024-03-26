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
  ]
};

export default ImagesDB;