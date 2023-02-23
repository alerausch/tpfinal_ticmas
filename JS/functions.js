// Loader
$(window).load(function () {
  $(".loader").fadeOut(1500);
});

// Objeto global para almacenar datos de la persona
let person = {};

// Array para almacenar porcentajes variables de habilidades de la persona
let percents = [];
let language_percents = [];

// Obtengo datos aleatorios
$.ajax({
  url: "https://randomuser.me/api/",
  dataType: "json",
  success: function (data) {
    console.log(data.results[0]);
    person = data.results[0];
    loadPersonData();
  },
});

// Genera numeros al azar entre un min y un max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// Selecciona un elemento de la clase pasada por parámetro
function _$(selector, parent = document) {
  return parent.querySelector(selector);
}

// Selecciona todos los elementos de la clase pasado por parámetro
function _$all(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

// Añade el botón ir arriba
window.addEventListener("scroll", (event) => {
  if (screen.width > 1024) {
    if (window.scrollY >= 100) {
      if (!_$(".arrow-button")) {
        const btn = document.createElement("button");
        btn.classList.add("btn", "arrow-button");
        btn.type = "button";
        btn.onclick = () => {
          document.body.scrollIntoView({
            behavior: "smooth",
          });
        };
        btn.innerHTML = `<span">Ir arriba</span>`;
        _$(".container").appendChild(btn);
      }
    } else {
      if (_$(".arrow-button")) {
        _$(".arrow-button").remove();
      }
    }
  }
});

// Carga de datos al documento
function loadPersonData() {
  document.getElementById("first-name").innerHTML =
    person.name.first.toUpperCase();
  document.getElementById("last-name").innerHTML =
    person.name.last.toUpperCase();
  document.getElementById("img-person").src = person.picture.large;
  document.getElementById("profession").innerHTML =
    "Profesión - Especialidades";
  document.getElementById("date-city").innerHTML =
    person.location.country + " / " + person.dob.date.substring(0, 10);
  document.getElementById("address").innerHTML =
    person.location.street.name + ", " + person.location.street.number;
  document.getElementById("phone").innerHTML =
    '<i class="fa-solid fa-phone"></i>' + "&nbsp&nbsp" + person.cell;
  document.getElementById("email").innerHTML =
    '<i class="fa-solid fa-envelope"></i>' + "&nbsp&nbsp" + person.email;

  const skill_list = _$all("#skill-percent");
  const skill_list_nmbr = _$all("#skill-nmbr");
  const lang_list = _$all("#language-percent");
  const level_list = _$all("#level");

  for (let i = 0; i < 4; i++) {
    percents.push(getRandomInt(40, 100));
    console.log(percents[i]);
  }

  for (let i = 0; i < 2; i++) {
    language_percents.push(getRandomInt(50, 90));
    console.log(percents[i]);
  }

  skill_list.forEach(function (currentValue, currentIndex) {
    let a = `${percents[currentIndex]}%`;
    currentValue.style.width = a;
  });

  skill_list_nmbr.forEach(function (currentValue, currentIndex) {
    currentValue.innerHTML = percents[currentIndex] + "%";
  });

  lang_list.forEach(function (currentValue, currentIndex) {
    console.log(
      "Indice del forEach: " + currentIndex,
      "Valor del array: " + language_percents[currentIndex - 1]
    );
    if (currentIndex != 0) {
      currentValue.innerHTML =
        "<h1>" +
        language_percents[currentIndex - 1] +
        '<span id="percent"> %</span></h1>';
    }
  });

  level_list.forEach(function (currentValue, currentIndex) {
    if (currentIndex != 0){
      if (language_percents[currentIndex -1] < 80) {
        currentValue.innerHTML = "Nivel intermedio";
      } else {
        currentValue.innerHTML = "Nivel avanzado";
      }
    }
  });
}
