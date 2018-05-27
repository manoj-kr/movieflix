import { FETCH_MOVIES } from '../actions/types';
import { UPDATE_WATCH_LIST } from '../actions/types';
import { GET_WATCH_LIST } from '../actions/types';
import { UPDATE_VOTE } from '../actions/types';

const initialState = {
  movieDetails: {},
  watchList:[]
}

export default function(state = initialState, action){
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movieDetails: action.payload
      }
      break;
   case UPDATE_WATCH_LIST:
   case GET_WATCH_LIST:
   case UPDATE_VOTE:
        return {
          ...state,
          watchList: action.payload
        }
        break;
   default:
      return state;
    }
}
