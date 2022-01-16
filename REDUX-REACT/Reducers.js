import { combineReducers } from "redux";
import settings from "./settings/Reducer";
import chatReducer from "./chats/Reducer";
import notesReducer from "./notes/Reducer";
import contactReducer from "./contacts";
import maincontactReducer from "./contacts/Contacts";
import emailReducer from "./email";
import maintodoReducer from "./todos/Todos";
import todoReducer from "./todos";
import formStoreReducer from "./csquareCRMstore/formStore/FormStoreReducer"
import MainStoreReducer from "./csquareCRMstore/mainStore/MainStoreReducer"
import GridStoreReducer from "./csquareCRMstore/gridStore/GridStoreReducer"

const Reducers = combineReducers({
  settings,
  
 // forms: require('./form/formRedux').reducer,
  // chatReducer,
  // contactReducer,
  // maincontactReducer,
  // emailReducer,
  // notesReducer,
  // maintodoReducer,
  // todoReducer,
  formStoreReducer,
  MainStoreReducer,
  GridStoreReducer
});

export default Reducers;
