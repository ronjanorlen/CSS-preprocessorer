"use strict";

// Variebel för att skriva ut karta på webbplats
let map = L.map('map');
map.setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Hämta användarens plats
navigator.geolocation.watchPosition(success, error);

function success(pos) {

    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;
    let accuracy = pos.coords.accuracy;

    let marker = L.marker([lat, lng]).addTo(map);
    let circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

    map.fitBounds(circle.getBounds());

}

function error (err) {

    if (err.code === 1) {
        alert("Vänligen godkänd geolocation access");
    } else {
        alert("Kan inte hämta nuvarande plats");
    }
}
