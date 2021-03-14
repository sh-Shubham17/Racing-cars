let flag = 0;
let carImages = [];

function storeValue(value, id) {
  let item = document.getElementById(id);
  if (item.checked === true) {
    if (flag < 3) {
      carImages.push(value);
      flag++;
    }
  } else {
    carImages = carImages.filter((image) => {
      return image !== value;
    });
    flag--;
  }
  let obj = document.getElementById("button");
  if (flag === 3) {
    obj.disabled = "";
    obj.style.opacity = 1;
  } else {
    obj.disabled = "";
    obj.style.opacity = 0.6;
  }
  console.log(carImages);
}
function handleSubmit() {
  document.getElementById("Background-music").pause();
  sessionStorage.setItem("stringOfCars", carImages);
  return;
}
$(document).ready(function () {
  $("input[type=checkbox]").change(function (e) {
    if ($("input[type=checkbox]:checked").length > 3) {
      $(this).prop("checked", false);
      alert("allowed only 3");
    } else {
      $('input[type="submit"]').removeAttr("disabled");
    }
  });
});
window.addEventListener("pageshow", function (event) {
  var historyTraversal =
    event.persisted ||
    (typeof window.performance != "undefined" &&
      window.performance.navigation.type === 2);
  if (historyTraversal) {
    // Handle page restore.
    window.location.reload();
  }
});
const button = document.querySelector("#button2");
const icon = document.querySelector("#button2 > i");
const audio = document.querySelector("#Background-music");

button.addEventListener("click", () => {
  if (audio.paused) {
    audio.volume = 0.2;
    audio.play();
    icon.classList.remove("fa-volume-mute");
    icon.classList.add("fa-volume-up");
  } else {
    audio.pause();
    icon.classList.add("fa-volume-mute");
    icon.classList.remove("fa-volume-up");
  }
  button.classList.add("fade");
});
