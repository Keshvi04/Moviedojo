
const API_KEY='ccf467c23e8cdfae5883750a43a26bea';
const IMAGE_URL='https://image.tmdb.org/t/p/w500';


const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movie-searchable');


const url='https://api.themoviedb.org/3/search/movie?api_key=ccf467c23e8cdfae5883750a43a26bea';


buttonElement.onclick= function(event){
    event.preventDefault();
    const value = inputElement.value;

    function movieSection(movies){
        return movies.map((movie) => {
            if(movie.poster_path){
                return `
                <img src=${'https://image.tmdb.org/t/p/w500//d9jZ2bKZw3ptTuxAyVHA6olPAVs.jpg'} data-movie-id=${movie.id}/>
                `;
            }
        })
    }
  
    function createMovieContainer(movies){
        const movieElement=document.createElement('div');
        movieElement.setAttribute('class','movie');

        const movieTemplate=`
        <section class="section">
        ${ movies.map((movie) => {
            return `
            <img src=${movie.poster_path} data-movie-id=${movie.id}/>
            `;
        })}
        </section>
        <div class="content">
        <p id="content-close">X</p>
        </div>
        `

        movieElement.innerHTML = movieTemplate;
        //movieElement.insertBefore(section, movieElement.firstChild);
        return movieElement;
    }

    const newurl=url + '&query=' + value;
    fetch(newurl)
        .then((res) => res.json() )
        .then((data) => {
            //data results
            const movies=data.results;
            const movieBlock= createMovieContainer(movies);
            movieSearchable.appendChild(movieBlock);
            console.log('Data',data);
        })
        .catch((error) => {
            console.log('Error',error);
        });
    console.log('Value:',value);
}
