//fetched data to DOM
import { dummyData } from "./dummy"


export function Card(data){
    console.trace()
    console.log(data)

    function getLocation(){

        const locationArray = data.resolvedAddress.split(',')
        const country = locationArray.pop()
        const city = locationArray[0]

        return {country,city}
    }

    const cleanData= {
        country: getLocation().country,
        city: getLocation().city,
        temperature:data.currentConditions.temp,
        weatherDescription: data.currentConditions.conditions,
        icon: 'still pending',

    }


    const cardSection = document.querySelector('.main')
    const country = cardSection.querySelector('.main_country')
    const city = cardSection.querySelector('.main_city')
    const mainTemperature = cardSection.querySelector('.main_temperature')
    const weatherWord = cardSection.querySelector('.main_weather-word')
    const mainDate = cardSection.querySelector('.main_date-time')
    
    country.innerText = cleanData.country
    city.innerText = cleanData.city
    mainTemperature.innerText = cleanData.temperature
    weatherWord.innerText = cleanData.weatherDescription
}
