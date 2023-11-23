

const apiKey = '6E9W5YSKUUH74ZCT24N29YQ5E'
const city = "wroclaw" // searchedResult || "wroclaw" this may need to be await and inside fetching function 
const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`



export default async function fetchingData() {

    const response = await fetch(url)
    const data = await response.json()

    return data
}


