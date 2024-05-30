let term

// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function (event) {
    initializeSearchFunctionality()

    // ping our apps to see if they are running and update clock every 30sec
    pingAllApps()
    updateCurrentTimeandDate()
    setInterval(() => {
        pingAllApps()
        updateCurrentTimeandDate()
    }, 30000)
})

function updateCurrentTimeandDate() {
    const currentTime = document.getElementById('current-time');
    const d = new Date();
    const m = d.getMinutes();
    const h = d.getHours();
    currentTime.textContent =
        (`0${h}`).substr(-2) + ":" + (`0${m}`).substr(-2);

    const currentDate = document.getElementById('current-date');
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const dayOfWeek = d.getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    currentDate.textContent =
        (`0${day}`).substr(-2) + "/" + (`0${month}`).substr(-2) + "/" + year;
    const currentDay = document.getElementById('current-day');
    currentDay.textContent = days[dayOfWeek];
}

const pingAllApps = () => {
    document.querySelectorAll('.app-card').forEach(async (app) => {
        const running = await ping(app.id)
        if (running) {
            app.querySelector('.app-status')?.classList?.add('running')
            app.querySelector('.app-status')?.classList?.remove('exited')
        } else {
            app.querySelector('.app-status')?.classList?.remove('running')
            app.querySelector('.app-status')?.classList?.add('exited')
        }
    })
}

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

const openTerminal = () => {
    const modalContent = document.querySelector('.modal-content')
    const terminalElement = document.createElement('div')
    terminalElement.id = 'terminal'
    modalContent.appendChild(terminalElement)

    term = new Terminal()
    term.open(document.getElementById('terminal'))
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
        e.stopPropagation()
        e.preventDefault()
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

const ping = async (url) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            mode: "no-cors",
            cache: "no-cache",
            redirect: "follow",
            referrerPolicy: "no-referrer",
        })
        return response.status < 400
    } catch (e) {
        return false
    }
}