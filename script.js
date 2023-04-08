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

/*const getTrailer = async (id) => {
    try {
        let url = `${baseUrl}/movie/${id}/videos?api_key=${api_key}&language=en-US`
        const response = await fetch(url)
        const responseData = await response.json()
        dataTrailer = responseData?.results
    } catch (error) {
        console.log("Error getTrailer: " + error)
    }
    return dataTrailer[0].key
}*/
        
const renderSingleMovie = (movies) => {
    console.log(movies)
    return (
        `   
        <img src="${imageBaseUrl + movies?.poster_path}" class="poster" data-modal="modal${movies?.id}" />

        <div id="modal${movies?.id}" class="modal"> 
            <div class="modal-content">
                <div class="modal-close">
                    <span class="close">&times;</span>
                </div>
                <div class="modal-information">
                    <img src="${imageBaseUrl + movies?.backdrop_path}" class="image-modal text" alt="Image not found"/>
                    <h2 class="text">${movies?.title}</h2>
                    <p class="text overview">${movies?.overview}</p>
                    <p class="info-movie text">${movies?.release_date ? movies?.release_date.split('-')[0] : "Not Released"}
                    rate: ${movies?.vote_average ? movies?.vote_average : "Not rated"}
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
                moviesDiv.innerHTML = movies?.map(movie => renderSingleMovie(movie)).join("")
            } catch (error) {
                console.error("Error renderMovies" + error)
            }
        }
        renderMovies() 
    })
}

setTimeout(() => {
    var button = document.querySelectorAll(".poster")
    button.forEach(function(btn) {
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
    };
    
    }, 1000);

showMovie()