// DOM Elements
const startButton = document.getElementById("startTimer");
const timerInput = document.getElementById("timerInput");
const progressBar = document.getElementById("progressBar");
const commitCheckbox = document.getElementById("commitCheckbox");
const streakCounter = document.getElementById("streakCounter");

// Variables
let timerInterval;
let streak = localStorage.getItem("streak") ? Number(localStorage.getItem("streak")) : 0;
let lastCompletedDate = localStorage.getItem("lastCompletedDate");

// Initialize Streak
document.getElementById("streakCounter").textContent = streak;

// Check for Daily Reset
const today = new Date().toLocaleDateString();
if (lastCompletedDate && lastCompletedDate !== today) {
  streak = 0; // Reset streak if missed
  localStorage.setItem("streak", streak);
  streakCounter.textContent = streak;
}

// Start Timer Functionality
startButton.addEventListener("click", () => {
  const minutes = parseInt(timerInput.value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid number of minutes!");
    return;
  }

  let totalTime = minutes * 60; // Convert to seconds
  let elapsed = 0;

  // Reset Progress Bar
  progressBar.style.width = "0%";
  commitCheckbox.checked = false;

  // Start Timer
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    elapsed++;
    const progress = (elapsed / totalTime) * 100;
    progressBar.style.width = `${progress}%`;

    if (elapsed >= totalTime) {
      clearInterval(timerInterval);
      commitCheckbox.checked = true;
      commitCheckbox.disabled = false;
      incrementStreak();
    }
  }, 1000);
});

// Increment Streak
function incrementStreak() {
  streak++;
  streakCounter.textContent = streak;
  localStorage.setItem("streak", streak);
  localStorage.setItem("lastCompletedDate", today);
}

// Daily Reset
function resetDaily() {
  if (new Date().toLocaleDateString() !== today) {
    streak = 0;
    streakCounter.textContent = streak;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCompletedDate", new Date().toLocaleDateString());
  }
}
