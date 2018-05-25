import { FETCH_MOVIES } from './types';

export const fetchMovies = () => dispatch => {
  console.log('fetching');
  fetch('http://www.omdbapi.com/?t=batman&apikey=aabca0d')
  .then(res => res.json())
  .then(movies => dispatch({
    type: FETCH_MOVIES,
    payload: movies
  })
  );
}
