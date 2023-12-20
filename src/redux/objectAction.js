import axios from "axios";



const getAllObjects = async () => {
  const reponces = await axios.get(`https://localhost:7241/getAllObjects`);
  return reponces.data;
};

const getObjectofType = async (objectType) => {
  console.log(objectType);
  const reponces = await axios.get(`https://localhost:7241/getObjectsofType?typeName=${objectType}`);
  return reponces.data;
};


const getObjectStruture = async (objectId) => {
 
  const reponces = await axios.get(`https://localhost:7241/getObjectStructure?objectId=${objectId}`);
  console.log(reponces.data);
  return reponces.data;
};

const searchObject = async (data) => {
  let data1 = new FormData();
   console.log(data.fieldData);
    if(data.formValues.length===0 && (data.objectName!=="" || data.objectName!=="")  && ( data.FieldName==="" && data.fieldValue==="" && data.Oper==="") || (data.FieldName===null && data.fieldValue===null && data.Oper===null)){
      console.log("first  ...")
      data1.append("data", JSON.stringify({
        fieldData:data.fieldData
      }));
      const reponce = await axios.post(`https://localhost:7241/searchObject?objectName=${data.objectName}&objectType=${data.objectType}`,data1,{
        headers:{
          'Content-Type':'application/json',
        },
      });
      console.log(reponce.data);
      return reponce.data;
    }else if(data.formValues.length===0 && ( data.conj==="" || data.conj===null) && (data.objectName!=="" || data.objectName!==null)  && ( data.FieldName!=="" && data.fieldValue!=="" && data.Oper!=="") || (data.FieldName!==null && data.fieldValue!==null && data.Oper!==null && (data.newConj===null || data.newConj===""))){
      console.log(data);
      data1.append("data", JSON.stringify({
        fieldData:data.fieldData
      }));
      const repon = await axios.post(`https://localhost:7241/searchObject?objectName=${data.objectName}&objectType=${data.objectType}&FieldName=${data.FieldName}&FieldValue=${data.fieldValue}&Oper=${data.Oper}`,data1,{
        headers:{
          'Content-Type':'application/json',
        },
      });
      console.log(repon.data);
      return repon.data;
    }
    else if(data.formValues.length>1){
      console.log("this is second hit ...");
      data1.append("data", JSON.stringify({
        fieldData:data.fieldData
      }));
      let newData=`https://localhost:7241/searchObject?objectName=${data.objectName}&objectType=${data.objectType}&FieldName=${data.FieldName}&FieldValue=${data.fieldValue}&Oper=${data.Oper}&conj=${data.conj}&FieldName2=${data.FieldName2}&FieldValue2=${data.fieldValue2}&Oper2=${data.Oper2}`;
      for(let i=0;i<data.formValues.length;i++){
        newData+=`&newConj=${data[i].conj}&newFieldName=${data[i].newFieldName}&newFieldValue=${data[i].newFieldValue}&newOperator=${data[i].newFieldOperator}`
      }
      const reponces1 = await axios.post(newData,data1,{
        headers:{
          'Content-Type':'application/json',
        },
      });
      console.log(reponces1.data);
      return reponces1.data;

    }else{
      console.log("this is hitt redux ...")
      const reponces2 = await axios.post(`https://localhost:7241/searchObject?objectName=${data.objectName}&objectType=${data.objectType}&FieldName=${data.FieldName}&FieldValue=${data.fieldValue}&Oper=${data.Oper}&conj=${data.conj}&FieldName2=${data.FieldName2}&FieldValue2=${data.fieldValue2}&Oper2=${data.Oper2}`,data1,{
        headers:{
          'Content-Type':'application/json',
        },
      });
      console.log(reponces2.data);
      return reponces2.data;
    
    }
  

};


const objectService = {
    getAllObjects,
    getObjectofType,
    getObjectStruture,
    searchObject
};
export default objectService;