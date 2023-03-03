// -------------------------------------------------------------------------------------------------------------------
// Data from DB
// -------------------------------------------------------------------------------------------------------------------
const user = [
  {
    name: "Kelvin",
    surname: "Wong",
    SID: 500314,
  },
];

const quiz = [
  {
    name: "Let’s play with animals (Chapter I )",
    timeInMinutes: 5,
    credits: 20,
    star: 50,
  },
];
// -------------------------------------------------------------------------------------------------------------------
// Data from DB
// -------------------------------------------------------------------------------------------------------------------

(function loadUserDetails() {
  // load user details to dom
  document.querySelector(".user-info-container").innerHTML =
    /*HTML*/
    `
  <span>${user[0].name} ${user[0].surname}</span><br>
  <span>(${user[0].SID})</span>
  `;
})();

(function loadCourseDetails() {
  document.querySelector(".modal-content-container h2").innerHTML =
    quiz[0].name;
})();

(function loadQuizDetails() {
  // load user details to dom
  document.querySelector(".quiz-star").innerHTML =
    /*HTML*/
    `
  <span>x ${quiz[0].star}</span>
  `;

  document.querySelector(".quiz-credit").innerHTML =
    /*HTML*/
    `
  <span>${quiz[0].credits}</span>
  `;

  document.querySelector(".quiz-time").innerHTML =
    /*HTML*/
    `
  <span>${quiz[0].timeInMinutes}:00</span>
  `;
})();
