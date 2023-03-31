const API_KEY = "f4ee9eea2def44757865f44c719be46b"
const image_base_url = "https://image.tmdb.org/t/p/w1280"
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
        
        const renderSingleMovie = (movies) => {
            return (
                `
                <img src="${image_base_url + movies?.poster_path}" class="poster" data-modal="modal${movies?.id}" />

                <div id="modal${movies?.id}" class="modal"> 
                    <div class="modal-content">
                        <div class="modal-close">
                            <span class="close">&times;</span>
                        </div>
                        <div class="modal-information">
                            <img src="${image_base_url + movies?.poster_path}" class="image-modal" />
                            <h3 class="title">${movies?.title}</h3>
                            <p class="title">${movies?.overview}</p>
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


setTimeout(() => { //use async and await in this function
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