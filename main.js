import './style.css'
import './styles/main.css'
import { Card } from './js/card'


export default async function fetchingData() {

    const apiKey = '6E9W5YSKUUH74ZCT24N29YQ5E'
    const city = "wroclaw" // searchedResult || "wroclaw" this may need to be await and inside fetching function 
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`


    try{
        const response = await fetch(url)
        const data = await response.json()
        
        Card(data)
        return data
    }
    catch (error){
        console.error(error)
    }

}

fetchingData()