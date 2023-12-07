/* create a history list of locations with 
    -city name
    -date 
    -temperature

    create dataset as id with city name and date to avoid repeated ones 
     */

const historyArray = []


export function locationsHistory(cleanData){
    
    function addNewItemToArray(){
        console.trace('add new item to history array')
        console.log('historyArray',historyArray)
        historyArray.push(cleanData)
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
            const date = document.createElement('div')
            const temperature = document.createElement('div')
            const icon = document.createElement('div')

            historyItemContainer.append(city,date,temperature,icon)

            /*  country: getLocation().country,
                city: getLocation().city,
                temperature: getDegrees() + '°',
                weatherDescription: data.currentConditions.conditions,
                date: getDate(),
                icon: getIcon(0) || "", */

            historyItemContainer.dataset.itemName = listItem.city
            city.textContent = listItem.city
            date.textContent = listItem.date
            temperature.textContent = listItem.temperature
            //icon.textContent = listItem.icon
        })
    }

    return {addNewItemToArray, displayList}
}