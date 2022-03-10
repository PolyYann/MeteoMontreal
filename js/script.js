

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
            
            var donneeTemp = data.temperatures;
            let parent = document.getElementById("parent")
            //carousel
            let carousel = document.createElement("div")
            carousel.setAttribute("class", "bg-secondary owl-carousel owl-theme container-sm")
            //creer cartes
            for (let index = 0; index <= nbrJour; index++) {
                //carte parent
                let card = document.createElement("div")
                card.setAttribute("class", "card")
                
                //ajouter date
                let divDay = document.createElement("div")
                divDay.setAttribute("class", "h2 card-header bg-dark text-light text-center")
                
                divDay.innerHTML = donneeTemp[index].DateDuJour

                //ajouter Max Temperature
                let divMax = document.createElement("div")
                divMax.setAttribute("class", "h3 bg-warning text-danger text-center")
                divMax.innerHTML = donneeTemp[index].MaxTemp
                //ajouter Minumum temperature
                let divMin = document.createElement("div")
                divMin.setAttribute("class", "h3 bg-info text-light text-center")
                divMin.innerHTML = donneeTemp[index].MinTemp
                //ajouter Image
                let divImage = document.createElement("div")
                divImage.setAttribute("class", "card-footer bg-light ")
                let image= document.createElement("img")
                 image.setAttribute("src", getImage(donneeTemp[index].Temp))
                divImage.appendChild(image)
                //
                card.appendChild(divDay)
                card.appendChild(divMax)
                card.appendChild(divMin)
                card.appendChild(divImage)
                carousel.appendChild(card)
                
            }
            parent.appendChild(carousel)
        });
}

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

function ajoutPrevisionJournaliere() {
    //fetch DB
    fetch('../data/temperatures_2022.json')
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
                     

            var TempJour = data.temperatures;
            var jour = document.getElementById("journalierHeader")
            var temperature = document.getElementById("journalierNow")
            var tempMax = document.getElementById("journalierMax")
            var tempMin = document.getElementById("journalierMin")
            jour.value
            jour.innerText = TempJour[0].DateDuJour
            jour.setAttribute("class", "h2 bg-dark text-center text-light")
            temperature.textContent = ("Horaire: " +TempJour[0].Temp)
            temperature.setAttribute("class", "h3 bg-info text-center text-light") 
            tempMax.innerText = ("Max: " + TempJour[0].MaxTemp)
            tempMax.setAttribute("class", "h3 bg-warning text-center text-danger") 
            tempMin.innerText = ("Min: " + TempJour[0].MinTemp)
            tempMin.setAttribute("class", "h3 bg-info text-center text-light") 
        });
}

ajoutPrevisionJournaliere()

function trouveJourneeCourante(){
    
}





