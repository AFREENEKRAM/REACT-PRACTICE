import React, {useEffect} from "react";
import { Form, Input } from "reactstrap";
import { Row, Col, Card, CardBody, Button, Label } from "reactstrap";
import { useReducer, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as MainStore from '../redux/csquareCRMstore/mainStore/MainStoreAction';
import * as GridStore from '../redux/csquareCRMstore/gridStore/GridStoreAction';
import Spinner from "../views/spinner/Spinner";



let Filter = (props) => {

 
  
  
  // useEffect(() => {
  //   props.callFuncToDispalyGrid()
  // }, [])

  // const dispatch = useDispatch();
    function createScreen(){
      
      props.callFuncToDispalyForm()
      
    }

    function GridScreen(){
      
      props.callFuncToDispalyGrid()
      
    }


    const formReducer = (state, event) => {
      
      return {
        ...state,
        [event.name]: event.value
      }
     }

     const formDataArrayReducer = (state, event) => {
       
      return [
        ...state,
       event
         
      ]
       
      }

 // const [formData, setFormData] = useReducer(formReducer, {});
  const [formDataArray, setformDataArray] = useReducer(formDataArrayReducer, []);
 
 
   
  

    const handleChange = event => {
     
       
      let alreadyExist = false;
     

      formDataArray.forEach((element)=>{
        if(element.filterName == event.target.id) {
          alreadyExist = true
          element.filterValue = event.target.value
        }

      })
      let FormDataObject = {
        filterName: event.target.id,
        filterValue: event.target.value
      }
    
    if(alreadyExist == false) {
       
      setformDataArray(FormDataObject);
    }
      
   

    }
    
    
    const submitForm = (e) => {
   
    
       
      console.log(formDataArray)
      props.callFuncToSearchFilter(formDataArray)
  }
  
    if(props.gridDataForFilter.schema && props.gridDataForFilter.schema.length > 0) {
    return(
        <div className="filterBox border-bottom">
        {/* <h5 className="card-title">Search Note</h5> */}
        {/* <Button className="btn" color="primary" size="lg" block onClick={ () => createScreen() }>CREATE</Button> */}
        <Button className="btn" color="secondary" size="lg" block onClick={ () => [submitForm(), GridScreen()] }>SEARCH</Button>
      
         <form >
                     
                        { props.gridDataForFilter.schema.map((field, key) => {
                         const { 
                            fieldLabel,
                            fieldName,
                            fieldType,
                            fieldValidation,
                            _id} = field
                         const stateKey = fieldName
                         return (
                          <div className="position-relative has-icon-left"  key={key}>
                          <label>{fieldLabel}</label>
                          <Input type={fieldType}  
                             id={fieldName}
                           //  disabled={submitting}
                             onBlur = {handleChange}
                            
                          />
                          </div>
                               
                         )
                        }
                        )}

                       
          </form>
      </div>
    )
      }

      else {
      
        return (
          <Spinner></Spinner>
        )
      }
}

const mapState = (state) => {
 //  
  return {
    getMainStore : state.MainStoreReducer,
    gridDataForFilter : state.GridStoreReducer.gridData
   
  }

}
 

const mapDispatch = (dispatch) => {
  
  return {
    callFuncToSearchFilter: (formDataArray) => dispatch(GridStore.getGrid(formDataArray)),
    callFuncToDispalyGrid: () => dispatch(MainStore.GetGrid(true)),
    callFuncToDispalyForm: () => dispatch(MainStore.GetForm(true))
  }
}
Filter = connect(mapState, mapDispatch)(Filter);

export default Filter;