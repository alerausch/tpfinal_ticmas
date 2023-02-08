// Loader
$(window).load(function() {
    $(".loader").fadeOut(1000);
});

// Variable global para almacenar datos de la persona 
let person = {};

// Obtengo datos aleatorios
$.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      console.log(data.results[0]);
      person = data.results[0];
      loadPersonData();
    }
  });

// Carga de datos al documento 
function loadPersonData(){
    document.getElementById("first-name").innerHTML = person.name.first.toUpperCase();
    document.getElementById("last-name").innerHTML = person.name.last.toUpperCase();
    document.getElementById("img-person").src = person.picture.large;
}
