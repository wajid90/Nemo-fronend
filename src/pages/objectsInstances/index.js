import React, {useEffect, useMemo, useRef, useState } from "react";
import { Alert, Autocomplete, Box, Button,Grid,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TextField,Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {  getInstanceByObjectName, getObjectInstance  } from "../../redux/Instance/instanceSlice";
import { Add, Filter1Outlined, Remove, RemoveCircleOutline, RemoveFromQueue, Search } from "@mui/icons-material";
import Loader from "../../components/Loader";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import toast from "react-hot-toast";
import { getObjectStrutureByObjectId, searchObjectByFieldValue } from "../../redux/objectSlice";


var operator=["=","<",">","<=",">=","Like"];
var operator1=["ALL","AND","ANY","BETWEEN","EXISTS","IN","NOT","OR","SOME"];


const ObjectInstance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {isLoadding:objLoadding,objects,objectStruture,searchObjects}=useSelector((state)=>state.objects);
  const {isLoadding:typeLoadding,objectTypes}=useSelector((state)=>state.types);
  const {isLoadding:instLoadding,ObjectInstances,objectInstance}=useSelector((state)=>state.instances);
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
  const [objectTypeName, setObjectTypeName] = React.useState("");
  const [objectName, setObjectName] = React.useState("");



   const [Field, setField] = React.useState("");
   const [inputField, setInputField] = React.useState("");

   const [chips, setChips] = React.useState([]);
   const [inputChips, setInputCips] = React.useState("");
   
   const [Field2, setField2] = React.useState("");
   const [inputField2, setInputField2] = React.useState("");
   const [show,setShow]=useState(false);
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
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  const [formValues, setFormValues] = useState([{newConj:"", newFieldName: "",newFieldOperator:"", newFieldValue : ""}]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
 
   const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };
 
   const handleMaxWidthChange = (event) => {
     setMaxWidth(
       // @ts-expect-error autofill of arbitrary value is not handled.
       event.target.value,
     );
   };
 
   const handleFullWidthChange = (event) => {
     setFullWidth(event.target.checked);
   };
 
   
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
        for(let i=0; i<fieldValue.length;i++){
              if(formValues[i].newConj==="" && (formValues[i].newFieldValue!=="" || formValues[i].newFieldOperator!=="" || formValues[i].newFieldName!=="")){
                return toast.error("Please select first && ||");
              }
              if(formValues[i].newConj!==""){
                if(formValues[i].newFieldName===""){
                  return toast.error("Field Name is required");
                }else if(formValues[i].newFieldOperator===""){
                  return toast.error("Second field Operator  is required");
                }else if(formValues[i].newFieldValue===""){
                  return toast.error("Second field Value  is required");
                }
              }
             }
     if(formValues.length>0){
       await handleClose(true);
        await dispatch(searchObjectByFieldValue({objectType:objectType.objectTypeName,objectName:object.objectName ,FieldName:Field,Oper:fieldOperator ,fieldValue:inputFieldValue,conj:fieldOperator3,FieldName2:Field2,Oper2:fieldOperator2,fieldValue2:inputFieldValue2,formValues:formValues}));
      }else {
       await handleClose(true);
        await dispatch(searchObjectByFieldValue({objectType:objectType.objectTypeName,objectName:object.objectName ,FieldName:Field,Oper:fieldOperator ,fieldValue:inputFieldValue,conj:fieldOperator3,FieldName2:Field2,Oper2:fieldOperator2,fieldValue2:inputFieldValue2}));
      }
   }
  }else{
    await handleClose(true);
    await dispatch(searchObjectByFieldValue({objectType:objectType.objectTypeName,objectName:object.objectName ,FieldName:Field,Oper:fieldOperator ,fieldValue:inputFieldValue,conj:fieldOperator3,FieldName2:Field2,Oper2:fieldOperator2,fieldValue2:inputFieldValue2}));

  }
}
let handleChange = (i, name,value) => {
    let newFormValues = [...formValues];
    newFormValues[i][name] = value;
    setFormValues(newFormValues);
 }
    
let addFormFields = () => {
    setFormValues([...formValues, {newConj:"", newFieldName: "",newFieldOperator:"", newFieldValue : ""}])
 }

