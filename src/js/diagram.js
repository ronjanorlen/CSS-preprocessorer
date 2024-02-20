"use strict";
// Stapeldiagram = namn på kurs + totalt antal sökande, 6 mest sökta kurserna
//Cirkeldiagram = 5 mest sökta programmen på miun ht23, namn och program

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

function displayCourses(courses) {
    const coursesEl = document.getElementById("myChart");

    // Loopa igenom och skriv ut
    courses.forEach((course) => {
        coursesEl.innerHTML += `
       <p>${course.name}</p>
       <p>${course.admissionRound}</p>
       <p>${course.applicantsTotal}</p>
        `;
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