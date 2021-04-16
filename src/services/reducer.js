import ApiTypes from './types';
const initialState = {
  list: null,
  notes: [],
};
export default function ApiReducer(state = initialState, action) {
  console.log('Action ', action);
  console.log('State ', state);
  switch (action.type) {
    case ApiTypes.CREATE_USER:
      return {
        list: action.id,
      };
    case ApiTypes.LOGIN_USER:
      return {
        list: action.id,
      };
    case ApiTypes.SOCIAL_USER:
      return {
        list: action.id,
      };
    case ApiTypes.GETNOTES:
      return {
        ...state,
        notes: [...action.payload.response],
      };
    case ApiTypes.DELETENOTES:
      return {
        ...state,
        notes: [...action.payload.response],
      };
    default:
      return state;
  }
}
