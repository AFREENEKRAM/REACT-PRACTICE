import {all, call, put, takeEvery, takeLatest, select} from 'redux-saga/effects';
import {sagaMiddleware} from '../../Store'

import { FormRedux } from '../../form/formRedux'
import axios from 'axios';
import formStoreState from './FormStoreState'
import {toast } from 'react-toastify';
import {AppLinks} from '../../../csquareCRMComponents/appLink.const'

export const SET_FORM_FIELDS = 'SET_FORM_FIELDS';
//export const FORM_FIELDS = 'FORM_FIELDS';
export const GET_FORM_FIELD = 'GET_FORM_FIELD';
export const ADD_FORM = 'ADD_FORM';

export const GET_FORM_DETAIL = 'GET_FORM_DETAIL'




export function formFieldsFetchService() {

    const data = {
        "id":"60867059542a386d3474627e"
    }
    return axios.post(AppLinks.BASE_API_URL + "/getModules",data )
}

export function* formFieldsFetchStore() {
    
    try {

        let resp = yield call(formFieldsFetchService);

         
        if(resp.data.message == "success") {
            console.log(resp.data.response[0].customFields)
            yield put({type: 'SET_FORM_FIELDS', payload: resp.data.response[0].customFields})
        } else{
            console.log(resp.data.message)
        }
        
       
    } catch(error) {

    }
       
}
  export const getFormFields = () => (     
    {
    type: 'GET_FORM_FIELD',
   });


   export const getProjectState = (formStoreState) => formStoreState

export function FormAddService(formData) {

   console.log(formData);
   let data;
    
   if(formData) {
     data ={
        "tableName":"users",
        "fields": formData       
    }   
   }
  
    return axios.post(AppLinks.BASE_API_URL + "/insertModuleData",data )
    
}




export function* FormAddStore() {

    try {

     
        debugger
         
         let projectState = yield select(getProjectState);
          debugger
        let resp = yield call(FormAddService, projectState.formStoreReducer.dataForSubmit );
 
        debugger
         
        if(resp.data.message == "success") {

            toast.success(resp.data.response);
            yield call (getFormDetail);
         //   yield put({type: 'SET_GRID_DATA', payload: resp.data.response})
           
        } else{
            console.log(resp.data.message)
        }
        
       
    } catch(error) {

    }
       
}

   export const addForm = (data) => (     
    {
    type: 'ADD_FORM', payload: data
   });

   export const getFormDetail = () => (     
    {
    type: 'GET_FORM_DETAIL'
   });