

//Question prof.:   fetch/then utilisation
//                  usage de javascript pour créer la page vs html
//                  initialisation du owl carousel
//                  dédoublage des carte

//Constantes
const froid = 0;
const pluie = 10;
const nuage = 20;
const tempTab = [{desc : "Froid, chance de neige",image : "../images/neige.png"},
    {desc : "Précipitaion Pluie", image :"../images/pluie.png"},
    { desc : "Nuageux", image :"../images/nuage.png" }, {desc : "Ensoleillé", image : "../images/soleil.png"}];
// const mois =["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre", "Décembre"]

//function fetch global + affichage des écrans
function initialiserPage(nbrJour){
    fetch('../data/temperatures_2022.json')
    .then(function (reponse) {
        return reponse.json();
    })
    .then(function (data) {
        var  donneeTemp = data.temperatures;
        ajoutPrevisionJournaliere(donneeTemp);
        if(nbrJour > 0){
            ajoutCard(nbrJour, donneeTemp);
        }        
    });        
}

//Initialisation du haut de la fenetre (Temp journalier) sur toutes les pages
function ajoutPrevisionJournaliere(donneeTemp) {
  
    var jour = document.getElementById("journalierHeader")
    var temperature = document.getElementById("journalierNow")
    var tempMax = document.getElementById("journalierMax")
    var tempMin = document.getElementById("journalierMin")
    var imageJour = document.getElementById("imageJour")
    //Date du jour
    tmpJour = new Date();
    // index DB de la journee courante
    let indexJour = rechercheIndexJour(donneeTemp, tmpJour)
    //formatage affichage de la journée
    let weekDay = FormatDateAffichage(donneeTemp[indexJour].DateDuJour)
    //Mise à jour des données journalière
    jour.innerText = weekDay
    temperature.innerHTML = ("Maintenant: " +donneeTemp[indexJour].Temp)
    tempMax.innerText = ("Max: " + donneeTemp[indexJour].MaxTemp)
    tempMin.innerHTML = ("Min: " + donneeTemp[indexJour].MinTemp)
    imageJour.setAttribute("src", getImage(donneeTemp[indexJour].Temp))             
}


// // Ajout des cartes de prévisions météo
function ajoutCard(nbrJour, donneeTemp) {
  
    //Date du jour
    tmpJour = new Date();
    //Index DB de la journee courante
    let indexJour = rechercheIndexJour(donneeTemp, tmpJour)
    //Tableau d'objet nom=carte
    let tableCarte = document.getElementsByName("carte")
    // index du nombre d'itération
    let indexFin = indexJour + nbrJour + 1

    for (let index = indexJour+1; index <= indexFin; index++) {
        //référence de la carte modifié chaque ittération
        let card = tableCarte[index-indexJour-1]
       
        //ajouter date
        let weekDay = FormatDateAffichage(donneeTemp[index].DateDuJour)
        let divDay = document.createElement("div")
        divDay.setAttribute("class", "h5 card-header bg-dark text-light text-center")
        divDay.innerHTML = weekDay

        // //ajouter Max Temperature
        let divMax = document.createElement("div")
        divMax.setAttribute("class", "h3 bg-warning text-danger text-center")
        divMax.innerHTML = donneeTemp[index].MaxTemp
        // //ajouter Minumum temperature
        let divMin = document.createElement("div")
        divMin.setAttribute("class", "h3 bg-info text-light text-center")
        divMin.innerHTML = donneeTemp[index].MinTemp
        // //ajouter Image
        let divImage = document.createElement("div")
        divImage.setAttribute("class", "card-footer bg-light")
        divImage.setAttribute("style", "width:auto")
        let image= document.createElement("img")
         image.setAttribute("src", getImage(donneeTemp[index].Temp))
        divImage.appendChild(image)
        card.appendChild(divDay)
        card.appendChild(divMax)
        card.appendChild(divMin)
        card.appendChild(divImage)   
    }      
}

//Retour d'une image en fonction de la température recu en argument
function getImage(temp) {
    
    if (temp <= froid){
        return tempTab[0].image
    }else if(temp <= pluie){
        return tempTab[1].image
    }else if(temp < nuage){
        return tempTab[2].image
    }else {
        return tempTab[3].image
    }
}

// Recherche sequentiel de la BD pour trouvé la date du jour
function rechercheIndexJour(tableTemp, tmpJour){

    var index = 0;
    var flag = false;
    
    //Formatage au format de la BD
    tmpJour = FormatDateRecherche(tmpJour);     
    while (index < tableTemp.length && flag == false) {
        //Date de la BD à l'index
        tmpDate = (tableTemp[index].DateDuJour);
        if(tmpDate == tmpJour){
            flag = true;
        }
        index++;
    }        
    return index    
}
//Retour de la date en format d'affichage du site
function FormatDateAffichage(tmpDate){

    return date = new Date(tmpDate).toLocaleString
        ('fr-CA', {  weekday: 'long', day: '2-digit' });
}
// Retour de la date en format court pour la recherche
function FormatDateRecherche(tmpDate){
    
    return date = new Date(tmpDate).toLocaleString
        ('fr-CA', {dateStyle:'short'});
}

// Retour du nombre de jours dans le mois
function joursDansMois(mois){
    var annee = dateMois.getFullYear();
        let joursMois = new Date(annee, mois+1, 0).getDate();
        return joursMois
}

statistiqueMois(7)
function statistiqueMois(mois){
    fetch('../data/temperatures_2022.json')
    .then(function (reponse) {
        return reponse.json();
    })
    .then(function (data) {
        var  donneeTemp = data.temperatures;

        dateMois = new Date();
        //Modifier la date au mois selectionné
        dateMois.setMonth(mois);
        //Remettre la date au premier jour du mois
        dateMois.setDate(1);

        //Rechercher l'index du premier jour du mois
        let indexJour = rechercheIndexJour(donneeTemp, dateMois)-1

        //Nombre de jours dans 1 mois
        let joursMois = joursDansMois(mois)
        let tableTempMois = []
        let journeeGraph = []
        let moyGraph = []
        let minGraph = []
        let maxGraph = []
        let indexDernierJour = indexJour+joursMois
        let jour = indexDernierJour-indexDernierJour+1

        for (indexJour; indexJour < indexDernierJour; indexJour++) {
            
            console.log(donneeTemp[indexJour].DateDuJour)
            tableTempMois.push(donneeTemp[indexJour])
            journeeGraph.push(jour)
            jour++
            minGraph.push(donneeTemp[indexJour].MinTemp)
            maxGraph.push(donneeTemp[indexJour].MaxTemp)
            moyGraph.push((donneeTemp[indexJour].MinTemp+donneeTemp[indexJour].MaxTemp)/2)
        }     
        // console.log(moy)
        
        new Chart("myChart", {
            type: "bar",
            data: {
              labels: journeeGraph,
              datasets: [{
                label: "Températures moyennes",
                data: moyGraph,
                backgroundColor: "gray",
                
                fill: false
              },{
                label: "Températures minimal",
                data: minGraph,
                backgroundColor: "blue",
                fill: false
              },{
                label: "Températures maximal",
                data: maxGraph,
                backgroundColor: "red",
                fill: false
              }]
            },
            options: {
                layout: {
                    padding: 10
                },
                
                legend: {
                    display: true
                }
            }
          });      
    });  
}

