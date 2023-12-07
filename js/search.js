
export function searchLocation(){

    const searchBar = document.querySelector('#searchbar')
    const location = searchBar.value

    function isLocation(){
        if(location === ''){
            return false
        }
        return true
    }
    function getLocation(){
        searchBar.value = '' //clear searchbar
        
        console.log('location:',location)
        return location
    }
    
    return{getLocation,isLocation}
}