// instantiates a div and inserts the contents of an element into it by id
const showModal = (title, modalWrapperId, modalContentId) => {
    const modalWrapper = document.createElement('div')
    modalWrapper.id = modalWrapperId
    modalWrapper.classList.add('modal-wrapper')

    const modal = document.createElement('div')
    modal.classList.add('modal')
    
    modal.innerHTML = `
        <div class="close-modal" onclick="hideModal('${modalWrapperId}')"><img src="/img/close-icon-small-square.png" alt="close modal" /></div>
        <h2>${title}</h2>
        <div class="modal-content">
            ${document.getElementById(modalContentId).innerHTML}
        </div>
    `

    
    const body = document.querySelector('body')
    modalWrapper.appendChild(modal)
    body.appendChild(modalWrapper)

    // add class with delay for transitions
    setTimeout(() => {
        modalWrapper.classList.add('visible')
        modal.classList.add('visible')
    }, 50)

    modalWrapper.addEventListener("click", (e) => {
        hideModal(modalWrapperId)
    })

    modal.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
    })
    return modal
}

const hideModal = (modalWrapperId) => {
    const wrapper = document.getElementById(modalWrapperId)
    const modal = wrapper.querySelector('.modal')

    // remove class immediately but wait for transition to remove element
    wrapper.classList.remove('visible')
    modal.classList.remove('visible')
    setTimeout(() => wrapper.remove(), 200)
}