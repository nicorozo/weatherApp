//fetched data to DOM
import { format } from "date-fns"
import { locationsHistory } from "./modal"




export function Card(data){
    console.trace()
    console.log(data)

    function getTemperatureColor(){
        const temperature =  data.currentConditions.temp
        if(temperature >= 20){
            alert('first case')
            return 'var(--high-background)'
        }
        if(temperature >= 10 ){
            alert('temp')
            return 'var(--mid-background)'
        }
        if(temperature >= 0 ){
            alert('temp')
            return 'var(--low-background)'
        }
        if(temperature >= -10 ){
            alert('temp')
            return 'var(--super-low-background)'
        }
        else alert('nothing')

    }

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
        const month = format(new Date(),'LLL')
        const dateForHistory = `${dayNumber} / ${month} `

        const date = new Date();
        const offset = date.getTimezoneOffset() / 60;
        const localTime = new Date(date.getTime() + offset * 60 * 1000);
      
        // Get the hour from local time
        const hour = localTime.getHours();

        const minutes = format(new Date(), 'm')
        
        
        return {dayOfWeek,dayNumber,hour,minutes,dateForHistory}
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
    

    const body = document.querySelector('body')
    const cardSection = document.querySelector('.main')
    const country = cardSection.querySelector('.main_country')
    const city = cardSection.querySelector('.main_city')
    const mainTemperature = cardSection.querySelector('.main_temperature')
    const weatherWord = cardSection.querySelector('.main_weather-word')
    const mainDate = cardSection.querySelector('.main_date-time')
    const iconContainer = cardSection.querySelector('.main_icon-container')
    const mainIcon = cardSection.querySelector('.main_icon')

    body.style.background = getTemperatureColor()
    country.innerText = cleanData.country
    city.innerText = cleanData.city
    mainTemperature.innerText = cleanData.temperature
    weatherWord.innerText = cleanData.weatherDescription
    mainDate.innerText = `${cleanData.date.dayOfWeek}, ${cleanData.date.dayNumber} - ${cleanData.date.hour}:${cleanData.date.minutes}` 
    iconContainer.style = `mask-image: url(${cleanData.icon})`
    iconContainer.style = `-webkit-mask-image: url(${cleanData.icon})`
    //mainIcon.setAttribute('src',cleanData.icon)

    /* item added to history array  */
    locationsHistory(cleanData).addNewItemToArray()
}

export function temperatureHours(data){
    const dataHours = data.days[0].hours
    const dataHoursNextDay = data.days[1].hours
    const dateTimeHour = data.currentConditions.datetime.split(':')
    const currentHour = dateTimeHour[0]
    const arrayHours = []


    console.log('dataHours',dataHours,'current Hour:', currentHour)

    //iterate from current hour[0] to display next 5 hours
    let x = 0 // x represents the hours used in this day
    for (let startingHour = currentHour; startingHour < dataHours.length; startingHour++) {
        if(x >= 5){break}
        const todayHours = dataHours[startingHour]
        arrayHours.push(todayHours)
        //console.log(dataHours[startingHour])
        
        x++
    }
    const remainer =  (5 - x)
    for (let nextDayStartingHours = 0; nextDayStartingHours < remainer; nextDayStartingHours++) {
        const nextDayHours = dataHoursNextDay[nextDayStartingHours]
        arrayHours.push(nextDayHours)
    }
    //console.log(arrayHours)

    function displayHours(array){
        const section = document.querySelector('.hours_container')
        section.innerHTML = ''


        array.forEach((hour )=> {
            const [hourText,minutes,seconds] = hour.datetime.split(':')
            const [smallTemperature,decimals] = hour.temp.toString().split('.')


            const smallCard = document.createElement('div')
            smallCard.classList.add('hours_small-card')
            section.appendChild(smallCard)
            
            const title = document.createElement('span')
            title.classList.add('hours_title')
            title.textContent = `${hourText}:${minutes} `
            smallCard.appendChild(title)

            const iconContainer = document.createElement('div')
            iconContainer.classList.add('hours_icon-container')
            smallCard.appendChild(iconContainer)
            
            const icon = document.createElement('img')
            icon.classList.add('hours_icon')
            icon.setAttribute('src', `/icons/${hour.icon}.svg`)
            iconContainer.appendChild(icon)

            const temperature = document.createElement('span')
            temperature.classList.add('hours_temperature')
            temperature.textContent = `${smallTemperature}°`
            smallCard.appendChild(temperature)
        })
    }

    displayHours(arrayHours)
}
export function displayDays(data){
    const section = document.querySelector('.days_container')
    const daysArray = data.days
    section.innerHTML = ''
    
    function getDate(i){
        const date = daysArray[i].datetime
        const nameDay = format(new Date(date), 'EEE')
        const month = format(new Date(date), 'LLL')
        const dayNumber = format(new Date(date), 'd')

        return {nameDay,month,dayNumber}
    }
    function getIcon(i){
        const hoursIcon = daysArray[i].hours[12].icon
        const [temperature,decimal] = daysArray[i].hours[12].temp.toString().split('.')
        return {hoursIcon,temperature}
    }

 

    for(let i = 0; i <= 4; i++){
        
        const smallCard = document.createElement('div')
        smallCard.classList.add('days_small-card')
        section.appendChild(smallCard)
        
        const titleContainer = document.createElement('div')
        titleContainer.classList.add('days_title-container')
        smallCard.appendChild(titleContainer)
        
        const title = document.createElement('span')
        title.textContent = getDate(i).nameDay
        title.classList.add('days_title')
        titleContainer.appendChild(title)

        const titleDate = document.createElement('span')
        titleDate.textContent = getDate(i).month +' '+ getDate(i).dayNumber
        titleDate.classList.add('days_title-date')
        titleContainer.appendChild(titleDate)

        
        const iconContainer = document.createElement('div')
        iconContainer.classList.add('days_icon-container')
        smallCard.appendChild(iconContainer)

        const icon = document.createElement('img')
        icon.setAttribute('src',`/icons/${getIcon(i).hoursIcon}.svg`)
        icon.classList.add('days_icon')
        iconContainer.appendChild(icon)

        const temperature = document.createElement('span')
        temperature.textContent = `${getIcon(i).temperature}°`
        temperature.classList.add('days_temperature')
        smallCard.appendChild(temperature)
    }
}