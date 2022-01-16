import React, { Fragment, useState , useEffect } from "react";


import { connect, useDispatch } from 'react-redux';
import * as MainStore from '../redux/csquareCRMstore/mainStore/MainStoreAction';
import Form from './Form';
import Grid from './Grid'
import Filter from './Filter';
import { ToastContainer, toast } from 'react-toastify';


//import "./Notes.css";
let Main = (props) => {
 //  
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setshowRight] = useState(false);

  const showLeftPart = () => {
    setShowLeft(!showLeft);
  };

  const showRightPart = () => {
    setshowRight(!showRight);
  };

  return (
    <Fragment>
      <div className="app-drawer">
        <div
          className={
            "left-part bg-white " + (showLeft === true ? "show-panel" : "")
          }
        >

            <Filter/>
          {/* <NoteSearch />
          <NoteList showRightPart={showRightPart.bind(null)} /> */}
        </div>
        <div className="right-part bg-white app-drawer-content">
          <div
            className={"" + (showRight === true ? "show-right-left-panel" : "")}
          >
            
            <span
              onClick={showLeftPart.bind(null)}
              className={
                "bg-primary show-left-part text-white d-block " +
                (showLeft === true ? "left-part-open" : "")
              }
            > 
            <i className="filterIcon mdi mdi-account-search"></i>
            <label className="filterButton">FILTER </label> 
              <i
                className={
                  showLeft === true
                    ? "fas fa-chevron-left"
                    : "fas fa-chevron-right"
                }
              >  </i>
            </span>
          
          
          
      {props.getMainStore.getGrid && <Grid/>}

      {props.getMainStore.getForm && <Form/>}
      
         
          </div>
        </div>

       

      </div>
    </Fragment>
  );
};

const mapState = (state) => {
  
  return {
    getMainStore : state.MainStoreReducer,
  }

}
 

const mapDispatch = (dispatch) => {
  
  return {
    // callFuncToDispalyGrid: () => dispatch(MainStore.GetGrid(true)),
    // callFuncToDispalyForm: () => dispatch(MainStore.GetForm(true))
  }
}
Main = connect(mapState, mapDispatch)(Main);

export default Main;