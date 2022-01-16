import React, {useEffect, Fragment} from "react";
import * as data from "../views/tables/DataBootstrapTable";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { BootstrapTable, TableHeaderColumn, InsertButton } from "react-bootstrap-table";
import { connect } from 'react-redux';
import * as GridStore from '../redux/csquareCRMstore/gridStore/GridStoreAction';
//import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Spinner from "../views/spinner/Spinner";
import * as MainStore from '../redux/csquareCRMstore/mainStore/MainStoreAction';

//This is for the Delete row
function onAfterDeleteRow(rowKeys) {
  alert("The rowkey you drop: " + rowKeys);
}
//This is for the insert new row
/*
function onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
}*/
//This is for the Search item
function afterSearch(searchText, result) {
  console.log("Your search text is " + searchText);
  console.log("Result is:");
  for (let i = 0; i < result.length; i++) {
    console.log(
      "Fruit: " + result[i].id + ", " + result[i].name + ", " + result[i].price
    );
  }
}


const selectRowProp = {
  mode: "checkbox",
};
const cellEditProp = {
  mode: "click",
  blurToSave: true,
};




let Grid = (props) => {
 
  useEffect(() => {
    props.callFuncToDispalyGrid()
  }, [])

  function createCustomInsertButton() {
   
    return (
      
         <InsertButton
      className='gridButton'
        btnText='Create New'
      
        onClick={ () => handleInsertButtonClick() }/>
      
     
     
    );
  }
  
  function handleInsertButtonClick () {
    props.callFuncToDispalyForm()
  }

  const options = {
    //afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
   // afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
   // afterSearch: afterSearch, 
    insertBtn: createCustomInsertButton
  };

 
function getColumns() {

    
  if(props.gridData.schema && props.gridData.schema.length>0) {

     let columns = [];
    // let name = Object.getOwnPropertyNames(props.gridData[0])
  //  let i=0;
    props.gridData.schema.map((field)=> {
       
    let column = {
      dataField: field.fieldName,
      text:   field.fieldLabel
    };
   // if(i<3){
      columns.push(column)
    //}
    

    //i++;
  } )
  

  return columns;
  }
  
}
const columns = getColumns();
  
if(props.gridData.schema && props.gridData.schema.length > 0) {
 
  return (
    
   
      <Row>
        <Col md="12"> 
          <Card>
            <CardBody>
           
         

              <BootstrapTable
                striped
                hover
                condensed
                search={true}
                data={props.gridData.data}
             //   deleteRow={true}
                selectRow={selectRowProp}
                pagination
                options={options}
                insertRow
              //  cellEdit={cellEditProp}
                tableHeaderClass="mb-0"
                keyField='id' 
                //height= "calc(100vh - 250px)"
                
              >
               {columns.map( (column, key) => {
                  
        return (
            <TableHeaderColumn width="150" dataField={ column.dataField }  key={key}>{ column.text }</TableHeaderColumn>
        );
    })} 
                {/* <TableHeaderColumn width="100" dataField="name" isKey>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn width="100" dataField="gender">
                  Gender
                </TableHeaderColumn>
                <TableHeaderColumn width="100" dataField="company">
                  Company
                </TableHeaderColumn> */}
              </BootstrapTable>
            </CardBody>
          </Card>
        </Col>
      </Row> 
   

  );

}else {

  return (
    <Spinner></Spinner>
  )
}

};

const mapState = (state) => {
   
  return {
    gridData : state.GridStoreReducer.gridData
  }

}
 

const mapDispatch = (dispatch) => {
  return {
    callFuncToDispalyGrid: () => dispatch(GridStore.getGrid()),
    callFuncToDispalyForm: () => dispatch(MainStore.GetForm(true))
  }
}
Grid = connect(mapState, mapDispatch)(Grid);

export default Grid;