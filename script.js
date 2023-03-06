const API_KEY = "f4ee9eea2def44757865f44c719be46b"
const image_base_url =  "https://image.tmdb.org/t/p/w1280"
const base_url = "https://api.themoviedb.org/3"

const categories = [
    {
        name: "horror",
        title: "horror",
        path: `/discover/movie?api_key=${API_KEY}&with_genres=27`
    },
    {
        name: "war",
        title: "war",
        path: `/discover/movie?api_key=${API_KEY}&with_genres=10752`
    },
    {
        name: "animation",
        title: "animation",
        path: `/discover/movie?api_key=${API_KEY}&with_genres=16`
    },
    {
        name: "action",
        title: "action",
        path: `/discover/movie?api_key=${API_KEY}&with_genres=28`
    }
]
console.log(categories[0].path)


const getMovies = async(path) => {
    try {
        let url = `${base_url}${path}`
        const response = await fetch(url)
        const responseData = await response.json()
        data = responseData?.results
    } catch (error) {
        console.error("Error getMovies: " + error)
    }
    return data
}

/*categories.map((category) => {
    newCard = document.querySelector(".container-app")
    newCard = document.createElement('div')
    newCard.setAttribute('id', category.id)
})*/

var moviesDiv = document.querySelector("#movies")

const renderMovies = async(genre) => {
    const movies = await getMovies(`/discover/movie?api_key=${genre}`)
    console.log(movies)
    moviesDiv.innerHTML = movies?.map(movie => renderSingleMovie(movie)).join("")
}

const renderSingleMovie = (movies) => {
    //let section = document.createElement("div")
    //section.setAttribute("class", "bg-danger")
    return (
        `
        <img src="${image_base_url + movies?.poster_path}" class=img-fluid" id="banner">
        `
    )
}

renderMovies(categories[0].path)


//getMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`)


