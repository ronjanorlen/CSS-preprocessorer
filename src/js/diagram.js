"use strict";
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

         // Filtrera ut kurser
      data = data.filter((course) => {
        return course.type.includes("Kurs");
    });

        // Sortera data
        data.sort((a, b) => a.applicantsTotal - b.applicantsTotal).reverse();
        data = data.slice(0, 6);


        displayCourses(data);
      //  displayPrograms(programs);
    } catch {
        document.getElementById("error").innerHTML = "<p>Något gick fel..</p>";
    }
}

function displayCourses(data) {
    
    let courseNames = [];
    let applicantsTotals = [];

    // Loopa igenom och skriv ut
    data.forEach((course) => {
        courseNames.push(course.name);
        applicantsTotals.push(course.applicantsTotal);
    });

    // Diagram //

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: courseNames,
        datasets: [{
            label: 'Mest sökta kurser',
            data: applicantsTotals,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Bakgrundsfärg för staplarna
                borderColor: 'rgba(54, 162, 235, 1)', // Kantfärg för staplarna
                borderWidth: 1
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


// function displayPrograms(programs) {
  //  const programsEl = document.getElementById("myChart2");

    // Loopa igenom och skriv ut
   // programs.forEach((program) => {
    //    programsEl.innerHTML += `
     //  <p>${program.type}</p>
     //  <p>${program.admissionRound}</p>
      // <p>${program.applicantsTotal}</p>
       // `;
   // });
//}
