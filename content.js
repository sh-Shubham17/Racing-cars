let Winner = false;
let stopWatch = document.getElementById("display");
let closeInterval;
let trafficLights = {
  greenLight: document.getElementById("goLight"),
  yellowLight: document.getElementById("waitLight"),
  redLight: document.getElementById("stopLight"),
};
let car1 = {};
let car2 = {};
let car3 = {};
let sound1 = document.getElementById("accelerating");
let sound2 = document.getElementById("runnning");
let automatic = document.getElementById("automatic");
let manual = document.getElementById("manual");
let manualMode = false;
let maxwidth = findWidth();
let controls = {
  moveRight: document.getElementById("move-right"),
  moveLeft: document.getElementById("move-left"),
};
let disableMovingButtons = true;
function myMove() {
  createCarObjects();
  let speed = document.getElementById("choice").value;
  speed = !Number.isInteger(speed) ? 2 : speed;
  reset();
  disableEnableModeControlers("disable");
  let interval_Id;
  let startTime;
  closeInterval = false;
  starting_Race(); //countDown

  setTimeout(() => {
    //setInterval will be set after 3seconds
    if (manualMode) {
      disableEnableMovers("enable");
    } else {
      sound2.play();
    }
    startTime = Date.now();
    sound1.pause();
    interval_Id = setInterval(frame, 10);
  }, 3000);

  function frame() {
    trafficLights.redLight.style.background = "#111";
    trafficLights.yellowLight.style.background = "#111";
    trafficLights.greenLight.style.background = "rgb(59, 248, 11)";
    let elapsedTime = Date.now() - startTime;
    stopWatch.innerHTML = time(elapsedTime);
    if (hasRacefinished(interval_Id, maxwidth)) {
      return;
    }
    car1 = !manualMode ? moveElement(maxwidth, speed, car1) : car1;
    car2 = moveElement(maxwidth, speed, car2);
    car3 = moveElement(maxwidth, speed, car3);
  }
}
function starting_Race() {
  var startsIn = document.getElementById("startsIn");
  trafficLights.redLight.style.background = "#111";
  trafficLights.yellowLight.style.background = "yellow";
  trafficLights.greenLight.style.background = "#111";
  startsIn.innerHTML = " 3";
  setTimeout(() => {
    sound1.play();
    startsIn.innerHTML = "2";
  }, 1000);
  setTimeout(() => {
    startsIn.innerHTML = "1";
  }, 2000);
  setTimeout(() => {
    startsIn.innerHTML = "GO";
  }, 3000);
}

function time(eTime) {
  let diffInMinutes = eTime / (1000 * 60); //minutes
  let mm = Math.floor(diffInMinutes);
  let diffInSeconds = (diffInMinutes - mm) * 60;
  let ss = Math.floor(diffInSeconds);
  let diffInMilliseconds = (diffInSeconds - ss) * 100;
  let milli = Math.floor(diffInMilliseconds);
  mm = mm.toString().padStart(2, "0");
  ss = ss.toString().padStart(2, "0");
  milli = milli.toString().padStart(2, "0");
  return `${mm}:${ss}:${milli}`; //template literals, inplace of this
  //return mm + ":" + ss + ":" + milli; // we can use string also to return output
}
function findWidth() {
  let width;
  if (screen.width > 1000) {
    width = screen.width - 200;
  } else if (screen.width > 700) {
    width = screen.width - 100;
  } else {
    width = screen.width - 80;
  }
  return width;
}

function hasRacefinished(id, maxwidth) {
  if (
    (car1.position >= maxwidth &&
      car2.position >= maxwidth &&
      car3.position >= maxwidth) ||
    closeInterval
  ) {
    sound2.pause();
    clearInterval(id);
    document.getElementById("startsIn").innerHTML = "stop";
    trafficLights.greenLight.style.background = "#111";
    trafficLights.redLight.style.background = "red";
    console.log("interval closed");
    disableEnableMovers("disable");
    disableEnableModeControlers("enable");
    return;
  }
}

function moveElement(maxwidth, speed, item) {
  let { element, Win, position } = item;
  if (position < maxwidth) {
    position += Math.round(Math.random() * speed);
    if (position >= maxwidth) {
      position = maxwidth;
      if (!Winner) {
        Winner = true;
        Win.style.display = "unset";
      }
    }
    element.style.left = position + "px";
  }
  return { element, Win, position };
}

function chooseMode(flag) {
  manualMode = flag;
  if (manualMode) {
    automatic.style.opacity = "0.5";
    manual.style.opacity = "1";
    console.log("show");
    hideOrShowMovers("show");
  } else {
    automatic.style.opacity = "1";
    manual.style.opacity = "0.5";
    hideOrShowMovers("hide");
  }
}
function createCarObjects() {
  car1 = {
    name: "car1",
    element: document.getElementById("car1"),
    Win: document.getElementById("car1win"),
    position: 0,
  };
  car2 = {
    name: "car2",
    element: document.getElementById("car2"),
    Win: document.getElementById("car2win"),
    position: 0,
  };
  car3 = {
    name: "car3",
    element: document.getElementById("car3"),
    Win: document.getElementById("car3win"),
    position: 0,
  };
}
function reset() {
  Winner = false;
  sound1.pause();
  sound2.pause();
  closeInterval = true;
  document.getElementById("display").innerHTML = "00:00:00";
  car1.element.style.left = 0 + "px";
  car1.Win.style.display = "none";
  car1.position = 0;
  car2.element.style.left = 0 + "px";
  car2.Win.style.display = "none";
  car2.position = 0;
  car3.element.style.left = 0 + "px";
  car3.Win.style.display = "none";
  car3.position = 0;
  closeInterval = true;
  disableEnableMovers("disable");
  stopCar();
}
function disableEnableMovers(action) {
  let { moveRight, moveLeft } = controls;
  if (action == "disable") {
    moveRight.disabled = true;
    moveLeft.disabled = true;
    disableMovingButtons = true;
  } else if (action == "enable") {
    moveRight.disabled = false;
    moveLeft.disabled = false;
    console.log("enabled");
    disableMovingButtons = false;
  }
}
function hideOrShowMovers(action) {
  let controls = document.getElementsByClassName("moving-buttons"); //array
  let instruction = document.getElementById("instruction");
  if (action == "hide") {
    controls[0].style.display = "none";
    instruction.style.display = "none";
  } else if (action == "show") {
    controls[0].style.display = "unset";
    instruction.style.display = "unset";
  }
}
function disableEnableModeControlers(action) {
  if (action == "disable") {
    automatic.disabled = true;
    manual.disabled = true;
  } else {
    automatic.disabled = false;
    manual.disabled = false;
  }
}
let moveId;
function accelerateCar(direction) {
  if (!disableMovingButtons) {
    moveId = setInterval(moveManualCar, 10, direction);
  }
}
function moveManualCar(direction) {
  speed = 1.2;
  sound2.play();
  let { element, Win, position } = car1;
  //console.log(position);
  if (position < maxwidth) {
    if (direction == "right") {
      position += speed;
    } else {
      position -= speed;
    }

    if (position >= maxwidth) {
      position = maxwidth;
      if (!Winner) {
        Winner = true;
        Win.style.display = "unset";
      }
      stopCar();
    } else if (position <= 0) {
      position = 0;
    }
    element.style.left = position + "px";
  }
  car1 = { element, Win, position };
}
function stopCar() {
  sound2.pause();
  clearInterval(moveId);
  console.log("stoping car1...");
  console.log("stoped car1...");
}
