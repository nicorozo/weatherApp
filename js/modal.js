/* create a history list of locations with 
    -city name
    -date 
    -temperature

    create dataset as id with city name and date to avoid repeated ones 
     */
function getHistory(){
   const history = window.localStorage.getItem('searchHistory')
   const parse = JSON.parse(history)
   return parse
}

const historyArray = getHistory() || []


export function locationsHistory(cleanData){
    
    function addNewItemToArray(){

        console.trace('add new item to history array')
        
        // add one at beginning and check length
        historyArray.unshift(cleanData)
        console.log('historyArray',historyArray)
        if(historyArray.length > 9){
            historyArray.pop()
        }

        window.localStorage.setItem('searchHistory',JSON.stringify(historyArray))
    }
    

    function displayList(){
        console.trace('displayList triggered on options button')

        const modalContainer = document.querySelector('.modal_main-container')
        modalContainer.innerHTML = ''
        const modalUl = document.createElement('div')
        modalUl.classList.add('modal_list')
        modalContainer.appendChild(modalUl)

        historyArray.forEach((listItem)=>{
            const historyItemContainer = document.createElement('div')
            historyItemContainer.classList.add('modal_history-item')
            modalUl.appendChild(historyItemContainer)

            const city = document.createElement('div')
            city.classList.add('modal_city')
            const date = document.createElement('div')
            const temperature = document.createElement('div')
            const icon = document.createElement('img')
            

            historyItemContainer.append(city,date,temperature,icon)

            /*  country: getLocation().country,
                city: getLocation().city,
                temperature: getDegrees() + '°',
                weatherDescription: data.currentConditions.conditions,
                date: getDate(),
                icon: getIcon(0) || "", */

            historyItemContainer.dataset.itemName = `${listItem.city}/${listItem.date.dateForHistory}`
            city.textContent = listItem.city
            date.textContent = listItem.date.dateForHistory
            temperature.textContent = listItem.temperature
            icon.setAttribute('src',listItem.icon)


        })
    }

    return {addNewItemToArray, displayList}
}