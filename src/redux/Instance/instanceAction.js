
import axios from "axios";

const getObjectInstances = async (objectId) => {
    const reponces = await axios.get(`https://localhost:7241/getObjectInstances?objectId=${objectId}`);
  
    console.log(reponces.data);
    return reponces.data;
  };
  const getInstanceByObjectName = async (objectName) => {
   
    const reponces = await axios.get(`https://localhost:7241/getObjectInstances?objectId=${objectName}`);
    console.log(reponces.data);
    return reponces.data;
  };


const instanceService = {
    getObjectInstances,
    getInstanceByObjectName,
};
export default instanceService;