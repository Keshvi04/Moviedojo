

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movie-searchable');
const movieContainer = document.querySelector('#movie-container');



     function movieSection(movies){
       
        const section=document.createElement('section');
        section.classList = 'section';

        movies.map((movie) => {
        if(movie.poster_path){
            const img=document.createElement('img');
            img.src=IMAGE_URL + movie.poster_path;
           // img['data-movie-id']=IMAGE_URL + movie.poster_path;
            img.setAttribute('data-movie-id', movie.id);
            section.appendChild(img);
            
        }  
        
       })
    return section;
    }
       
        
    

function createMovieContainer(movies, title =''){
    const movieElement=document.createElement('div');
    movieElement.setAttribute('class','movie');

    const header=document.createElement('h2');
    header.innerHTML=title;

    const content=document.createElement('div');
    content.classList= 'content';
    const contentClose =`<p id="content-close">X</p>`;

    content.innerHTML= contentClose;

    const section=movieSection(movies);

    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);
return movieElement;

}
   



function renderSearchMovies(data){
    movieSearchable.innerHTML='';
    const movies=data.results;
    const movieBlock= createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
     console.log('Data' ,data);
}
    
function renderMovies(data){
    
    const movies=data.results;
    const movieBlock= createMovieContainer(movies,this.title);
     movieContainer.appendChild(movieBlock);
            
}

function createIframe(video){
    const iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${video.key}`;
    iframe.width=360;
    iframe.height=315;
    iframe.allowFullscreen=true;

    return iframe;

}


function handleError(error){
    console.log('Error',error);
}

buttonElement.onclick= function(event){
    event.preventDefault();
    const value = inputElement.value;
   searchMovie(value);

          inputElement.value='';
    console.log('Value:',value);

}

function createVideoTemplate(data, content){
    content.innerHTML = '<p id="content-close">X</p>';
    console.log('Movie-Videos:',data);
    const videos=data.results;
    const length= videos.length > 5 ? 5 : videos.length;
    const iframeContainer= document.createElement('div');

    for(let i=0;i<length;i++){
        const video=videos[i];
        const iframe=createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}



document.onclick= function(event){
   
   const target=event.target;

   if(target.tagName.toLowerCase() === 'img'){
       console.log('hello');
       console.log('Event', event);
       const movieId=target.dataset.movieId;
       console.log('MovieID',movieId);
       const section=event.target.parentElement;
       const content= section.nextElementSibling;
    content.classList.add('content-display');

    const path=`/movie/${movieId}/videos`;
    const url=generateUrl(path);
    //fetch movie videos
    fetch(url)
        .then((res) => res.json())
        .then((data) => createVideoTemplate(data, content))
        .catch((error) => {
            console.log('Error',error);
        });
       
         

   }

   if(target.id=== 'content-close'){
       const content=target.parentElement;
       content.classList.remove('content-display');
   }
  
} 
   



nowPlaying();
getUpcomingMovies();

topratedMovies();

