"use strict";

// Variabler för kartan och markören
let map;
let marker;

// Hämta användarens plats och markera var den befinner sig, lyckad eller inte 
navigator.geolocation.getCurrentPosition(success, error);

// Funktion för lyckad hämtning av användarens plats
function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Skapa en ny karta med start på användarens nuvarande plats
    map = L.map('map').setView([lat, lon], 13);

    // Visa karta
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Placera markören på användarens plats
    marker = L.marker([lat, lon]).addTo(map);
}

// Funktion om hämtning av användarens plats ej lyckas
function error(err) {
    if (err.code === 1) {
        alert("Vänligen godkänd geolocation access");
    } else {
        alert("Kan inte hämta nuvarande plats");
    }
}


// Variabler för sökruta
const searchBox = document.getElementById('search'); 
const searchButton = document.getElementById('search-button'); 
const searchResult = document.getElementById('searchResult'); 

// Eventlyssnare för klick på sök-knapp
searchButton.addEventListener('click', findLocation);


// Fetch-anrop till Nominatim API
async function findLocation() {
    const searchFor = searchBox.value; // Variabel för sökrutan + det användaren sökt efter
    const apiURL = `https://nominatim.openstreetmap.org/search?format=json&q=${searchFor}`; // Hämta API + sökning

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        // Ta med data till ny funktion
        showLocation(data);
        // Om något blir fel vid anrop
    } catch (error) {
        console.error('Fel vid inmatning' + error);
        searchResult.innerHTML = 'Nu blev det tokigt';
    }
}

// Funktion för utskrift med info från tidigare funktion
function showLocation(data) {
    searchResult.innerHTML = "";

    if (data.length > 0) {
        //Loopa igenom resultat och skapa list-element för varje resultat
        data.forEach((result) => {
            const listItem = document.createElement('li');

            // Lagra latitude och longitude, skapa textnod
            listItem.setAttribute('data-lat', result.lat); 
            listItem.setAttribute('data-lon', result.lon); 
            const textString = document.createTextNode(result.display_name); 

            // Lägg till resultat 
            listItem.appendChild(textString);
            searchResult.appendChild(listItem);

            // Vid klick på namn, hämta latitude och longitude och flytta markör till ny plats
            listItem.addEventListener('click', () => {
                const lat = listItem.dataset.lat; 
                const long = listItem.dataset.lon; 
                moveMarker(lat, long); 
            });
        });
    } else { // Om sökning inte hittas
        searchResult.innerHTML = 'Kunde inte hitta angiven plats';
    }
}

// Funktion för att flytta markören till vald plats
function moveMarker(lat, long) {

    // Ta bort befintlig markör om det finns en
    if (marker) {
        map.removeLayer(marker);
    }
    // Skapa ny markör och flytta till vald plats
    marker = L.marker([lat, long]).addTo(map);
    map.flyTo([lat, long], 13);
}



