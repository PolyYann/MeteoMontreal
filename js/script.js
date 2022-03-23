

//Constantes
const froid = 0;
const pluie = 10;
const nuage = 20;
const tempTab = [{ desc: "Froid, chance de neige", image: "../images/neige.png" },
{ desc: "Précipitaion Pluie", image: "../images/pluie.png" },
{ desc: "Nuageux", image: "../images/nuage.png" }, { desc: "Ensoleillé", image: "../images/soleil.png" }];
const mois = ["Mois", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]

//function fetch global + affichage des écrans
function initialiserPage(nbrJour) {
    fetch('../data/temperatures_2022.json')
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            var donneeTemp = data.temperatures;
            ajoutPrevisionJournaliere(donneeTemp);
            if (nbrJour > 0) {
                ajoutCard(nbrJour, donneeTemp);
            }
        });
}
//Initialisation du haut de la fenetre (Temperature journalière) sur toutes les pages
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
    let weekDay = formatDateAffichage(donneeTemp[indexJour].DateDuJour)
    //Mise à jour des données journalière
    jour.innerText = weekDay
    temperature.innerHTML = ("Maintenant: " + donneeTemp[indexJour].Temp)
    tempMax.innerText = ("Max: " + donneeTemp[indexJour].MaxTemp)
    tempMin.innerHTML = ("Min: " + donneeTemp[indexJour].MinTemp)
    imageJour.setAttribute("src", getImage(donneeTemp[indexJour].Temp))
}

// Ajout des cartes de prévisions météo 3, 7 et 14 jours
function ajoutCard(nbrJour, donneeTemp) {

    //Date du jour
    tmpJour = new Date();
    //Index DB de la journee courante
    let indexJour = rechercheIndexJour(donneeTemp, tmpJour)
    //Tableau d'objet nom=carte
    let tableCarte = document.getElementsByName("carte")
    // index du nombre d'itération
    let indexFin = indexJour + nbrJour + 1

    let tailleCarte = "width: 100%"

    for (let index = indexJour + 1; index <= indexFin; index++) {
        //référence de la carte modifié chaque ittération
        let card = tableCarte[index - indexJour - 1]

        creerCarte(donneeTemp, index, card, tailleCarte)
    }
}

// Création des cartes pour ajout dans les fonctions ajoutCard et statistiqueMois
function creerCarte(donneeTemp, indexJour, card, tailleCarte) {
    // ajouter date
    let weekDay = formatDateAffichage(donneeTemp[indexJour].DateDuJour)
    let divDay = document.createElement("div")
    divDay.setAttribute("class", "h6 card-header bg-dark text-light text-center")
    divDay.setAttribute("style", tailleCarte)
    divDay.innerHTML = weekDay

    // ajouter Max Temperature
    let divMax = document.createElement("div")
    divMax.setAttribute("class", "h6 bg-warning text-danger text-center")
    divMax.setAttribute("style", tailleCarte)
    divMax.innerHTML = donneeTemp[indexJour + 1].MaxTemp
    // ajouter Minumum temperature
    let divMin = document.createElement("div")
    divMin.setAttribute("class", "h6 bg-info text-light text-center")
    divMin.setAttribute("style", tailleCarte)
    divMin.innerHTML = donneeTemp[indexJour + 1].MinTemp
    // ajouter Image
    let divImage = document.createElement("div")
    divImage.setAttribute("style", "width:50")
    let image = document.createElement("img")
    image.setAttribute("src", getImage(donneeTemp[indexJour + 1].Temp))
    image.setAttribute("class", "card-footer bg-light")
    image.setAttribute("style", tailleCarte)

    // Construction de la carte avant de la retourner
    divImage.appendChild(image)
    card.appendChild(divDay)
    card.appendChild(divMax)
    card.appendChild(divMin)
    card.appendChild(divImage)
    return card
}

//Retour d'une image en fonction de la température recu en argument
function getImage(temp) {

    if (temp <= froid) {
        return tempTab[0].image
    } else if (temp <= pluie) {
        return tempTab[1].image
    } else if (temp < nuage) {
        return tempTab[2].image
    } else {
        return tempTab[3].image
    }
}

function emplirMois() {
    //parent
    let liste = document.getElementById("menuMois")
    //recuperer la taille
    let taille = liste.children.length
    if (taille == 0) {
        //enfant
        for (let index = 0; index < mois.length; index++) {
            let opt = document.createElement("option");
            opt.textContent = mois[index];
            liste.appendChild(opt);
        }
    }
    var valueMois = liste.options[liste.selectedIndex].index - 1;
    console.log(valueMois)
    return valueMois

}


