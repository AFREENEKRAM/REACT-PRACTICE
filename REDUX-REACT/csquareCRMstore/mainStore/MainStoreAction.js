export const GET_GRID = 'GET_GRID';
export const GET_FORM = 'GET_FORM';

export const GetGrid = (data) => (     
    {
    type: 'GET_GRID', payload: data
   });

export const GetForm = (data) => (     
    {
    type: 'GET_FORM', payload: data
   });


//    export const GetForm = (data) => {
//         
//     return dispatch => { 
//         dispatch(
//           {type: 'GET_FORM', payload: data}
//         )
//      }
//}    
       
    
  
  