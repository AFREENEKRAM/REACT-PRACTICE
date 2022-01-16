//import formStoreState from './formStoreState';
//import {SET_FORM_FIELDS} from './FormStoreAction'

export const initialState = {
    formFields: [],
    dataForSubmit: '',
    getFormDetail: false

}


export default function formStoreReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_FORM_FIELD':
        return { ...state, loading: true };
      case 'GET_FORM_DETAIL':
        debugger
        return { ...state, getFormDetail: true };
        
      case 'SET_FORM_FIELDS':
         
        return {
          ...state,
          formFields: action.payload
         // loading: false
        };

        case 'ADD_FORM':
          debugger
          return { ...state, loading: true,
          dataForSubmit: action.payload };
        default:
        return state;
      // ... case ADD_TODO, and default ... :
    }
  }