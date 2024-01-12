let stopwatch;
let laps = [];
let lapCounter = 1;

function startStopwatch() {
    stopwatch = setInterval(updateStopwatch, 10);
    document.getElementById("start").disabled = true;
}

function stopStopwatch() {
    clearInterval(stopwatch);
    document.getElementById("start").disabled = false;
}

function resetStopwatch() {
    clearInterval(stopwatch);
    document.getElementById("start").disabled = false;
    laps = [];
    lapCounter = 1;
    updateDisplay(0, 0, 0, 0);
    updateLapsList();
}

function updateStopwatch() {
    let hr = parseInt(document.getElementById("hr").textContent);
    let min = parseInt(document.getElementById("min").textContent);
    let sec = parseInt(document.getElementById("sec").textContent);
    let count = parseInt(document.getElementById("count").textContent);

    count++;

    if (count === 100) {
        count = 0;
        sec++;
    }

    if (sec === 60) {
        sec = 0;
        min++;
    }

    if (min === 60) {
        min = 0;
        hr++;
    }

    updateDisplay(hr, min, sec, count);
}

function updateDisplay(hr, min, sec, count) {
    document.getElementById("hr").textContent = padZero(hr);
    document.getElementById("min").textContent = padZero(min);
    document.getElementById("sec").textContent = padZero(sec);
    document.getElementById("count").textContent = padZero(count);
}

function addLap() {
    let hr = document.getElementById("hr").textContent;
    let min = document.getElementById("min").textContent;
    let sec = document.getElementById("sec").textContent;
    let count = document.getElementById("count").textContent;

    let lapTime = `${padZero(hr)}:${padZero(min)}:${padZero(sec)}.${padZero(count)}`;
    laps.push({ lap: lapCounter, time: lapTime });
    lapCounter++;

    updateLapsList();
}

function updateLapsList() {
    const lapsList = document.getElementById("lapsList");
    lapsList.innerHTML = "";

    laps.forEach((lap) => {
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lap.lap}: ${lap.time}`;
        lapsList.appendChild(lapItem);
    });
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}
