"use strict";


// let map = L.map('map');
//map.setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   // maxZoom: 19,
   // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}).addTo(map);

// Karta med start i duved (där jag bor)
let map = L.map('map').setView([63.39164300, 12.92130450],13);

// Markör
let marker;
marker = L.marker([lat, lng]).addTo(map);


// Visa karta

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Variabler för sökruta

const searchBox = document.getElementById('search');  // För själva sökrutan
const searchButton = document.getElementById('search-button'); // Knapp för att söka
const searchResult = document.getElementById('searchResult'); // Sökresultat

// Eventlyssnare för klick på sök-knapp
searchButton.addEventListener('click', findLocation);


// Fetch-anrop till Nominatim API
async function findLocation() {
    const searchFor = searchBox.value;
    const apiURL = 'https://nominatim.openstreetmap.org/search?format=json&q=' + (searchFor);

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        // Ta bort sen
        console.log(data);
        // Ta med resultat till annan funktion för utskrift
        showLocation(data);
    } catch (error) {
        console.error('Fel vid inmatning' + error);
        searchResult.innerHTML = 'Nu blev det tok';
    }
}

// Funktion för utskrift
function showLocation(data) {
    searchResult.innerHTML = "";

    if(data.length > 0) {
        //Skapa li-element för varje resultat
        data.forEach((result) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-lat', result.lat); // Lagra latitud
            listItem.setAttribute('data-lng', result.lng); // Lagra longitud
            const textString = document.createTextNode(result.display_name); // Skapa textnod med namn

            // Lägg till info i listItem och visa i lista
            listItem.appendChild(textString);
            searchResult.appendChild(listItem);

            // Eventlyssnare för klick på resultat
            listItem.addEventListener('click', (e) => {
                const lat = e.target.dataset.lat; // Ta med latidude
                const lng = e.target.dataset.lng; // Ta med longitude
                moveMarker(lat, lng); // Flytta markören till den valda platsen
            })
        })
    }
}

// Funktion för att flytta markören till vald plats
function moveMarker(lat, lng) {
    // Ta bort befintlig markör om det finns en
    if (marker) {
        map.removeLayer(marker);
    }
    
    // Skapa ny markör och flytta till vald plats
    marker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 13); // Justera vyn för att centrera markören
}



// Hämta användarens plats
// navigator.geolocation.watchPosition(success, error);

// let marker, circle, zoomed; 


// function success(pos) {

 //   const lat = pos.coords.latitude;
 //   const lng = pos.coords.longitude;
 //   const accuracy = pos.coords.accuracy;

    // Om användaren flyttar på sig, uppdatera cirkel och pil till ny plats
   // if (marker) {
    //    map.removeLayer(marker);
     //   map.removeLayer(circle);
  //  }

 //   marker = L.marker([lat, lng]).addTo(map);
 //   circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

   // if (!zoomed) {
    //   zoomed = map.fitBounds(circle.getBounds());
  //  }
    
  //  map.setView([lat, lng]);

// }

function error (err) {

    if (err.code === 1) {
        alert("Vänligen godkänd geolocation access");
    } else {
        alert("Kan inte hämta nuvarande plats");
    }
}