let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
}

  const ref0=useRef();
  const ref1=useRef();
  const ref2=useRef();
  const ref3=useRef();

  return (
    <>
    {(<Box  ml="20px"  mr="20px" mb="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={objectName!==""?objectName :"Data Table"} subtitle={objectTypeName!==""? objectTypeName: "Data Description"} />
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
    <Paper
      component="form"
      onClick={handleClickOpen}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80%"  ,mx: "auto" ,mt:"20px",backgroundColor:colors.blueAccent[900]}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Objects"
        inputProps={{ 'aria-label': 'search objects' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="filter">
        <Filter1Outlined />
      </IconButton>
    </Paper>
    <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        PaperProps={{
          style: {
            backgroundColor:colors.blueAccent[900],
            boxShadow: "none",
            color:"black"
          },
        }}
        onClose={handleClose}
      >
        <DialogTitle sx={{
          color:"white"
        }}> select object Type or object Name</DialogTitle>
        <DialogContent>
          <DialogContentText>

  <Grid container spacing={1} mt={1}>
{ 
<Grid item xs={8} sm={6} md={4} lg={4}>
  <Autocomplete
        value={objectType}
        onChange={(event, newValue) => {
          setObjectTypeId(newValue?.objectTypeId);
          setObjectTypeName(newValue?.objectTypeName);

          setObjectType(newValue);
        }}
        freeSolo
        getOptionLabel={(option) => (option ? option.objectTypeName : "")}
        inputValue={inputObjectType}
        placeholder="Please select Object Type"
        setCustomKey={option => option.objectTypeId + option.objectTypeName}
        onInputChange={(event, newInputValue) => {
          setInputObjectType(newInputValue);
        }}
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
        sx={{ width: 250,color:"black" }}
        renderInput={(params) => <TextField {...params} label="Objects Type"    />}
      />
  </Grid>
}
 {inputObjectType && objecttypeId!=="" && <Grid item xs={8} sm={6} md={4} lg={8}>
    <Autocomplete
        value={object}
        onChange={(event, newValue) => {
          setObjectId(newValue?.objectId)
          setObjectName(newValue?.objectName)

          setObject(newValue);
        }}
        freeSolo
        setCustomKey={option => option.objectId + option.objectName}
        getOptionLabel={(option) =>(option ? option.objectName : "")}
        inputValue={inputObject}
        onInputChange={(event, newInputValue) => {
          console.log(newInputValue);
         setInputObject(newInputValue);
        }}
        id="controllable-states-demo"
        options={obj || []}
        sx={{ width: 250,color: colors.blueAccent[800]}}
        renderInput={(params) => <TextField {...params} label="Objects"  />}
      />
  </Grid>
}

{/* ==== add field === */}

{  inputObject && objId!=="" && <>
<DialogTitle style={{
  width: '100%',
  color: "white"
}}> select field Name or Values</DialogTitle> 
<Grid item xs={8} sm={6} md={4} lg={4}>
    <Autocomplete
        value={Field}
        onChange={(event, newValue) => {
         // console.log(newValue);
          setField(newValue);
        }}
        freeSolo
        inputValue={inputField}
        setCustomKey={option => option}
        onInputChange={(event, newInputValue) => {
         setInputField(newInputValue);
        }}
        id="controllable-states-demo"
        options={ objectStruture  || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Field Name"   />}
      />
  </Grid></>
}
{  inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={4}>
    <Autocomplete
        value={fieldOperator}
        onChange={(event, newValue) => {
          console.log(newValue);
           setFieldOperator(newValue);
        }}
        freeSolo
        setCustomKey={option => option.index}
        inputValue={inputfieldOperator}
        onInputChange={(event, newInputValue) => {
         setInputFieldOperator(newInputValue);
        }}
        id="controllable-states-demo"
        options={operator || []}
        sx={{ width: 250 }}
        renderInput={(params) => <TextField {...params} label="Operator"   />}
      />
  </Grid>
}
{  inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={4}>
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
        renderInput={(params) => <TextField {...params} label="Field Value"  />}
      />
  </Grid>
}
{  addField===true && inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={4}>
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
        renderInput={(params) => <TextField {...params} label="&& , || "   />}
      />
  </Grid>
}

{
  addField===true  && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={4}>
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
      renderInput={(params) => <TextField {...params} label="Field Name"   />}
    />
</Grid>
}
{  addField===true && inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={4}>
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
        renderInput={(params) => <TextField {...params} label="Operator"  />}
      />
  </Grid>
}
{ addField===true && inputObject && objId!=="" && <Grid item xs={8} sm={6} md={4} lg={4}>
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
        renderInput={(params) => <TextField {...params} label="Field Name"  />}
      />
  </Grid>

}
 
{  
show ===true && <>  <DialogTitle style={{
  color: "white",
  width: '100%',
}}> add More Fields ... </DialogTitle> {formValues.map((element, index) => (
  <>

  <Box  className="" style={{
    display: "flex",
    flexWrap: 'wrap',
  }} key={index}>
<Grid item xs={8} sm={6} md={4} lg={4}>
    <Autocomplete
        name="newConj"
        ref={ref0}
        value={element.newConj || ""}
        
        onChange={(event, newValue) => {
          handleChange(index,ref0.current.getAttribute("name"),newValue);
        }}
        setCustomKey={option => option}
        freeSolo
        id="controllable-states-demo"
        options={operator1 || []}
        sx={{ width: 250 ,m:2}}
        renderInput={(params) => <TextField name="newConj"  {...params} label="&& , || " />}
      />
  </Grid>
  <Grid item xs={8} sm={6} md={4} lg={4}>
  <Autocomplete
   name="newFieldName"
   ref={ref1}
       value={element.newFieldName || ""}
       onChange={(event, newValue) => {
        console.log(ref1.current)
        handleChange(index,ref1.current.getAttribute("name"),newValue);
       }}
      freeSolo
      
      setCustomKey={option => option}
      id="controllable-states-demo"
      options={ objectStruture || []}
      sx={{ width: 250  ,m:2}}
      renderInput={(params) => <TextField {...params} label="Field Name" />}
    />
</Grid>
 <Grid item xs={8} sm={6} md={4} lg={4}>
    <Autocomplete
    ref={ref2}
       name="newFieldOperator"
       value={element.newFieldOperator || ""}
       onChange={(event, newValue) => {
        handleChange(index,ref2.current.getAttribute("name"),newValue);
       }}
        freeSolo
        setCustomKey={option => option}
        id="controllable-states-demo"
        options={operator || []}
        sx={{ width: 250 ,m:2 }}
        renderInput={(params) => <TextField {...params} label="Operator" />}
      />
  </Grid>
  <Grid item xs={8} sm={6} md={4} lg={4}>
    <Autocomplete
          name="newFieldValue"
          ref={ref3}
          value={element.newFieldValue || ""}
          onChange={(event, newValue) => {
            handleChange(index,ref3.current.getAttribute("name"),newValue);
          }}
        freeSolo
        setCustomKey={option => option}
        id="controllable-states-demo"
        options={ ObjectInstances && ObjectInstances.length>0 && ObjectInstances.map((a)=> {
          if(a[formValues[index].newFieldName]==null){
            return "";
          }
          return a[formValues[index].newFieldName];
        }).filter(a=>a!=="") || []}
        sx={{ width: 250  ,m:2}}
        renderInput={(params) => <TextField {...params} label="Field Value" />}

      />
  </Grid>
  <Grid item xs={8} sm={6} md={4} lg={4}>
  { index===0 ?  <Button className="button add" variant="solid" size="large" endIcon={<RemoveCircleOutline />} sx={{padding:"10px",marginTop:"20px",color:"white",backgroundColor:colors.redAccent[500],":hover":{
          backgroundColor:colors.redAccent[500],
        }}} type="button" onClick={() => setShow(false)}>Remove</Button> : null  }
  </Grid>
  <Grid item xs={8} sm={6} md={4} lg={4}>
  { index ?  <Button className="button add" variant="solid" size="large" endIcon={<RemoveCircleOutline />} sx={{padding:"10px",marginTop:"20px",color:"white",backgroundColor:colors.redAccent[500],":hover":{
          backgroundColor:colors.redAccent[500],
        }}} type="button" onClick={() => removeFormFields(index)}>Remove</Button> : null  }
  </Grid>

  </Box>
 </>
  )) }</>}
{
 <>
<DialogTitle style={{
  color: "white",
  width: '100%',
}}> select Field You wan't inside the table </DialogTitle>
<Grid item xs={8} sm={6} md={4} lg={4}>
<Autocomplete
value={chips}
multiple
limitTags={2}
onChange={(event, newValue) => {
  console.log(newValue);
  setChips(newValue);
}}
onInputChange={(event, newValue) => {
  console.log(newValue);
   setInputCips(newValue);
}}
id="multiple-limit"
options={objectStruture}
getOptionLabel={(option) => option}
renderInput={(params) => (
  <TextField {...params} label="Columns" placeholder="Table Columns" />
)}
sx={{ width: '550px' }}
/> </Grid>


</>

}
  
</Grid>
</DialogContentText>
    
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} variant="solid" size="large" sx={{padding:"15px",backgroundColor:colors.blueAccent[500],color:"white",":hover":{
          backgroundColor:colors.blueAccent[500],
        }}}>Close</Button>
      {
        show===false ?  <Button className="button add" variant="solid" size="large" endIcon={<Add />} sx={{padding:"15px",color:"white",backgroundColor:colors.greenAccent[800],":hover":{
          backgroundColor:colors.greenAccent[800],
        }}} type="button" onClick={() => setShow(true)}>Add Field</Button> : <Button className="button add" variant="solid" size="large" endIcon={<Add />} sx={{padding:"15px",color:"white",backgroundColor:colors.greenAccent[800],":hover":{
          backgroundColor:colors.greenAccent[800],
        }}} type="button" onClick={() => addFormFields()}>Add Field</Button>
      }
     
        <Button onClick={searchObjectHandler} variant="solid" size="large" endIcon={<Search />} sx={{padding:"15px",color:"white",backgroundColor:colors.greenAccent[500],":hover":{
          backgroundColor:colors.greenAccent[500],
        }}}>Search</Button>
        </DialogActions>
      </Dialog>

      <div style={{ height: 350, width: '100%' ,marginTop:"20px"}}>
      {
         objLoadding === true ?  <div style={{marginLeft:"400px"}}> <Loader/></div> :searchObjects && searchObjects.length>0?  searchObjects && searchObjects.length>0? <>
          <Grid  spacing={3} mx="auto">
            <Grid item xs={12} className="w-[80%]" style={{ maxWidth:"90%" ,padding:"10px",marginLeft:"5%",marginRight:"5%", marginTop:"20px",backgroundColor:colors.blueAccent[900]}}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
             <TableContainer sx={{ maxHeight: 440 }}>
               <Table stickyHeader aria-label="sticky table" >
                   <TableHead sx={{
                    backgroundColor: colors.blueAccent[700]
                   }}>
                   <TableRow>
                     {
                        chips && chips.length>0 ? chips.map && chips.map((a)=>(<TableCell>{a}</TableCell>)):( objectStruture.map && objectStruture.map((a)=>( <TableCell>{a}</TableCell>)))
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

                chips && chips.length!==0 ? chips.map && chips.map((a)=>(
                    <TableCell>{data[a]}</TableCell>
                    )
                ):(
                  objectStruture && objectStruture.map && objectStruture.map((a)=>( 
                      <TableCell>{data[a]}</TableCell>
                      )))
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
            marginLeft:"5%",marginRight:"5%",
          width:"90%"
        }}>object {Array.isArray(searchObjects)? searchObjects?.length :"0"} Records Found ...</Alert></>: <Alert severity={Array.isArray(searchObjects) && searchObjects.length>0 ? "success":"error"} style={{
          width:"90%",
          marginLeft:"5%",marginRight:"5%",
        }}> object {Array.isArray(searchObjects)? searchObjects?.length :"0"} Records Found ...</Alert>:<Alert severity="info"> Please Select All fiels  ...</Alert> 
      } 
     
        </div>
      </Box>
    </Box>)
}
    </>
  );
};

export default ObjectInstance;
