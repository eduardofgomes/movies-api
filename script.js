const API_KEY = "f4ee9eea2def44757865f44c719be46b";
const image_base_url =  "https://image.tmdb.org/t/p/w1280"

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


const getMovies = async(path) => {
    try {
        let url = `https://api.themoviedb.org/3${path}`
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

const renderMovies = async() => {
    const movies = await getMovies(`/discover/movie?api_key=${API_KEY}&with_genres=28`)
    console.log(movies)
    moviesDiv.innerHTML = movies?.map(movie => renderSingleMovie(movie))
}

const renderSingleMovie = (movies) => {
    return (
        `
        <div>
            <img src="${image_base_url + movies?.poster_path}" class=img-fluid">
        </div>
        `
    )
}

renderMovies()


//getMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`)


