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
function apiData(campgroundLocation){
    const paramsNational = {
        api_key: apiKey,
        stateCode: campgroundLocation,
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

// Displays the data from the api call onto the html
function displayApiData(responseJson){
 for(let i = 0; i < responseJson.data.length; i++){
     $('.displayNational').append(`
        <h2>${responseJson.data[i].fullName}</h2>
        <h4>${responseJson.data[i].weatherInfo}</h4>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].designation}</p>
        <p>${responseJson.data[i].directionsInfo}</p>
        <p><a href="${responseJson.data[i].directionsUrl}">${responseJson.data[i].directionsUrl}</a></p><br><br><hr>
     `)
 }
}

// This function handles the form and button clicks in the html
function formHandle (){
    $('#park-button').click(event => {
        event.preventDefault();
        
        let campgroundLocation = $('#submitNational').val();
        apiData(campgroundLocation);

        $('.displayNational').empty();
        $('.displayError').empty();
    });
}

// this calls the button click function
$(formHandle);

