
export function getLocation(){
    const searchBar = document.querySelector('#searchbar')
    const location = searchBar.value
    console.log('location:',location)
    //Clear the search bar on focus
    searchBar.value = ''
    console.log('value',searchBar.value)
    return location
}