'use strict';
let nationalUrl = 'https://developer.nps.gov/api/v1/parks';
let apiKey = 'rrspjQLxbINfED0AOxwHxMTwmbxi1IsWeqltUV1I';
// This function formats the parameters for the api call
function formatParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
}
// API Fetch for national parks
function apiData(parkLocation, maxResults){
    const paramsNational = {
        api_key: apiKey,
        stateCode: parkLocation,
        limit: maxResults,
    }
    let queryString = formatParams(paramsNational);
    let newNationalUrl = nationalUrl + '?' + queryString;
    fetch(newNationalUrl)
    .then(response => response.json())
    .then(responseJson => displayApiData(responseJson))
    .catch(error => {
        $('.displayError').html(`Sorry, but there were some issues behind the scenes. Please wait and try again: ${error.message}`)
    })
}
function getNumParks() {
	return Number($('#numParks').val() || 0)
}
// Displays the data from the api call onto the html
function displayApiData(responseJson){
 for(let i = 0; i < responseJson.data.length; i++){
     console.log(responseJson.data[i]);
     $('.displayNational').append(`
        <h2>${responseJson.data[i].name}</h2>
        
        <p>${responseJson.data[i].description}</p>
        
        <img src="${responseJson.data[i].images[0].url}" width=300>
        <hr>
     `)
 }
}
// This function handles the form and button clicks in the html
function formHandle (){
    $('#park-button').click(event => {
        event.preventDefault();
        //const numParks = getNumParks()
        let parkLocation = $('#submitNational').val();
        let maxResults = $('#js-max-results').val();
        apiData(parkLocation, maxResults);
        $('.displayNational').empty();
        $('.displayError').empty();
    });
}
// this calls the button click function
$(formHandle);