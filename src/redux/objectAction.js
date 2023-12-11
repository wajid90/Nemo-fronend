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


const objectService = {
    getAllObjects,
    getObjectofType,
    getObjectStruture
};
export default objectService;