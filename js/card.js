//fetched data to DOM
import { format } from "date-fns"
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
    function getDegrees(){
        const degreesArray =  data.currentConditions.temp.toString().split('.')
        const degrees= degreesArray[0]
        return degrees
    }
    function getDate(city){
        const dayOfWeek = format(new Date(), 'eeee', 'd')
        const dayNumber = format(new Date(), 'd')

        const date = new Date();
        const offset = date.getTimezoneOffset() / 60;
        const localTime = new Date(date.getTime() + offset * 60 * 1000);
      
        // Get the hour from local time
        const hour = localTime.getHours();

        const minutes = format(new Date(), 'm')
        
        
        return {dayOfWeek,dayNumber,hour,minutes}
    }
    function getIcon(x){
        const icon = data.days[x].icon
        const iconRelPath =`/icons/${icon}.svg`
        return iconRelPath
    }


    const cleanData= {
        country: getLocation().country,
        city: getLocation().city,
        temperature: getDegrees() + '°',
        weatherDescription: data.currentConditions.conditions,
        date: getDate(),
        icon: getIcon(0) || "",

    }


    const cardSection = document.querySelector('.main')
    const country = cardSection.querySelector('.main_country')
    const city = cardSection.querySelector('.main_city')
    const mainTemperature = cardSection.querySelector('.main_temperature')
    const weatherWord = cardSection.querySelector('.main_weather-word')
    const mainDate = cardSection.querySelector('.main_date-time')
    const mainIcon = cardSection.querySelector('.main_icon')
    
    country.innerText = cleanData.country
    city.innerText = cleanData.city
    mainTemperature.innerText = cleanData.temperature
    weatherWord.innerText = cleanData.weatherDescription
    mainDate.innerText = `${cleanData.date.dayOfWeek}, ${cleanData.date.dayNumber} - ${cleanData.date.hour}:${cleanData.date.minutes}` 
    mainIcon.setAttribute('src',cleanData.icon)
    
}

export function temperatureHours(data){
    const dataHours = data.days[0].hours
    const dataHoursNextDay = data.days[1].hours
    const dateTimeHour = data.currentConditions.datetime.split(':')
    const currentHour = dateTimeHour[0]
    const arrayHours = []


    console.log(dataHours, currentHour)

    //iterate from current hour[0] to display next 5 hours
    let x = 0 // x represents the hours used in this day
    for (let startingHour = currentHour; startingHour < dataHours.length; startingHour++) {
        const todayHours = dataHours[startingHour]
        arrayHours.push(todayHours)
        //console.log(dataHours[startingHour])
        
        x++
    }
    const remainer =  (5-x )
    for (let nextDayStartingHours = 0; nextDayStartingHours < remainer; nextDayStartingHours++) {
        const nextDayHours = dataHoursNextDay[nextDayStartingHours]
        arrayHours.push(nextDayHours)
    }
    console.log(arrayHours)

    function displayHours(array){
        const section = document.querySelector('.hours-container')


        array.forEach((hour )=> {
            const [hourText,minutes,seconds] = hour.datetime.split(':')


            const smallCard = document.createElement('div')
            smallCard.classList.add('hours-small-card')
            section.appendChild(smallCard)
            
            const title = document.createElement('span')
            title.classList.add('hours_title')
            title.textContent = hourText
            smallCard.appendChild(title)

            const icon = document.createElement('img')
            icon.classList.add('hours_icon')
            icon.setAttribute('src', `/icons/${hour.icon}.svg`)
            smallCard.appendChild(icon)

            const temperature = document.createElement('span')
            temperature.classList.add('hours_temperature')
            temperature.textContent = hour.temp
            smallCard.appendChild(temperature)
        })
    }
    displayHours(arrayHours)
}