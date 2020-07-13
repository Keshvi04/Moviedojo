const API_KEY='ccf467c23e8cdfae5883750a43a26bea';
const IMAGE_URL='https://image.tmdb.org/t/p/w500';

const url='https://api.themoviedb.org/3/search/movie?api_key=ccf467c23e8cdfae5883750a43a26bea';

function generateUrl(path){
    const url=`https://api.themoviedb.org/3${path}?api_key=ccf467c23e8cdfae5883750a43a26bea`
    return url;
}

function requestMovies(url, onComplete, onError){
    fetch(url)
        .then((res) => res.json() )
        .then( onComplete)
        .catch((onError));


}

function searchMovie(value){
    const path='/search/movie';
    const url=generateUrl(path)+ '&query=' + value;

    requestMovies(url,renderSearchMovies,handleError);

}

function getVideosByMovieId(movieId,content){
    const path=`/movie/${movieId}/videos`;
    const url=generateUrl(path);
    
    const render=createVideoTemplate.bind({ content });
    renderMovies(url,render,handleError);
}

function getUpcomingMovies(value){
    const path='/movie/upcoming';
    const url=generateUrl(path)+ '&query=' + value;

    const render= renderMovies.bind({title: 'Upcoming Movies'});
    requestMovies(url,render,handleError);

}

function topratedMovies(value){
    const path='/movie/top_rated';
    const url=generateUrl(path)+ '&query=' + value;

    const render= renderMovies.bind({title: 'Top Rated Movies'});

    requestMovies(url,render,handleError);

}

function nowPlaying(value){
    const path='/movie/now_playing';
    const url=generateUrl(path)+ '&query=' + value;

    const render= renderMovies.bind({title: 'Continue watching '});

    requestMovies(url,render,handleError);

}