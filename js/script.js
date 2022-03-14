
// Exemple de fonction Fetch
// function lireJson() {
//     fetch('../data/temperatures_2022.json')
//         .then(function (reponse) {
//             return reponse.json();
//         })
//     .then(function (data) {
//       var  donneeTemp = data.temperatures;
//     });
// }

//Question prof.:   fetch/then utilisation
//                  usage de javascript pour créer la page vs html
//                  initialisation du owl carousel
//                  dédoublage des cartes

//Constantes
const froid = 0;
const pluie = 10;
const nuage = 20;

// Ajout des cartes de prévisions météo
function ajoutCard(nbrJour) {
    fetch('../data/temperatures_2022.json')
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            //Table de la DB      
            var donneeTemp = data.temperatures;
            //Index DB de la journee courante
            let indexJour = rechercheIndexJournee()
            // console.log(indexJour)
            //Tableau d'objet nom=carte
            let tableCarte = document.getElementsByName("carte")
            // console.log(tableCarte.length)
            // index du nombre d'itération
            let indexFin = indexJour + tableCarte.length
            // console.log(indexFin)
            //parent
           // let parent = document.getElementById("parent")
            //carousel
            //let carousel = document.getElementById("parent")
            //carousel.setAttribute("class", "bg-secondary owl-carousel owl-theme container-sm")
            //creer cartes
           
            
            for (let index = indexJour+1; index < indexFin; index++) {
                //référence de la carte modifié chaque ittération
                let card = tableCarte[index-indexJour]
                //carte parent
                //let card = document.createElement("div")
                //card.setAttribute("class", "card")
                
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
            // card.setAttribute("style", "width:150px height")
                //carousel.appendChild(card)
                card.appendChild(divDay)
                card.appendChild(divMax)
                card.appendChild(divMin)
                card.appendChild(divImage)   
            }
            //parent.appendChild(carousel)
        });
}

function ajoutPrevisionJournaliere() {
    //fetch DB des températures journalières
    fetch('../data/temperatures_2022.json')
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            var donneeTemp = data.temperatures;
            var jour = document.getElementById("journalierHeader")
            var temperature = document.getElementById("journalierNow")
            var tempMax = document.getElementById("journalierMax")
            var tempMin = document.getElementById("journalierMin")
            var imageJour = document.getElementById("imageJour")
            // index DB de la journee courante
            let indexJour = rechercheIndexJour(donneeTemp)
            console.log(indexJour)
            //formatage affichage de la journée
            let weekDay = FormatDateAffichage(donneeTemp[indexJour].DateDuJour)
            jour.innerText = weekDay
            jour.setAttribute("class", "h2 bg-dark text-center text-light")
            temperature.textContent = ("Maintenant: " +donneeTemp[indexJour].Temp)
            temperature.setAttribute("class", "h3 bg-info text-center text-light") 
            tempMax.innerText = ("Max: " + donneeTemp[indexJour].MaxTemp)
            tempMax.setAttribute("class", "h3 bg-warning text-center text-danger") 
            tempMin.innerText = ("Min: " + donneeTemp[indexJour].MinTemp)
            tempMin.setAttribute("class", "h3 bg-info text-center text-light")
            imageJour.setAttribute("src", getImage(donneeTemp[indexJour].Temp)) 
        });                
}

//Retour d'une image en fonction de la température recu en argument
function getImage(temp) {
    if (temp <= froid){
       return "../images/neige.png"
    }else if(temp <= pluie){
        return "../images/pluie.png"
    }else if(temp < nuage){
        return "../images/nuage.png"
    }else {
        return "../images/soleil.png"
    }
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

//Retour d'un index indiquant la journéé courrant en jour de l'annee
function rechercheIndexJournee(){

    var date = new Date();
    var nouvelleAns = new Date(date.getFullYear(), 0, 0);
    var difference = date - nouvelleAns;
    var journee = 1000 * 60 * 60 * 24;
    var jour = Math.floor(difference / journee);
    return jour;
}

// Recherche sequentiel de la BD pour trouvé la date du jour
function rechercheIndexJour(tableTemp){

    var index = 0;
    var flag = false;
    //Date du jour
    tmpJour = new Date();
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
