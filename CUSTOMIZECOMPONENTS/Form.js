/* eslint-disable */
import React, {useEffect} from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Input,
    Label,
     Button  
} from 'reactstrap';
import { useReducer, useState } from 'react';
import { connect } from 'react-redux';
import * as FormStore from '../redux/csquareCRMstore/formStore/FormStoreAction';
import Spinner from "../views/spinner/Spinner";
import { cancel } from "@redux-saga/core/effects";
import * as MainStore from '../redux/csquareCRMstore/mainStore/MainStoreAction';


let Form = (props) => {

    useEffect(() => {
      props.callFuncToDispalyFormFields()
    }, [])

    const formDataArrayReducer = (state, event) => {
      return [
        ...state,
       event      
      ]     
      }

   // const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false)
    const [formDataArray, setformDataArray] = useReducer(formDataArrayReducer, []);
        
     
    const handleChange = event => {
     
        const isCheckbox = event.target.type === 'checkbox';

        let alreadyExist = false;
     

        formDataArray.forEach((element)=>{
          if(element.fieldName == event.target.id) {
            alreadyExist = true
            element.fieldValue = isCheckbox ? event.target.checked : event.target.value
          }
  
        })
        let FormDataObject = {
          fieldName: event.target.id,
          fieldValue: isCheckbox ? event.target.checked : event.target.value
        }
      
      if(alreadyExist == false) {
         
        setformDataArray(FormDataObject);
      }
      }
 
      const submitForm = () => {
        console.log(formDataArray)
       setSubmitting(true);
       props.callFuncToSubmitFormData(formDataArray)
      
    }

    const cancelForm  = () => {
      console.log(formDataArray)
     //setSubmitting(true);
     props.callFuncToDispalyGrid(formDataArray)
    
  }


   
    if(props.fields.formFields.length > 0) {
       
      return (
        <div>
          {/* <h5  className="mb-4">Customer Profile</h5> */}
          <Col sm="12" md="12" lg="12" >
          <div>
             
                <Card className="col-sm-12 col-md-12 col-lg-12">
                    <CardTitle className="border-bottom p-3 mb-0">
                    <Col sm="12" md="12" lg="12">
                    <Row>
                    <Col sm="8" md="8" lg="8">
                    <i className="mdi mdi-priority-low mr-2"></i> 
                    </Col>
                    <Col sm="4" md="4" lg="4" className="formButton">
                    <Button className="btn btn-success mr-2" onClick={ () => submitForm() }>Submit</Button>
                    <Button className="btn btn-dark" onClick={ () => cancelForm() }>Cancel</Button>
                    {/* <Button type="submit" className="btn btn-success mr-2">Submit</Button>
                    <Button type="submit" className="btn btn-dark">Cancel</Button> */}
                    </Col>
                    </Row>
                    </Col>
                    </CardTitle>
                    <CardBody>
                        <CardSubtitle>Please enter the mandatory<code>(*)</code> fields in the form</CardSubtitle>

                        <form>
                        <Row>
                        { props.fields.formFields.map((field, key) => {
                         const { 
                            fieldLabel,
                            fieldName,
                            fieldType,
                            fieldValidation,
                            fieldId} = field
                         const stateKey = fieldName
                         return (
                          
                            <Col sm="12" md="6" lg="6" className="fieldsMargin" key={key}>
                                <Row>
                                <Col sm="6" md="4" lg="4">
                                <Label>{fieldLabel}</Label>
                                </Col>
                                <Col sm="6" md="8" lg="8">
                                <Input type={fieldType}  
                                id={fieldName}
                                // onChange={(event) =>this.setState({
                                //    [fieldName]: event.target.value 
                                //  }) }
                            //    value={this.state[fieldName]}
                                disabled={submitting}
                                onBlur = {handleChange}
                                />
                                </Col>
                                </Row>   
                            </Col>     
                                                      
                         )
                        }
                        )}


                        {/* <Button type="button" className="btn btn-dark ml-2">Cancel</Button> */}

                        </Row>
                        </form>

                    </CardBody>
                </Card>
             
          </div>
          </Col>
    

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
   
  return {
    fields : state.formStoreReducer
  }

}
 

const mapDispatch = (dispatch) => {
  return {
    callFuncToDispalyFormFields: () => dispatch(FormStore.getFormFields()),
    callFuncToSubmitFormData: (formDataArray) => dispatch(FormStore.addForm(formDataArray)),
    callFuncToDispalyGrid: () => dispatch(MainStore.GetGrid(true))
  }
}
Form = connect(mapState, mapDispatch)(Form);

export default Form;