

function lireJson() {
    // fetch('../data/temperatures_2022.json')
    //     .then(function (reponse) {
    //         return reponse.json();
    //     })
    // .then(function (data) {
    //   var  donneeTemp = data.temperatures;
    //   return donneeTemp;
    // });
}
//var donneTemp = lireJson()


function ajoutCard(nbrJour) {
    fetch('../data/temperatures_2022.json')
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            //Table de la DB      
            var donneeTemp = data.temperatures;
            //Index DB de la journee courante
            let indexJour = indexJourneeCourante()
            //Tableau d'objet nom=carte
            let tableCarte = document.getElementsByName("carte")
            
            //parent
           // let parent = document.getElementById("parent")
            //carousel
            //let carousel = document.getElementById("parent")
            //carousel.setAttribute("class", "bg-secondary owl-carousel owl-theme container-sm")
            //creer cartes
           
            
            for (let index = indexJour+1; index < (indexJour + tableCarte.length); index++) {
                //référence de la carte modifié chaque ittération
                let card = tableCarte[index-indexJour]
                //carte parent
                //let card = document.createElement("div")
                //card.setAttribute("class", "card")
                
                //ajouter date
                let weekDay = formaterDate(donneeTemp[index].DateDuJour)
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
            card.setAttribute("style", "width:150px height")
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
            // index DB de la journee courante
            let indexJour = indexJourneeCourante()
            console.log(indexJour)
            //formatage affichage de la journée
            let weekDay = formaterDate(donneeTemp[indexJour].DateDuJour)
            jour.innerText = weekDay
            jour.setAttribute("class", "h2 bg-dark text-center text-light")
            temperature.textContent = ("Maintenant: " +donneeTemp[indexJour].Temp)
            temperature.setAttribute("class", "h3 bg-info text-center text-light") 
            tempMax.innerText = ("Max: " + donneeTemp[indexJour].MaxTemp)
            tempMax.setAttribute("class", "h3 bg-warning text-center text-danger") 
            tempMin.innerText = ("Min: " + donneeTemp[indexJour].MinTemp)
            tempMin.setAttribute("class", "h3 bg-info text-center text-light") 
        });                
}

//Retour d'une image en fonction de la température recu en argument
function getImage(temp) {
    if (temp <= 0){
       return "../images/neige.png"
    }else if(temp<= 10){
        return "../images/pluie.png"
    }else if(temp<20){
        return "../images/nuage.png"
    }else {
        return "../images/soleil.png"
    }
}
//Retour de la date en format d'affichage du site
function formaterDate(tmpDate){
    return date = new Date(tmpDate).toLocaleString
        ('fr-CA', {  weekday: 'long', day: '2-digit' });
}
//Retour d'un index indiquant la journéé courrant en jour de l'annee
function indexJourneeCourante(){
    var date = new Date();
    var nouvelleAns = new Date(date.getFullYear(), 0, 0);
    var difference = date - nouvelleAns;
    var journee = 1000 * 60 * 60 * 24;
    var jour = Math.floor(difference / journee);
    return jour;
}

ajoutPrevisionJournaliere()


