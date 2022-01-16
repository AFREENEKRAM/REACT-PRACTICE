import {all, call, put, takeEvery, takeLatest, select} from 'redux-saga/effects';
import {sagaMiddleware} from '../../Store'

import { FormRedux } from '../../form/formRedux';
import axios from 'axios';
import {AppLinks} from '../../../csquareCRMComponents/appLink.const'
import GridStoreReducer from './GridStoreReducer';
import GridStoreState from './GridStoreState'
//import formStoreState from './GridStoreState'
export const SET_GRID_DATA = 'SET_GRID_DATA';
//export const FORM_FIELDS = 'FORM_FIELDS';
export const GET_GRID_DATA = 'GET_GRID_DATA';



// 

 
export const getProject = (GridStoreState) => GridStoreState

export function GridFetchService(project) {

   console.log(project);
   let data;
    
   if(project) {
     data ={
        "tableName":"users",
        "filter": project
        
    } 
   } else {
     data ={
        "tableName":"users",
        "filter": [

        ]
        
        
    } 
   }
  
    return axios.post(AppLinks.BASE_API_URL + "/getModuleData",data )
    
}




export function* GridFetchStore() {

    try {

     
         
         let project = yield select(getProject);
          
        let resp = yield call(GridFetchService, project.GridStoreReducer.dataForFilter );
 
         
        if(resp.data.message == "success") {

            yield put({type: 'SET_GRID_DATA', payload: resp.data.response})
           
        } else{
            console.log(resp.data.message)
        }
        
       
    } catch(error) {

    }
       
}


// export function* formFieldsActionFuncCall() {
//     yield takeEvery('GET_NEWS', formFieldsFetchStore);
//   }


  export const getGrid = (data) => (     
    {
    type: 'GET_GRID_DATA', payload: data
   });