// Recherche sequentiel de la BD pour trouvé l'index de la date du jour
function rechercheIndexJour(tableTemp, tmpJour) {

    var index = 0;
    var flag = false;
    //Formatage de la date en au même format que la BD
    tmpJour = formatDateRecherche(tmpJour);
    while (index < tableTemp.length && flag == false) {
        //Date de la BD à l'index
        tmpDate = (tableTemp[index].DateDuJour);
        if (tmpDate == tmpJour) {
            flag = true;
        }
        index++;
    }
    return index
}
// Retourbe la date en format d'affichage du site
function formatDateAffichage(tmpDate) {

    return date = new Date(tmpDate).toLocaleString
        ('fr-CA', { weekday: 'long', day: '2-digit' });
}
// Retourne la date en format court pour la recherche
function formatDateRecherche(tmpDate) {

    return date = new Date(tmpDate).toLocaleString
        ('fr-CA', { dateStyle: 'short' });
}
// Retourne le nombre de jours dans le mois
function joursDansMois(mois) {

    var annee = dateMois.getFullYear();
    let joursMois = new Date(annee, mois + 1, 0).getDate();
    return joursMois
}

// Retourne la date en format mois(text), année
function formatMoisCalendrier(dateMois) {
    let tmp = new Date(dateMois).toLocaleString
        ('fr-CA', { month: 'long', year: 'numeric' });
    return tmp
}

function statistiqueMois(mois) {

    fetch('../data/temperatures_2022.json')
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            var donneeTemp = data.temperatures;
            
            dateMois = new Date();
            //Modifier la date au mois selectionné
            if (mois != -1) {
                dateMois.setMonth(mois);
                
            }
            //Remettre la date au premier jour du mois
            dateMois.setDate(1);

            // Afficher le mois selectionné
            let enteteMois = document.getElementById("previsionMois")
            enteteMois.innerHTML = ("Statistiques du mois de " + formatMoisCalendrier(dateMois))

            //Rechercher l'index du premier jour du mois
            let indexJour = rechercheIndexJour(donneeTemp, dateMois)

            //Nombre de jours dans 1 mois
            let joursMois = joursDansMois(mois)
            let journeeGraph = []
            let moyGraph = []
            let minGraph = []
            let maxGraph = []
            let indexDernierJour = indexJour + joursMois
            let jour = indexDernierJour - indexDernierJour + 1
            //Élément parent du calendrier du mois
            let parent = document.getElementById("calendrier")
            //Vider le calendrier du mois
            while (parent.hasChildNodes()) {
                parent.removeChild(parent.firstChild)
            }
            for (indexJour; indexJour < indexDernierJour; indexJour++) {
                // Remplissage des tables pour affichage graph
                journeeGraph.push(jour)
                minGraph.push(donneeTemp[indexJour].MinTemp)
                maxGraph.push(donneeTemp[indexJour].MaxTemp)
                moyGraph.push((donneeTemp[indexJour].MinTemp + donneeTemp[indexJour].MaxTemp) / 2)
                jour++

                // Creation des cartes du calendrier
                let tailleCarte = "width: 120px"
                let card = document.createElement("card")
                card.setAttribute("class", "tailleCarteCal")

                parent.appendChild(creerCarte(donneeTemp, indexJour, card, tailleCarte))
            }
            trouverMax(maxGraph)
            trouverMin(minGraph)
            trouverMoy(moyGraph)
            newChart(journeeGraph, moyGraph, minGraph, maxGraph)
        });
}
function trouverMax(tableauMax){
    let maximum =0;
    for(let i =0;i<tableauMax.length;i++){
        if(i==0){
            maximum = tableauMax[i]
        }else{
            if(tableauMax[i]> maximum){
                maximum= tableauMax[i]
            }
        }
    }
    let affMax =document.getElementById("maximum")
    affMax.innerHTML= maximum
}
function trouverMin(tableauMin){
    let minimum =0;
    for(let i =0;i<tableauMin.length;i++){
        if(i==0){
            minimum = tableauMin[i]
        }else{
            if(tableauMin[i]< minimum){
                minimum= tableauMin[i]
            }
        }
    }
    let affMin = document.getElementById("minimum")
    affMin.innerHTML = minimum
}

function trouverMoy(tableauMoy){
    let somme =0
    for(let i =0;i<tableauMoy.length;i++){
        somme += tableauMoy[i]
    }
   
    let moyenne = (somme/tableauMoy.length).toFixed(1)
    let affMoy = document.getElementById("moyenne")
    affMoy.innerHTML = moyenne
}

function newChart(journeeGraph, moyGraph, minGraph, maxGraph) {
    
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: journeeGraph,
            datasets: [{
                label: "Températures moyennes",
                data: moyGraph,
                backgroundColor: "gray",

                fill: false
            }, {
                label: "Températures minimal",
                data: minGraph,
                backgroundColor: "blue",
                fill: false
            }, {
                label: "Températures maximal",
                data: maxGraph,
                backgroundColor: "red",
                fill: false
            }]
        },
        options: {
            layout: {
                padding: 10
            },animation: false,

            legend: {
                display: true
            }
        }
    });

}


