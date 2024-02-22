// Stapeldiagram = namn på kurs + totalt antal sökande, 6 mest sökta kurserna
//Cirkeldiagram = 5 mest sökta programmen på miun ht23, namn och program
"use strict";
import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';

Chart.register(Colors);

// Hämta data från webbtjänst

const url = "https://studenter.miun.se/~mallar/dt211g/";

window.onload = init();

async function init() {
    try {
        // Fetch-anrop
        const response = await fetch(url);
        let data = await response.json();

        displayCourses(data);
        displayPrograms(data);

    } catch (e) {
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

    // Radbrytning för kursnamn
    let courseNameAdjusted = courseNames.map(label => label.split(' '));

    // Diagram //
    Chart.defaults.font.size = 18;
    const ctx = document.getElementById('courseChart');

     // Kontrollera skärmens bredd
     const screenWidth = window.innerWidth;

     // Bestäm om x-axeln ska visas beroende på skärmens bredd
     let xAxisDisplay = true;
     if (screenWidth < 600) {
         xAxisDisplay = false;
     }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: courseNameAdjusted,
            datasets: [{
                label: 'Mest sökta kurser',
                data: applicantsTotals,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        // Ta bort , mellan orden i kursnamn vid hovring på stapel
                       title: (context) => {
                        return context [0].label.replaceAll(',', ' '); 
                       }     
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true // Y-axeln börjar vid noll
                },
                x: {
                    ticks: {
                        autoSkip: false,
                        display: xAxisDisplay // Kontrollera om x-axeln ska visas eller inte
                    }
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
    data = data.slice(0, 5);

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
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
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