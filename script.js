const API_KEY = "f4ee9eea2def44757865f44c719be46b";

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
        return await response.json()
        console.log(response)
    } catch (error) {
        console.log("Error getMovies: " + error)
    }
}

function horror () {
    getMovies(categories.name=horror)
    var horrorMovies = document.querySelector("#horror").createElement("div")
    horrorMovies.classList.add("horrorElement")
    horrorMovies.innerHTML = img
}


//getMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`)


