import React, { useEffect, useMemo } from "react";
import { Alert, Autocomplete, Box, Button,Grid,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TextField,Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getObjectStrutureByObjectId, searchObjectByFieldValue} from "../../redux/objectSlice";
import { DatePicker } from "@mui/x-date-pickers";
import { Search } from "@mui/icons-material";
import Loader from "../../components/Loader";
import { getObjectInstance } from "../../redux/Instance/instanceSlice";
import toast from "react-hot-toast";

var operator=["=","<",">","<=",">=","Like"];
var operator1=["ALL","AND","ANY","BETWEEN","EXISTS","IN","NOT","OR","SOME"];

//let obj=[];

const AllObjects = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {isLoadding:objLoadding,objects,objectStruture,searchObjects}=useSelector((state)=>state.objects);
  const {isLoadding:typeLoadding,objectTypes}=useSelector((state)=>state.types);
  const {isLoadding:instLoadding,ObjectInstances}=useSelector((state)=>state.instances);
  const dispatch=useDispatch();
  const [object, setObject] = React.useState("");
  const [objt, setObjt] = React.useState({});
  const [objecttypeId,setObjectTypeId] = React.useState("");
  const [objId,setObjectId] = React.useState("");

  const [objType, setobjType] = React.useState([]);
  const [obj, setobj] = React.useState([]);

  const [inputObject, setInputObject] = React.useState("");

  const [objectType, setObjectType] = React.useState("");
  const [inputObjectType, setInputObjectType] = React.useState("");

   const [Field, setField] = React.useState("");
   const [inputField, setInputField] = React.useState("");

   
   const [Field2, setField2] = React.useState("");
   const [inputField2, setInputField2] = React.useState("");


   const [fieldValue, setFieldValue] = React.useState("");
   const [inputFieldValue, setInputFieldValue] = React.useState("");
  const [fieldOperator, setFieldOperator] = React.useState("");
  const [inputfieldOperator, setInputFieldOperator] = React.useState("");

  const [fieldOperator3, setFieldOperator3] = React.useState("");
  const [inputfieldOperator3, setInputFieldOperator3] = React.useState("");

  const [fieldValue2, setFieldValue2] = React.useState("");
  const [inputFieldValue2, setInputFieldValue2] = React.useState("");
 const [fieldOperator2, setFieldOperator2] = React.useState("");
 const [inputfieldOperator2, setInputFieldOperator2] = React.useState("");

  const [addField,setAddField] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(fieldValue);
  console.log(inputFieldValue);

  useEffect(()=>{
    let at= objects && objects.length>0 && objects.map(a => {
      if(objecttypeId!=="" && objecttypeId){
       if(a.objectTypeId.toString()===objecttypeId.toString()){
         return  {
           objectId:a.objectId,
           objectName:a.objectName,
         };
       }
      }  
      return "";
    }).filter(a => a!=="");
    
   setobj(at);
   },[objecttypeId]);



  useMemo( ()=>{
    if(objId && objId!==""){
      dispatch(getObjectStrutureByObjectId(objId));
    }
   },[objId,inputObject]);


  useMemo( ()=>{
    if(Field!=="" &&  objId!==""){
      dispatch(getObjectInstance(objId));
    }
  
   },[objId,Field]);

   const searchObjectHandler=async()=>{
    if(objectType.objectTypeName ===""){
        return toast.error("objectType field is required");
    }
    else if(object.objectName===""){
      return toast.error("object field is required");
    }else if(Field==="" ){
      return toast.error("Field Name  is required");
    }else if(fieldOperator===""){
      return toast.error("field Operator  is required");
    }else if(fieldValue===null && inputFieldValue===""){
      return toast.error("fieldValue field is required");
    }
    if(fieldOperator3==="" && (Field2!=="" || fieldOperator2!=="" || fieldValue2!=="" || fieldValue2!=="")){
      console.log(fieldOperator3);
      return toast.error("Please select first && ||");
    }
    if(fieldOperator3!==""){
      if(Field2===""){
        return toast.error("Second Field Name  is required");
      }else if(fieldOperator2===""){
        return toast.error("Second field Operator  is required");
      }else if(fieldValue2===null && inputFieldValue2===""){
        return toast.error("Second field Value  is required");
      }else{
        await dispatch(searchObjectByFieldValue({objectType:objectType.objectTypeName,objectName:object.objectName ,FieldName:Field,Oper:fieldOperator,fieldValue:inputFieldValue,conj:fieldOperator3,FieldName2:Field2,Oper2:fieldOperator2,fieldValue2:inputFieldValue2}));
      }
    }
    else {
        await dispatch(searchObjectByFieldValue({objectType:objectType.objectTypeName,objectName:object.objectName ,FieldName:Field,Oper:fieldOperator ,fieldValue:inputFieldValue,conj:fieldOperator3,FieldName2:Field2,Oper2:fieldOperator2,fieldValue2:inputFieldValue2}));
      }
   }
   console.log(fieldOperator3);
  const handleButtons=()=>{
    setFieldOperator2("");
    setInputFieldValue2("");
    setFieldValue2("");
    setFieldOperator3("");
    setInputFieldOperator3("");
    setField2("");
    setInputField2("");
    setAddField(!addField);
  }

  return (
    <>
    {
    (<Box ml="20px"  mr="20px" mb="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="All Objects" subtitle="All object Records " />
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiChackbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Grid container spacing={1} mt={3} lg={12}>
{ <Grid item xs={8} sm={6} md={4} lg={3}>
  <Autocomplete
        value={objectType}
        onChange={(event, newValue) => {
       //   console.log(newValue);
          setObjectTypeId(newValue?.objectTypeId);
          setObjectType(newValue);
        }}
        getOptionLabel={(option) => (option.objectTypeName ? option.objectTypeName : "")}
        freeSolo
        inputValue={inputObjectType}
        onInputChange={(event, newInputValue) => {
          setInputObjectType(newInputValue);
        }}
        setCustomKey={option => option.objectTypeId + option.objectTypeName}
        id="controllable-states-demo"
        options={objectTypes && objectTypes.length>0 && objectTypes.map((a)=>{
          if(a.objectTypeId.toString()==="1" || a.objectTypeId.toString()==="2" || a.objectTypeId.toString()==="6"){
           return "";
          }
          return {
           objectTypeId:a.objectTypeId,
           objectTypeName:a.objectTypeName,
         }
         
       }).filter(a => a!=="")  || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Objects Type" />}
      />
  </Grid>
}
 {inputObjectType && objecttypeId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
    <Autocomplete
        value={object}
        onChange={(event, newValue) => {
          setObjectId(newValue?.objectId)
          setObject(newValue);
        }}
        freeSolo
        setCustomKey={option => option.objectId + option.objectName}
        getOptionLabel={(option) =>(option.objectName ? option.objectName : "")}
        inputValue={inputObject}
        onInputChange={(event, newInputValue) => {
         setInputObject(newInputValue);
        }}
        id="controllable-states-demo"
        options={obj  || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Objects" />}
      />
  </Grid>
}
{  inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
    <Autocomplete
        value={Field}
        onChange={(event, newValue) => {
          console.log(newValue);
          setField(newValue);
        }}
        freeSolo
        inputValue={inputField}
        setCustomKey={option => option}
      //  getOptionLabel={(option) =>(option.fieldName ? option.fieldName : "")}
        onInputChange={(event, newInputValue) => {
         setInputField(newInputValue);
        }}
        id="controllable-states-demo"
        options={ objectStruture && objectStruture.length>0 && objectStruture.map((a)=> a.fieldName) || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Field Name" />}
      />
  </Grid>
}
{  inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
    <Autocomplete
        value={fieldOperator}
        onChange={(event, newValue) => {
          console.log(newValue);
           setFieldOperator(newValue);
        }}
        freeSolo
        setCustomKey={option => option.index}
        //getOptionLabel={(option) =>(option ? option.objectName : "")}
        inputValue={inputfieldOperator}
        onInputChange={(event, newInputValue) => {
         setInputFieldOperator(newInputValue);
        }}
        id="controllable-states-demo"
        options={operator || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Operator" />}
      />
  </Grid>
}
{  inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
    <Autocomplete
        value={fieldValue}
        onChange={(event, newValue) => {
          setFieldValue(newValue);
        }}
        freeSolo
        setCustomKey={option => option}
        inputValue={inputFieldValue}
        onInputChange={(event, newInputValue) => {
         setInputFieldValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={ ObjectInstances && ObjectInstances.length>0 && ObjectInstances.map((a)=> {
          if(a[Field]==null){
            return "";
          }
          return a[Field];
        }).filter(a=>a!=="") || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Field Value" />}
      />
  </Grid>
}
{  addField===true && inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
    <Autocomplete
        value={fieldOperator3}
        onChange={(event, newValue) => {
          console.log(newValue);
           setFieldOperator3(newValue);
        }}
        setCustomKey={option => option}
        freeSolo
        //getOptionLabel={(option) =>(option ? option.objectName : "")}
        inputValue={inputfieldOperator3}
        onInputChange={(event, newInputValue) => {
         setInputFieldOperator3(newInputValue);
        }}
        id="controllable-states-demo"
        options={operator1 || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="&& , || " />}
      />
  </Grid>
}

{
  addField===true  && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
  <Autocomplete
      value={Field2}
      onChange={(event, newValue) => {
        console.log(newValue);
        setField2(newValue);
      }}
      freeSolo
      setCustomKey={option => option}
      inputValue={inputField2}
    //  getOptionLabel={(option) =>(option.fieldName ? option.fieldName : "")}
      onInputChange={(event, newInputValue) => {
       setInputField2(newInputValue);
      }}
      id="controllable-states-demo"
      options={ objectStruture && objectStruture.length>0 && objectStruture.map((a)=> a.fieldName) || []}
      sx={{ width: 250 }}
      renderInput={(params) => <TextField {...params} label="Field Name" />}
    />
</Grid>
}
{  addField===true && inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
    <Autocomplete
        value={fieldOperator2}
        onChange={(event, newValue) => {
          console.log(newValue);
           setFieldOperator2(newValue);
        }}
        freeSolo
        //getOptionLabel={(option) =>(option ? option.objectName : "")}
        inputValue={inputfieldOperator2}
        setCustomKey={option => option}
        onInputChange={(event, newInputValue) => {
         setInputFieldOperator2(newInputValue);
        }}
        id="controllable-states-demo"
        options={operator || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Operator" />}
      />
  </Grid>
}
{ addField===true && inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={3}>
    <Autocomplete
        value={fieldValue2}
        onChange={(event, newValue) => {
          setFieldValue2(newValue);
        }}
        inputValue={inputFieldValue2}
        freeSolo
        setCustomKey={option => option}
        onInputChange={(event, newInputValue) => {
         setInputFieldValue2(newInputValue);
        }}
        id="controllable-states-demo"
        options={ ObjectInstances && ObjectInstances.length>0 && ObjectInstances.map((a)=> {
          if(a[Field2]==null){
            return "";
          }
          return a[Field2];
        }).filter(a=>a!=="") || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Field Name" />}
      />
  </Grid>
}
<Grid item>
<Button variant="solid" size="large" endIcon={<Search />} sx={{padding:"15px",marginRight:"10px",backgroundColor:colors.greenAccent[500]}} onClick={searchObjectHandler}>Search</Button>
{fieldValue && addField===false && <Button variant="solid" size="large"  sx={{padding:"15px",backgroundColor:colors.greenAccent[500]}} onClick={handleButtons}>Add</Button>}
{addField===true && <Button variant="solid" size="large"  sx={{padding:"15px",backgroundColor:colors.redAccent,color:"white"}} onClick={handleButtons}>Remove</Button>}
</Grid>

 </Grid>
 <div style={{ height: 350, width: '100%' ,marginTop:"20px"}}>
      {
         objLoadding === true ?  <div style={{marginLeft:"400px"}}> <Loader/></div> :searchObjects && searchObjects.length>0?  searchObjects && searchObjects.length>0? <>
          <Grid  spacing={3}>
            <Grid item xs={12} className="w-[80%]" style={{ maxWidth:"90%" ,padding:"10px",marginTop:"20px",backgroundColor:colors.blueAccent[900]}}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
             <TableContainer sx={{ maxHeight: 440 }}>
               <Table stickyHeader aria-label="sticky table" >
                   <TableHead sx={{
                    backgroundColor: colors.blueAccent[700]
                   }}>
                   <TableRow>
                     {
                        
                        searchObjects && Object.keys(searchObjects[0]).map((a)=>(
                            <TableCell>
                                {a}
                            </TableCell>
                          
                        ))

                     }
                      </TableRow>
                   </TableHead>
                   <TableBody>
                    
                   {
                    searchObjects && searchObjects.length>0 && searchObjects.slice && searchObjects.map &&  searchObjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data)=>(
                      <TableRow
                      key={data?.id}
                      style={{
                        backgroundColor:colors.blueAccent[900]
                       }}
                      >
                      {
                        Object.values(data).map((a)=>(
                          <TableCell>
                            {a}
                         </TableCell>
                        ))
                      }
                      </TableRow>
                     ))
                    }
                   </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                style={{
                  backgroundColor:colors.blueAccent[700]
                 }}
                    rowsPerPageOptions={[5,10, 25, 100]}
                    component="div"
                    count={searchObjects?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
              />
              </Paper>
            </Grid>
          </Grid>
          <Alert severity={Array.isArray(searchObjects) && searchObjects.length>0 ? "success":"error"} style={{
          width:"90%"
        }}>object {Array.isArray(searchObjects)? searchObjects?.length :"0"} Records Found ...</Alert></>: <Alert severity={Array.isArray(searchObjects) && searchObjects.length>0 ? "success":"error"} style={{
          width:"90%"
        }}> object {Array.isArray(searchObjects)? searchObjects?.length :"0"} Records Found ...</Alert>:<Alert severity="info"> Please Select All fiels  ...</Alert> 
      } 
     
        </div>
      </Box>
    </Box>)
   }
  </>
  );
};

export default AllObjects;
