import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./Reducers";
import createSagaMiddleware from 'redux-saga';
import {formFieldsActionFuncCall} from './csquareCRMstore/formStore/FormStoreAction'
import {MainActionsFunction} from './Actions'


export const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  //  composeWithDevTools(applyMiddleware(thunk))
  );
  sagaMiddleware.run(MainActionsFunction)
  return store;
}




