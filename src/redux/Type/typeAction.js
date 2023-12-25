import axios from "axios";


const getAllObjectsType = async () => {
  const reponces = await axios.get(`https://localhost:7241/getAllObjectTypes`);

  return reponces.data;
};

const getAllPaginationType = async (data) => {
  const reponces = await axios.get(`https://localhost:7241/getAllTypes?pageSize=${data.pageSize}&pageNumber=${data.pageNumber}`);

  return reponces.data;
};

const getObjectofType = async (objectType) => {
    console.log(objectType);
    const reponces = await axios.get(`https://localhost:7241/getObjectsofType?typeName=${objectType}`);
    return reponces.data;
  };
  const addObjectType = async (objectType) => {
    console.log(objectType);
    const reponces = await axios.post(`https://localhost:7241/addObjectType`,JSON.stringify( {
      "ObjectTypeName":objectType.objectType,
      "AddedBy":objectType.createdBy}),{
    headers:{
      'Content-Type':'application/json',
    }});
    return reponces.data;
  };

  const typeService = {
    getAllObjectsType,
    getObjectofType,
    addObjectType,
    getAllPaginationType
};
export default typeService;