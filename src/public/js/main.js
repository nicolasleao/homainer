let term;

const initializeSearchFunctionality = () => {
    const searchInput = document.querySelector('.search-bar input')
    searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            handleSearch()
        }
    })

    const searchButton = document.querySelector('.search-bar .search-button')
    searchButton.addEventListener("click", function (event) {
        if (searchInput.value) {
            handleSearch()
        }
    })

    function handleSearch() {
        const searchUrl = `https://www.google.com/search?q=${searchInput.value}`
        window.open(searchUrl, '_blank').focus()
        searchInput.value = ''
    }
}

// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function (event) {
    initializeSearchFunctionality()
});

const openTerminal = () => {
    const modalContent = document.querySelector('.modal-content')
    const terminalElement = document.createElement('div')
    terminalElement.id = 'terminal'
    modalContent.appendChild(terminalElement)

    term = new Terminal();
    term.open(document.getElementById('terminal'));
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
}

const closeTerminal = () => {
    term.dispose()
    term = undefined
}

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
    if (wrapper) wrapper.classList.remove('visible')
    if (modal) modal.classList.remove('visible')
    setTimeout(() => { wrapper.remove(); closeTerminal() }, 200)
}