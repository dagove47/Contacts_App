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


    formNewContact.addEventListener("submit", (e) => {
        e.stopPropagation();
        e.preventDefault();

        let formInputs = formNewContact.querySelectorAll("input");

        if (!formNewContact.checkValidity()) {

            formNewContact.classList.add('was-validated');

        } else {

            formInputs.forEach(input => input.value = '');
            formNewContact.classList.remove('was-validated');
            openCloseModal();

        }
        
    })

})()




















