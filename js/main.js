const addContactModal = document.getElementById('addContactModal');

const modalBox = document.getElementById('modalBox');
const openModalButton = document.querySelector("#openModalButton");
const closeModalButton = document.querySelector("#closeModalButton");

const modalLabel = document.getElementById('modalLabel');
const formNewContact = document.querySelector("#formNewContact");
const newName = document.querySelector("#newName");
const newPhone = document.querySelector("#newPhone");
const newEmail = document.querySelector("#newEmail");
const newAddress = document.querySelector("#newAddress");

const contactsContainer = document.querySelector("[data-contacts-container]");
const contactCardTemplate = document.querySelector("[data-contact-template]");

const allCards = [];
let isEdit = false;
let editingCard = '';


function openCloseModal() {
    addContactModal.classList.toggle("OpenModal");
    modalLabel.textContent = "New Contact";
    let formInputs = formNewContact.querySelectorAll("input");
    formInputs.forEach(input => input.value = '');
    formNewContact.classList.remove('was-validated');
    isEdit = false;
}

openModalButton.addEventListener("click", (e) => {
    e.stopPropagation();
    openCloseModal();
})
modalBox.addEventListener("click", (e) => {
    e.stopPropagation();
})
closeModalButton.addEventListener("click", (e) => {
    e.stopPropagation();
    openCloseModal();
})
addContactModal.addEventListener("click", (e) => {
    e.stopPropagation();
    openCloseModal();
})

class Card {
    constructor(name, phone, email, address, token) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.token = token;
    }
}

function addContactInfo(name, phone, email, address, token) {
    let newCard = new Card(name, phone, email, address, token);
    allCards.push(newCard);
}

function createCards(data) {

    contactsContainer.textContent = '';

    for(let prop of data) {
        
        const card = contactCardTemplate.content.cloneNode(true).children[0];

        const nameContactCard = card.querySelector("[data-name]");
        const phoneContactCard = card.querySelector("[data-phone]");
        const emailContactCard = card.querySelector("[data-email]");
        const addressContactCard = card.querySelector("[data-address]");

        nameContactCard.textContent = prop.name;
        phoneContactCard.textContent = prop.phone;
        emailContactCard.textContent = prop.email;
        addressContactCard.textContent = prop.address;
        card.dataset.idCard = prop.token;

        contactsContainer.appendChild(card);
    }

}

formNewContact.addEventListener("submit", (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!formNewContact.checkValidity()) {
        formNewContact.classList.add('was-validated');
    } else {

        if(isEdit) {
            
            for(let prop of allCards) {
                if(prop.token === editingCard) {
                    prop.name = newName.value;
                    prop.phone = newPhone.value;
                    prop.email = newEmail.value;
                    prop.address = newAddress.value;
                    
                    createCards(allCards);
                    openCloseModal();
                }
            }

        } else {
            let nameValue = newName.value;
            let phoneValue = newPhone.value;
            let emailValue = newEmail.value;
            let addressValue = newAddress.value;
            let tokenValue = tokenId();

            addContactInfo(nameValue, phoneValue, emailValue, addressValue, tokenValue);
            createCards(allCards);
            
            openCloseModal();
        }
    }
})

function editContact(elem) {

    const selectedCard = elem.parentNode.parentNode.parentNode;
    const selectedCardToken = selectedCard.dataset.idCard;

    for(let card of allCards) {
        
        if(card.token === selectedCardToken) {
            openCloseModal();
            isEdit = true;
            modalLabel.textContent = "Edit Contact";

            newName.value = card.name;
            newPhone.value = card.phone;
            newEmail.value = card.email;
            newAddress.value = card.address;

            editingCard = card.token;
        }
    }
}


function deleteContact(elem) {

    let selectedCard = elem.parentNode.parentNode.parentNode;
    let selectedCardToken = selectedCard.dataset.idCard;

    for(let i = 0; i < allCards.length; i++) {
        
        if(allCards[i].token === selectedCardToken) {
            allCards.splice(i, 1);
            createCards(allCards);
        }
    }
}

function tokenId() {
    let newToken = '';
    let tokenCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let tokenLength = 15;

    do {
        let tokenChar = tokenCharacters.charAt(Math.floor(Math.random() * tokenCharacters.length));
        newToken += tokenChar;
        tokenLength--; 
    }
    while(tokenLength > 0);

    return newToken;
}