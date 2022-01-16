import {formFieldsFetchStore, FormAddStore} from './csquareCRMstore/formStore/FormStoreAction';
import {GridFetchStore} from './csquareCRMstore/gridStore/GridStoreAction'
import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';

export function* MainActionsFunction() {
    yield takeEvery('GET_FORM_FIELD', formFieldsFetchStore);
    yield takeEvery('GET_GRID_DATA', GridFetchStore);
    yield takeEvery('ADD_FORM', FormAddStore)
  }