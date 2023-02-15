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
    let url = `https://api.themoviedb.org/3/${path}`
    const response = await fetch(url)
    return await response.json()
}



