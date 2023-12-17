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
    if(data.formValues && data.formValues.length>0 && data.formValues[0].newFieldName!==""){
      let newData=`https://localhost:7241/searchObject?objectName=${data.objectName}&objectType=${data.objectType}&FieldName=${data.FieldName}&FieldValue=${data.fieldValue}&Oper=${data.Oper}&conj=${data.conj}&FieldName2=${data.FieldName2}&FieldValue2=${data.fieldValue2}&Oper2=${data.Oper2}`;
      for(let i=0;i<data.formValues.length;i++){
        newData+=`&newConj=${data[i].conj}&newFieldName=${data[i].newFieldName}&newFieldValue=${data[i].newFieldValue}&newOperator=${data[i].newFieldOperator}`
      }
      const reponces1 = await axios.get(newData);
      console.log(reponces1.data);
      return reponces1.data;

    }else{
      const reponces2 = await axios.get(`https://localhost:7241/searchObject?objectName=${data.objectName}&objectType=${data.objectType}&FieldName=${data.FieldName}&FieldValue=${data.fieldValue}&Oper=${data.Oper}&conj=${data.conj}&FieldName2=${data.FieldName2}&FieldValue2=${data.fieldValue2}&Oper2=${data.Oper2}`);
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