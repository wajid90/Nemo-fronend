import axios from "axios";


const getAllObjectsType = async () => {
  const reponces = await axios.get(`https://localhost:7241/getAllObjectTypes`);

  return reponces.data;
};


const getAllObjects = async () => {
  const reponces = await axios.get(`https://localhost:7241/getAllObjects`);
  return reponces.data;
};

const getObjectInstances = async (objectId) => {
  const reponces = await axios.get(`https://localhost:7241/getObjectInstances?objectId=${objectId}`);

  console.log(reponces.data);
  return reponces.data;
};
const getObjectofType = async (objectType) => {
  console.log(objectType);
  const reponces = await axios.get(`https://localhost:7241/getObjectsofType?typeName=${objectType}`);
  return reponces.data;
};
const getInstanceByObjectName = async (objectName) => {
 
  const reponces = await axios.get(`https://localhost:7241/getInstanceByObjectName?objectName=${objectName}`);
  console.log(reponces.data);
  return reponces.data;
};



const objectService = {
    getAllObjectsType,
    getAllObjects,
    getObjectInstances,
    getObjectofType,
    getInstanceByObjectName
};
export default objectService;