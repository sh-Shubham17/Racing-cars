let racingCars = [];
window.addEventListener("load", () => {
  racingCars = String(sessionStorage.getItem("stringOfCars")).split(",");
  console.log(racingCars);
  let obj = document.getElementById("insert");
  let s = "";
  for (let i = 0; i < 3; i++) {
    s += `<img class="car" id="car${i + 1}" src="${racingCars[i]}">`;
    console.log(racingCars[i]);
  }
  obj.innerHTML = s;
  console.log(s);
});
