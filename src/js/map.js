"use strict";


let map = L.map('map');
map.setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.Control.geocoder().addTo(map);


// Hämta användarens plats
navigator.geolocation.watchPosition(success, error);

let marker, circle, zoomed; 

function success(pos) {

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    // Om användaren flyttar på sig, uppdatera cirkel och pil till ny plats
    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    marker = L.marker([lat, lng]).addTo(map);
    circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

    if (!zoomed) {
       zoomed = map.fitBounds(circle.getBounds());
    }
    
    map.setView([lat, lng]);

}

function error (err) {

    if (err.code === 1) {
        alert("Vänligen godkänd geolocation access");
    } else {
        alert("Kan inte hämta nuvarande plats");
    }
}
