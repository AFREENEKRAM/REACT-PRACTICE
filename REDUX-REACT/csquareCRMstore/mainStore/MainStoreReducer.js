export const initialState = {
    getGrid: true,
    getForm: false

}


export default function MainStoreReducer(state = initialState, action) {
  
    switch (action.type) {
        
      case 'GET_GRID':
         
        return {
          ...state,
          getGrid: action.payload,
          getForm: !(action.payload)
        };
      case 'GET_FORM':
        
        return {
          ...state,
          getForm: action.payload,
          getGrid: !(action.payload)
        };
        default:
        return state;
      // ... case ADD_TODO, and default ... :
    }
  }