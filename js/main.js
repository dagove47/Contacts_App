(() => {
    'use strict'

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

    let allCards = [];

    class Card {
        constructor(name, phone, email, address) {
            this.name = name;
            this.phone = phone;
            this.email = email;
            this.address = address;
        }
    }

    function addContactInfo (name, phone, email, address) {
        let newCard = new Card(name, phone, email, address);
        allCards.push(newCard);
    }

    function createCards(data) {

        const card = contactCardTemplate.content.cloneNode(true).children[0];

        const nameContactCard = card.querySelector("[data-name]");
        const phoneContactCard = card.querySelector("[data-phone]");
        const emailContactCard = card.querySelector("[data-email]");
        const addressContactCard = card.querySelector("[data-address]");

        nameContactCard.textContent = data[data.length -1].name;
        phoneContactCard.textContent = data[data.length -1].phone;
        emailContactCard.textContent = data[data.length -1].email;
        addressContactCard.textContent = data[data.length -1].address;

        contactsContainer.appendChild(card);

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
            addContactInfo(nameValue, phoneValue, emailValue, addressValue);
            formInputs.forEach(input => input.value = '');
            formNewContact.classList.remove('was-validated');
            openCloseModal();
            createCards(allCards);
            console.log(allCards);
            console.log(allCards[0]);
            console.log(allCards[0].name);
        }
        
    })

    // deleteContactBtn.addEventListener("click", (e) => {
    //     e.stopPropagation();
    //     console.log("");
    // })


    

})()




















