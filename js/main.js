
$( document ).ready(function() {

var contOut =  $('.containerOutput');

  // handlebars
var source = $('.cover').html();
var template = Handlebars.compile(source);

$('#eventoCerca').click(function(){
  var valoreRicerca = $('#salvaInput').val();
  console.log(valoreRicerca);

// prima richiesta ajax
$.ajax({

  url : "https://api.themoviedb.org/3/search/movie",
  method : "GET",
  data : {
  api_key: "fba92fa8cc03a5738e0af3d216284ae4",
  language: "it-IT",
  query: valoreRicerca
  },
  success : function(data, stato){
    console.log(data);
    var listaMovie = data.results;
    console.log(listaMovie);
  // richiamo funzione
    coverOutput(listaMovie, "film");
  },
  error : function (richiesta, stato, errore){
    alert("Errore nell'ottenere l'api ");
  }

});


// seconda richiesta ajax serie tv
$.ajax({

url : "https://api.themoviedb.org/3/search/tv",
method : "GET",
data : {
api_key: "fba92fa8cc03a5738e0af3d216284ae4",
language: "it-IT",
query: valoreRicerca
},
success : function(data, stato){
  console.log(data);
  var listaMovie = data.results;
  console.log(listaMovie);
// richiamo funzione
  coverOutput(listaMovie, "tv");

},
error : function (richiesta, stato, errore){
alert("Errore nell'ottenere l'api ");
}

});

});

// funzione genero cover

function coverImg(path) {
  var risultato;

  if(path){
    var url = "https://image.tmdb.org/t/p/w342" + path;
    risultato = '<img src="' + url + '" alt="cover" class="image">';
  } else {
    risultato = '<img src="img/placeholder.png" alt="cover" class="image">';
  }

  return risultato;
}



// funzione cambio lingua
function bandierine(lingue) {

  var images =  ["it", "en"];
  var imgOutput;

  if(images.includes(lingue)){
    imgGenerata = '<img src="img/' + lingue + '.svg" alt="immagine" class="flagresize" >';
    return imgGenerata;
  }
  return lingue;
}

// funzione stelline

function convertoVoto(voto){

  var convVoto = Math.ceil(voto/2);
   var stelline = "";

   for (var i = 0; i <= 5; i++) {
     if (i <= convVoto) {
       stelline += '<i class="fas fa-star"></i>';
     } else {
       stelline += '<i class="far fa-star"></i>';
     }
   }
return stelline;
}

// funzione creazione output oggetti serie tv e movies
function coverOutput(tempCover, tipo){
  for (var i = 0; i < tempCover.length; i++) {
  var risultatoMovie = tempCover[i];

  var titolo, titoloOr;

  if(tipo === "film"){
       titolo = risultatoMovie.title;
       titoloOr = risultatoMovie.original_title;
     } else if (tipo === "tv"){
       titolo = risultatoMovie.name;
       titoloOr = risultatoMovie.original_name;
     }

  //array contenente dati da output
  var content = {
    titolo: titolo,
    titoloOriginale: titoloOr,
    lingua: bandierine(risultatoMovie.original_language),
    voto: convertoVoto(risultatoMovie.vote_average),
    tipoRichiesta: tipo,
    poster: coverImg(risultatoMovie.poster_path)
  };
console.log(content);
  var outHtml = template(content);
  contOut.append(outHtml);
  }
}
});
