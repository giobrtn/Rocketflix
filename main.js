import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'


const button  = document.querySelector('button')


button.addEventListener("click", () => {
  findMovie()
})

function findMovie() {
  const MOVIE_ID = (Math.random() * 1000) + 1
  const URL = `${BASE_URL}${MOVIE_ID}?${API_KEY}&${language}`
  axios.get(URL).then(response => {
    const data = response.data
    const poster = JSON.stringify(data.poster_path)
    const urlPoster = "https://image.tmdb.org/t/p/w500"
    const title = JSON.stringify(data.title).slice(0, -1).substring(1)
    const description = JSON.stringify(data.overview).slice(0, -1).substring(1)
    
    if (poster != "" & description != ""){
      document.querySelector(".content-left").innerHTML = `<img src='${urlPoster + data.poster_path}' alt='film poster'>`
      document.querySelector(".content-right").innerHTML = `
        <h2>
          ${title}
        </h2>
        <p>
          ${description}
        </p>`
    }
    console.log(response)
  }).catch(error => { 
    document.querySelector(".content-left").innerHTML = "): &nbsp;"
    document.querySelector(".content-right").innerHTML = `
      <h2>Ops! Infelizmente não encontramos nenhum filme. Tente novamente.</h2>`
  })
}