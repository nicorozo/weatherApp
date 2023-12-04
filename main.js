import './style.css'
import './styles/main.css'
import { Card, displayDays, temperatureHours } from './js/card'


/* Pending List

    -compensate hours of different locations
    -correct color of icons
*/


export default async function fetchingData() {

    const apiKey = '6E9W5YSKUUH74ZCT24N29YQ5E'
    const city = "wroclaw" // searchedResult || "wroclaw" this may need to be await and inside fetching function 
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&inlcude=hours&contentType=json`


    try{
        const response = await fetch(url)
        const data = await response.json()
        
        Card(data)
        temperatureHours(data)
        displayDays(data)
        return data
    }
    catch (error){
        console.error(error)
    }

}

fetchingData()