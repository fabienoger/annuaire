var $champs = document.getElementById("champs");
var $bouton = document.getElementById("bouton");
var $ajouter = document.getElementById("ajouter");
var $resultatRecherche = document.getElementById("resultatRecherche");
var $liste = document.getElementById("liste");

var $prenom = document.getElementById("prenom");
var $nom = document.getElementById("nom");
var $numero = document.getElementById("numero");

annuaire = [{
  prenom: "Fab",
  nom: "Oger",
  numero: "0606060601"
},{
  prenom: "Nao",
  nom: "Ventura",
  numero: "0606060602"
}];

function afficherList(){
  elements = "";
  _.each(annuaire, function(contact) {
    elements += "<li class='list-group-item'><img src='img/ios7-contact-outline.png' width='50' height='50'>" + contact.prenom + " " + contact.nom + " " + contact.numero + "</li>";
  });
  $liste.innerHTML = elements ;
}

function addList(){
  annuaire.push({prenom: $prenom.value, nom: $nom.value, numero: $numero.value});
  afficherList();
}

afficherList();

$ajouter.onclick = addList;
