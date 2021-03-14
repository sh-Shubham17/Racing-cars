let racingCars = [];
window.addEventListener("load", () => {
  racingCars = String(sessionStorage.getItem("stringOfCars")).split(",");
  console.log(racingCars);
  let obj;
  let s = "";
  for (let i = 0; i < 3; i++) {
    obj = document.getElementById(`CAR${i + 1}`);
    s = `<img class="car" id="car${i + 1}" src="${racingCars[i]}">`;
    obj.innerHTML = s;
    console.log(s);
  }
});
