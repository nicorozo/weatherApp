import './style.css'
import './styles/main.css'
import './styles/options.css'
import { Card, displayDays, temperatureHours } from './js/card'
import { getLocation } from './js/search'


/* Pending List

    -compensate hours of different locations
    -correct color of icons
*/


export default async function fetchingData(location) {

    const defaultCity = "madrid" // searchedResult || "wroclaw" this may need to be await and inside fetching function 
    const city = location || defaultCity
    const apiKey = '6E9W5YSKUUH74ZCT24N29YQ5E'
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`


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

/* Events */
const searchBtn = document.querySelector('.navbar_search-btn')
searchBtn.addEventListener('click', ()=>{
    fetchingData(getLocation())
})
const modal = document.getElementById('modal');

const opendOptions = document.querySelector('.navbar_menu-btn')
opendOptions.addEventListener('click', ()=>{
    modal.style.left = '0'
})
const closeBtn= document.getElementById('closeButton');
closeBtn.addEventListener('click', ()=>{
    modal.style.left = '100%'
})