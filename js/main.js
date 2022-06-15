const addContactModal = document.getElementById('addContactModal');

const modalBox = document.getElementById('modalBox');
const openModalButton = document.querySelector("#openModalButton");
const closeModalButton = document.querySelector("#closeModalButton");

const formNewContact = document.querySelector("#formNewContact");
const newName = document.querySelector("#newName");
const newPhone = document.querySelector("#newPhone");
const newEmail = document.querySelector("#newEmail");
const newAddress = document.querySelector("#newAddress");

const contactsContainer = document.querySelector("[data-contacts-container]");
const contactCardTemplate = document.querySelector("[data-contact-template]");

const deleteContactBtn = document.getElementById('deleteContactBtn');
const editContactBtn = document.getElementById('editContactBtn');


const allCards = [];


function openCloseModal() {
    addContactModal.classList.toggle("OpenModal");
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

    let formInputs = formNewContact.querySelectorAll("input");

    if (!formNewContact.checkValidity()) {
        formNewContact.classList.add('was-validated');
    } else {

        let nameValue = newName.value;
        let phoneValue = newPhone.value;
        let emailValue = newEmail.value;
        let addressValue = newAddress.value;
        let tokenValue = tokenId();

        addContactInfo(nameValue, phoneValue, emailValue, addressValue, tokenValue);
        createCards(allCards);
        formInputs.forEach(input => input.value = '');
        formNewContact.classList.remove('was-validated');
        openCloseModal();
    }

})

function tokenId() {
    return (Math.floor(Math.random() * (9999999999999 + 1)) + Date.now());
}