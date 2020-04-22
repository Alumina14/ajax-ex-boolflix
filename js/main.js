
$( document ).ready(function() {

$('#eventoCerca').click(function(){
  var valoreRicerca = $('#salvaInput').val();
  console.log(valoreRicerca);

$.ajax({

url : "https://api.themoviedb.org/3/search/movie",
method : "GET",
success : function(data){
console.log(data);
},
data : {
api_key: "fba92fa8cc03a5738e0af3d216284ae4",
language: "it-IT",
query: valoreRicerca,
},
error : function (error){
alert("Errore nell'ottenere l'api ");
}

});
});
});
