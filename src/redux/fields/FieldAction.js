import axios from "axios";

const createField = async (FieldData) => {
  console.log(FieldData);
  const reponces = await axios.post(`https://localhost:7241/addField`,JSON.stringify({
    "FieldName":FieldData.FieldName,
    "AddedBy":FieldData.AddedBy
  }),{
  headers:{
    'Content-Type':'application/json',
  }});
  return reponces.data;
};
const getAllFields = async () => {
    const reponces = await axios.get(`https://localhost:7241/getAllFields`);
    return reponces.data;
  };

  const addFieldToObjectObj = async (FieldData) => {
    console.log(FieldData);
    const reponces = await axios.get(`https://localhost:7241/addFieldToObject?fieldId=${FieldData.fieldId}&objectId=${FieldData.objectId}`);
    return reponces.data;
  };


const fieldService = {
    createField,
    getAllFields,
    addFieldToObjectObj
};
export default fieldService;