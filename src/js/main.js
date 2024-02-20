"use strict";

console.log("Test av JavaScript");

// Hämta in meny-knappar
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

// Eventlyssnare
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

//Toggla fram navigeringsmenyn
function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");

    // Hämtar in css för menyn
    let style = window.getComputedStyle(navMenuEl);

    // Kontrollera om navigering är synlig eller ej, ändrar display block/none
    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}


// Stapeldiagram = namn på kurs + totalt antal sökande, 6 mest sökta kurserna
//Cirkeldiagram = 5 mest sökta programmen på miun ht23, namn och program

import Chart from 'chart.js/auto';

// Hämta data från webbtjänst

const url = "https://studenter.miun.se/~mallar/dt211g/";

window.onload = init();

async function init () {
    try {
        // Fetch-anrop
        const response = await fetch(url);
        let data = await response.json();

     displayCourses(data);
    displayPrograms(data);

    } catch(e) {
        console.log(e);
        document.getElementById("error").innerHTML = "<p>Något gick fel..</p>";
    }
}

function displayCourses(data) {

      // Filtrera ut kurser
      data = data.filter((course) => {
        return course.type.includes("Kurs");
    });

        // Sortera antal sökande på kurserna
        data.sort((a, b) => a.applicantsTotal - b.applicantsTotal).reverse();
        data = data.slice(0, 6);
    
    let courseNames = [];
    let applicantsTotals = [];

    // Loopa igenom och skriv ut
    data.forEach((course) => {
        courseNames.push(course.name);
        applicantsTotals.push(course.applicantsTotal);
    });

    // Diagram //

const ctx = document.getElementById('courseChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: courseNames,
        datasets: [{
            label: 'Mest sökta kurser',
            data: applicantsTotals,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Bakgrundsfärg för staplarna
                borderColor: 'rgba(54, 162, 235, 1)', // Kantfärg för staplarna
                borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true // Y-axeln börjar vid noll
            }
        }
    }
});

}



// Program

function displayPrograms(data) {

    // Filtrera ut program
    data = data.filter((program) => {
      return program.type.includes("Program");
  });

      // Sortera antal sökande på kurserna
      data.sort((a, b) => a.applicantsTotal - b.applicantsTotal).reverse();
      data = data.slice(0, 6);
  
  let programNames = [];
  let applicantsTotals = [];

  // Loopa igenom och skriv ut
  data.forEach((program) => {
      programNames.push(program.name);
      applicantsTotals.push(program.applicantsTotal);
  });

  // Diagram //

const ctx = document.getElementById('programChart');

new Chart(ctx, {
  type: 'pie',
  data: {
      labels: programNames,
      datasets: [{
          label: 'Mest sökta program',
          data: applicantsTotals,
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // Bakgrundsfärg för staplarna
              borderColor: 'rgba(54, 162, 235, 1)', // Kantfärg för staplarna
              borderWidth: 2
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true // Y-axeln börjar vid noll
          }
      }
  }
});

}


// Karta

let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();