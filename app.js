var $champs = document.getElementById("champs");
var $bouton = document.getElementById("bouton");
var $ajouter = document.getElementById("ajouter");
var $resultatRecherche = document.getElementById("resultatRecherche");
var $liste = document.getElementById("liste");

var $prenom = document.getElementById("prenom");
var $nom = document.getElementById("nom");
var $numero = document.getElementById("numero");
var $age = document.getElementById("age");
var $ageMoyen = document.getElementById("ageMoyen");

annuaire = [{
  prenom: "Fab",
  nom: "Oger",
  numero: "0606060601",
  age: 18
},{
  prenom: "Nao",
  nom: "Ventura",
  numero: "0606060602",
  age: 21
},{
  prenom: "Julie",
  nom: "Garnier",
  numero: "0606060603",
  age: 29
}];

function afficherList(){
  elements = "";
  _.each(annuaire, function(contact, index) {
    elements += "<li class='list-group-item'><div><span id='update-"+ index +"'class='glyphicon glyphicon-pencil pull-left' aria-hidden='true'></span><img src='img/ios7-contact-outline.png' width='50' height='50'>" + contact.prenom + " " + contact.nom + " " + contact.numero + " " + contact.age + "<span id='user-"+ index +" 'class='glyphicon glyphicon-remove pull-right' aria-hidden='true'></span><div class='clear'></div></div><div id='showUpdate-"+ index +"'class='updateContact'><form type='post' action='#' class='input-group'><input id='prenom' type='text' placeholder='Prenom' class='form-control' required><input id='nom' type='text' placeholder='Nom' class='form-control' required><input id='numero' type='text' placeholder='Numero' class='form-control' required><input id='age' type='number' placeholder='Age' class='form-control' required><input id='sendUpdate-"+ index +"' type='submit' class='form-control btn btn-primary'></form></div></li>";
  });
  $liste.innerHTML = elements ;
}

function addList(){
  if(idUpdate > annuaire.length){
    annuaire.push({prenom: $prenom.value, nom: $nom.value, numero: $numero.value, age: $age.value});
    $prenom.value = "";
    $nom.value = "";
    $numero.value = "";
    $age.value = "";
    afficherList();
    ageMoyen();
    saveLocal();
  }
  else if(idUpdate <= annuaire.length){
    annuaire[idUpdate].prenom = $prenom.value;
    annuaire[idUpdate].nom = $nom.value;
    annuaire[idUpdate].numero = $numero.value;
    annuaire[idUpdate].age = $age.value;
    $prenom.value = "";
    $nom.value = "";
    $numero.value = "";
    $age.value = "";
    afficherList();
    ageMoyen();
    saveLocal();
    idUpdate = annuaire.length + 1;
  }
}

function texteContact(contact) {
  return "<li class='list-group-item'><img src='img/ios7-contact-outline.png' width='50' height='50'>" + contact.prenom + " " + contact.nom  + " " + contact.numero + " " + contact.age + " </li>";
}

function rechercheContact(){
  if($champs.value != "") {
    elm = "";
    _.each(annuaire, function(contact){
      recherche = new RegExp($champs.value, "i");
      if (recherche.test(contact.prenom) || recherche.test(contact.nom) || recherche.test(contact.numero) || recherche.test(contact.age)) {
        elm += texteContact(contact);
        $resultatRecherche.innerHTML = elm;
      };
    })
  }
  else {
    $resultatRecherche.innerHTML = "";
  }
}

function select(e){
  tag = e.target;
  idTag = tag.id.split("-")[1];
  if (tag.id.split("-")[0] == "user" && idTag <= annuaire.length){
    annuaire.splice(idTag, 1);
    afficherList();
    saveLocal();
  }
  else if (tag.id.split("-")[0] == "update"){
    $prenom.value = (annuaire[idTag].prenom);
    $nom.value = (annuaire[idTag].nom);
    $numero.value = (annuaire[idTag].numero);
    $age.value = (annuaire[idTag].age);
    idUpdate = idTag;
  }
}

function ageMoyen() {
  resultat = _.reduce(annuaire, function(sommeAge, contact){
    return sommeAge + parseInt(contact.age);
  }, 0);
  resultat /= annuaire.length;
  resultat = Math.round(resultat);
  $ageMoyen.innerHTML = resultat;
}

function saveLocal() {
  localStorage.setItem("saveAnnuaire", JSON.stringify(annuaire));
}

function recupLocal(){
  annuaire = JSON.parse(localStorage.getItem("saveAnnuaire"));
}

recupLocal();
afficherList();
ageMoyen();

idUpdate = annuaire.length + 1;

$ajouter.onclick = addList;
$champs.onkeyup = rechercheContact;
$liste.onclick = select
