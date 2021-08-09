
/* ----------- SEARCH BOX ----------- */

const handleSearch = (event) => {
    event.preventDefault();
    const val = event.target[1].value;
    window.location.replace(`music_search.html?page=1&desc=true&sortBy=artist&searched=${val}`)
  }