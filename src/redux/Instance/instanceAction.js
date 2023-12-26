
import axios from "axios";

const getObjectInstances = async (objectId) => {
    const reponces = await axios.get(`https://localhost:7241/getObjectInstances?objectId=${objectId}`);
  
    console.log(reponces.data);
    return reponces.data;
  };
  const getObjInstances = async (data) => {
    console.log(data);
  //  https://localhost:7241/getInstances?objectId=${data.objectId}&page=${data.page}&pageSize=${data.pageSize}
    const reponces = await axios.get(`https://localhost:7241/getInstances?objectId=${data.objectId}&page=${data.page}&pageSize=${data.pageSize}`);
    
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
    getObjInstances
};
export default instanceService;