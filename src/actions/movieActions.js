import { FETCH_MOVIES } from './types';
import { UPDATE_WATCH_LIST } from './types';
import { GET_WATCH_LIST } from './types';
import { UPDATE_VOTE } from './types';

export const fetchMovies = (searchBy) => dispatch => {
  fetch('http://www.omdbapi.com/?t=' + searchBy + '&apikey=aabca0d')
  .then(res => res.json())
  .then(result => dispatch({
    type: FETCH_MOVIES,
    payload: result
  })
  );
}

export const updateWatchList = (movie) => dispatch => {
  let watchList = localStorage.getItem("watchList");
  let wList = JSON.parse(watchList);
  if(wList === null){
    wList = [{Poster:movie.Poster, imdbID:movie.imdbID, title: movie.Title}];
  }else{
    if(wList.filter(function(movieDetails){ return movieDetails.imdbID === movie.imdbID }).length > 0){
      wList = wList.filter(function(movieDetails){
        return movieDetails.imdbID !== movie.imdbID;
      });
    }else{
      wList.push({Poster:movie.Poster, imdbID:movie.imdbID, title: movie.Title});
    }
  }
  localStorage.setItem("watchList", JSON.stringify(wList));
  dispatch({
    type: UPDATE_WATCH_LIST,
    payload: wList
  })
}

export const getWatchList = () => dispatch => {
  let watchList = localStorage.getItem("watchList");
  let wList = JSON.parse(watchList);
  dispatch({
    type: GET_WATCH_LIST,
    payload: wList
  })
}

export const updateVote = (movieId, vote) => dispatch => {
  let watchList = localStorage.getItem("watchList");
  let wList = JSON.parse(watchList);
  wList = wList.map(function(movie){
    if(movie.imdbID === movieId){
      movie.vote = vote;
    }
    return movie;
  });
  localStorage.setItem("watchList", JSON.stringify(wList));
  dispatch({
    type: UPDATE_VOTE,
    payload: wList
  })
}
