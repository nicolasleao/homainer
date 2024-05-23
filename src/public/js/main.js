function initializeSearchFunctionality() {
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