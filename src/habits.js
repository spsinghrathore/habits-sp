document.addEventListener("DOMContentLoaded", () => {
  const habits = document.querySelectorAll(".habit-row");

  // Initialize habits state from localStorage
  const today = new Date().toLocaleDateString();
  const habitState = JSON.parse(localStorage.getItem("habitState")) || {};
  if (habitState.date !== today) {
    // Reset progress for a new day
    habits.forEach((habit) => {
      const habitId = habit.dataset.habitId;
      habitState[habitId] = { progress: 0, completed: false };
    });
    habitState.date = today;
    localStorage.setItem("habitState", JSON.stringify(habitState));
  }

  // Restore progress and add functionality
  habits.forEach((habit) => {
    const habitId = habit.dataset.habitId;
    const progressBar = habit.querySelector(".progress-bar");
    const startBtn = habit.querySelector(".start-btn");
    const checkbox = habit.querySelector(".habit-checkbox");

    const habitData = habitState[habitId];

    // Restore progress
    if (habitData.completed) {
      progressBar.style.width = "100%";
      checkbox.checked = true;
      checkbox.disabled = false;
      startBtn.disabled = true;
    } else {
      progressBar.style.width = `${habitData.progress}%`;
    }

    // Add click event to Start button
    startBtn.addEventListener("click", () => {
      let progress = habitData.progress;
      startBtn.disabled = true;
      const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;

        if (progress >= 100)
          //
         {
          clearInterval(interval);
          checkbox.checked = true;
          checkbox.disabled = false;
          habitData.completed = true;
          habitData.progress = 100;
          localStorage.setItem("habitState", JSON.stringify(habitState));
        }
      }, 3000); // Progress bar updates every 100ms
    });
  });
});

