const myAddresses = [
]
let maxNumber = 1

const ajouterAddressBtn = document.getElementById("ajouter-btn");
ajouterAddressBtn.addEventListener("click", function(){
    showOneContainer("ajout-container");
})

const annulerAjoutBtn = document.getElementById("annuler-ajout-btn")
annulerAjoutBtn.addEventListener("click", function(){
    showOneContainer("list-container")
})

const retourBtn = document.getElementById("retour-consulter-btn")
retourBtn.addEventListener("click", function(){
    showOneContainer("list-container") 
})

const validerAjoutBtn = document.getElementById("ajout-form")
validerAjoutBtn.addEventListener("submit", function(e){
    e.preventDefault()
    const nomEL = document.getElementById("nom-input")
    const emailEL = document.getElementById("email-input")
    const telEL = document.getElementById("telephone-input")
    myAddresses.unshift({
        id: maxNumber,
        nom:nomEL.value,
        email:emailEL.value,
        tel:telEL.value
    })
    nomEL.value = ''
    emailEL.value = ''
    telEL.value = ''
    maxNumber++
    renderAddresses()
})

function showOneContainer(containerId){
    const listContainerids = ["ajout-container", "consulter-container", "list-container"]
    listContainerids.forEach(id => document.getElementById(id).style.display="none")
    document.getElementById(containerId).style.display="block"
}

function renderAddresses() {
    showOneContainer("list-container")
    const agendaContainer = document.getElementById("agenda-container")
    agendaContainer.innerHTML = ""
    if (myAddresses.length == 0){
        agendaContainer.innerHTML = getEmptyCarnetInformation()
    }else{
        agendaContainer.innerHTML = myAddresses.map(event => getHtmlPresentationAddress(event)).join('')
    }

    document.querySelectorAll(".event .voir").forEach(item => {
        item.addEventListener("click", function(e){
            const positionInArray = myAddresses.findIndex(item => item.id === parseInt(e.target.getAttribute("position")))
            const el = document.getElementById("consulter-item-container")
            el.innerHTML = ''
            el.innerHTML = getHtmlPresentationAddresseTotale(myAddresses[positionInArray]) 
            showOneContainer('consulter-container')
        })
    })
}

function getHtmlPresentationAddresseTotale(address){
    return `
        <h3>Nom: ${address.nom}</h3>
        <p>Email: ${address.email}</p>
        <p>Téléphone: ${address.tel}</p>
        <p>Id: ${address.id}</p>
    `
}

function getHtmlPresentationAddress(event){
    return `
        <div class="event">
            <h3 class="title">${event.nom}</h3>
            <img class="voir" width="30" height="30" position="${event.id}" src="icons8-eye.gif" alt="voir" />
            <p class="debut">Email: ${event.email}</p>
            <p class="duree">Téléphone: ${event.tel}</p>
        </div>
    `
}

function getEmptyCarnetInformation(){
    return `
        <div class="empty-agenda">
            <h2>Vous n'avez aucune addresse dans votre carnet.</h2>
        </div>
    `
}

renderAddresses()