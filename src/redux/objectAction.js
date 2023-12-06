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

const objectService = {
    getAllObjectsType,
    getAllObjects,
    getObjectInstances
};
export default objectService;