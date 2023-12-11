import axios from "axios";


const getAllObjectsType = async () => {
  const reponces = await axios.get(`https://localhost:7241/getAllObjectTypes`);

  return reponces.data;
};

const getObjectofType = async (objectType) => {
    console.log(objectType);
    const reponces = await axios.get(`https://localhost:7241/getObjectsofType?typeName=${objectType}`);
    return reponces.data;
  };

  const typeService = {
    getAllObjectsType,
    getObjectofType,

};
export default typeService;