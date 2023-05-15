const api_key = "f4ee9eea2def44757865f44c719be46b"
const imageBaseUrl = "https://image.tmdb.org/t/p/w1280"
const baseUrl = "https://api.themoviedb.org/3"

const categories = [
    {
        name: "horror",
        title: "horror",
        path: `/discover/movie?api_key=${api_key}&with_genres=27`
    },
    {
        name: "war",
        title: "war",
        path: `/discover/movie?api_key=${api_key}&with_genres=10752`
    },
    {
        name: "animation",
        title: "animation",
        path: `/discover/movie?api_key=${api_key}&with_genres=16`
    },
    {
        name: "action",
        title: "action",
        path: `/discover/movie?api_key=${api_key}&with_genres=28`
    }
]

const getMovies = async(path) => {
    try {
        let url = `${baseUrl}${path}`
        const response = await fetch(url)
        const responseData = await response.json()
        data = responseData?.results
    } catch (error) {
        console.error("Error getMovies: " + error)
    }
    return data
}

const getTrailer = async (id) => {
    try {
        let url = `${baseUrl}/movie/${id}/videos?api_key=${api_key}&language=en-US`
        const response = await fetch(url) 
        const responseData = await response.json()
        dataTrailer = responseData?.results
    } catch (error) {
        console.log("Error getTrailer: " + error)
    }
    return dataTrailer[0] !== undefined ? dataTrailer[0] : "No trailer" 
}
        
const renderSingleMovie = (movie, trailer) => {
    return (
        `   
        <img src="${imageBaseUrl + movie?.poster_path}" class="poster" data-modal="modal${movie?.id}" />

        <div id="modal${movie?.id}" class="modal"> 
            <div class="modal-content">
                <div class="modal-close">
                    <span class="close">&times;</span>
                </div>
                <div class="modal-information">
                    <img src="${imageBaseUrl + movie?.backdrop_path}" class="image-modal text" alt="Image not found"/>
                    <h2 class="text">${movie?.title}</h2>
                    <p class="text overview">${movie?.overview}</p>
                    <p class="info-movie text">${movie?.release_date ? movie?.release_date.split('-')[0] : "Not Released"}
                    Rate: ${movie?.vote_average ? movie?.vote_average : "Not rated"}
                    <a href="https://youtube.com/watch?v=${trailer.key}" target="_blank" class="trailer"><button class="button-trailer">Trailer</button></a>
                    </p>
                </div>
            </div>
        </div>
        `
    )
}



function showMovie() {
    categories?.map(category => {
        const renderMovies = async() => {
            try {
                var titleGenre = document.createElement("h3")
                titleGenre.setAttribute("class", "title-category")
                titleGenre.innerHTML = category.title.toUpperCase()
                document.querySelector("#movies").appendChild(titleGenre)
                var moviesDiv = document.createElement("div")
                moviesDiv.setAttribute("id", category.name)
                moviesDiv.setAttribute("class", "moviesGenre")
                document.querySelector("#movies").appendChild(moviesDiv);
                const movies = await getMovies(category.path)
                var trailers = []
                for await (let movie of movies) {
                    result = await getTrailer(movie?.id)
                    result !== undefined ? trailers.push(result) : trailers.push("No trailer")
                }
                moviesDiv.innerHTML = movies?.map((movie, index) => {
                    return renderSingleMovie(movie, trailers[index])
                }).join("")
            } catch (error) {
                console.error("Error renderMovies" + error)
            }
        }
        renderMovies() 
    })
}

setTimeout(() => {
    var buttons = document.querySelectorAll(".poster")
    buttons.forEach(function(btn) {
        btn.onclick = () => {
            var modal = btn.getAttribute("data-modal")
            document.getElementById(modal).style.display = "flex"
            document.body.style.overflow = "hidden"
        }
    })

    var close = document.querySelectorAll(".modal-close")
    close.forEach(function(btn) {
        btn.onclick = () => {
            btn.closest(".modal").style.display = "none"
            document.body.style.overflow = "auto"
        }
    })

    window.onclick = (e) => {
        if(e.target.classList.contains("modal")){
            e.target.style.display = "none";
            document.body.style.overflow = "auto"
        }
    }
}, 5000);

setTimeout(() => {
    const availableTrailer = document.querySelectorAll("a")
    const buttonTrailer = document.querySelectorAll(".button-trailer")
    console.log(availableTrailer)
    availableTrailer.forEach((e) => {
        if(e.href === "https://youtube.com/watch?v=undefined") {
            buttonTrailer[e].style.display = "none"
        }
    })
}, 7000)

showMovie()