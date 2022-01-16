//import formStoreState from './formStoreState';
//import {SET_FORM_FIELDS} from './FormStoreAction'

export const initialState = {
    gridData: {},
    dataForFilter: []

}


export default function GridStoreReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_GRID_DATA':
        return { ...state, 
          loading: true,
          dataForFilter: action.payload
         };
        
      case 'SET_GRID_DATA':
         
        return {
          ...state,
          gridData: action.payload
        };
        default:
        return state;
      // ... case ADD_TODO, and default ... :
    }
  }