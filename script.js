function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemPagebackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  fullElemPagebackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
      document.body.style.overflow = "auto";
    });
  });
}
openFeatures();

function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    // console.log('list is full');

    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task List is Empty");
  }

  function displayTasks() {
    var allTask = document.querySelector(".allTask");
    sum = "";
    currentTask.forEach(function (tasks, index) {
      sum += `<div class="task">
                        <h5>${tasks.task} <span class="${tasks.imp}">Imp</span></h5>
                        <p>${tasks.details}</p>
                        <button id="${index}">Mark as Done</button>
                    </div>`;
    });
    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    let markCompletedbtn = document.querySelectorAll(".task button");

    markCompletedbtn.forEach(function (btn, index) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        // console.log(currentTask);
        displayTasks();
      });
    });
  }
  displayTasks();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #checkbox");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // console.log(taskInput.value, taskDetailsInput.value, taskCheckbox.checked);
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });

    displayTasks();
    // console.log(currentTask);

    form.reset();

    // taskInput.value = "";
    // taskDetailsInput.value = "";
    // taskCheckbox.checked = false;
  });
}
todoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  // console.log(dayPlanData);

  var hours = Array.from(
    { length: 18 },
    (_, index) => `${6 + index}:00 - ${7 + index}:00`
  );

  var wholeDaySum = "";
  hours.forEach(function (time, index) {
    var savedData = dayPlanData[index] || "";

    wholeDaySum += `<div class="day-planner-time">
                <p>${time}</p>
                <input id="${index}" type="text" placeholder="..." value="${savedData}">
              </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInputs = document.querySelectorAll(".day-planner input");
  // console.log(hours);

  dayPlannerInputs.forEach((input) => {
    input.addEventListener("input", () => {
      dayPlanData[input.id] = input.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuotes() {
  var motivationQuoteContent = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    const url = "https://dummyjson.com/quotes/random";
    let response = await fetch(url);
    let data = await response.json();

    // console.log(data);

    motivationQuoteContent.innerHTML = data.quote;
    motivationAuthor.innerHTML = `- ${data.author}`;
  }
  fetchQuote();
}
motivationalQuotes();

function pomodoroTimer() {
  let timerInterval = null;
  let totalSeconds = 25 * 60;
  let workDuration = 25 * 60;
  let breakDuration = 5 * 60;
  let timer = document.querySelector(".pomo-timer h1");
  var startbtn = document.querySelector(".pomo-timer .start-timer");
  var pausebtn = document.querySelector(".pomo-timer .pause-timer");
  var resetbtn = document.querySelector(".pomo-timer .reset-timer");
  var session = document.querySelector(".session");

  var isWorksession = true;

  function updateTime() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorksession) {
      session.innerHTML = "Work Session!";
      session.style.backgroundColor = "var(--green)";

      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          isWorksession = false;
          alert("Work session over! Time for a break.");
          session.innerHTML = "Break Time!";
          session.style.backgroundColor = "var(--blue)";
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          totalSeconds = breakDuration;
          updateTime();
        }
      }, 1000);
    } else {
      session.innerHTML = "Break Time!";
      session.style.backgroundColor = "var(--blue)";

      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTime();
        } else {
          isWorksession = true;
          session.innerHTML = "Work Time!";
          session.style.backgroundColor = "var(--green)";
          alert("Break over! Time to work.");
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";

          totalSeconds = workDuration;
          updateTime();
        }
      }, 1000);
    }
  }
  startbtn.addEventListener("click", startTimer);

  function pauseTimer() {
    clearInterval(timerInterval);
  }
  pausebtn.addEventListener("click", pauseTimer);

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = isWorksession ? workDuration : breakDuration;
    updateTime();

    // Add these lines to update the session display
    if (isWorksession) {
      session.innerHTML = "Work Session!";
      session.style.backgroundColor = "var(--green)";
    } else {
      session.innerHTML = "Break Time!";
      session.style.backgroundColor = "var(--blue)";
    }
  }
  resetbtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

function HeaderDetails() {
  var header1Time = document.querySelector('.header1 h1')
  var header1Date = document.querySelector('.header1 h2')
  var header2Temp = document.querySelector('.header2 h2')
  var header2Condition = document.querySelector('.header2 h4')
  var precipitation = document.querySelector('.header2 .precipitation ')
  var humidity = document.querySelector('.header2 .humidity ')
  var wind = document.querySelector('.header2 .wind ')

  var data = null

  async function weatherAPICall() {
    var apiKey = CONFIG.API_KEY;
    var city = 'Hyderabad'
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    data = await response.json();

    header2Temp.innerHTML = `${data.current.temp_c}°C`
    header2Condition.innerHTML = `${data.current.condition.text}`
    console.log(data.current.precip_mm);

    precipitation.innerHTML = `Precipitation: ${data.current.precip_mm}%`
    humidity.innerHTML = `Humidity: ${data.current.humidity} %`
    wind.innerHTML = `Wind: ${data.current.wind_kph} kph`



  }
  weatherAPICall();


  function timeDate() {
    const totalDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const totalMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var currentDay = totalDays[date.getDay()]
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var currentdate = date.getDate();
    var month = totalMonths[date.getMonth()]; // Months are zero-based
    var year = date.getFullYear();

    // console.log(currentdate, month , year);

    header1Date.innerHTML = `${String(currentdate).padStart(2, '0')} ${month} ${year}`

    if (minutes < 10) {
      minutes = `0${minutes}`
    }

    if (hours > 12) {
      header1Time.innerHTML = `${currentDay}, ${String(hours - 12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} pm`
    } else {
      header1Time.innerHTML = `${currentDay}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} am`
    }

  }
  setInterval(() => {
    timeDate();
  }, 1000);
}
HeaderDetails();

