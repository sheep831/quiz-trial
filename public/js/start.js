let quiz = 11; // Countdown time in minutes
let intervalId;
let remainingTime = quiz * 60 * 1000;

document.getElementById("timer").innerHTML = formatTime(remainingTime);

function startTimer() {
  intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  remainingTime -= 1000;
  if (remainingTime <= 0) {
    clearInterval(intervalId);
    document.getElementById("timer").innerHTML = "Time's up!";
  } else {
    document.getElementById("timer").innerHTML = formatTime(remainingTime);
  }
}

function formatTime(milliseconds) {
  let totalSeconds = Math.ceil(milliseconds / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  return (
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
}

startTimer();
