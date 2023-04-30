import axios from "axios";

const getAllProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
    const {data} = await axios.get('/api/products/allproducts',config)
    return data
  }

const deleteItem = async(token,id)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} =  await axios.delete(`/api/products/deleteproduct/${id}`,config)
  return data
}

const createItem = async(token,item)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.post(`/api/products/createproduct`,item,config)
  return data
}


const updateItem = async(token,item)=>{

  const {id,newFeedback} = item
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const {data} = await axios.put(`/api/products/updateproduct/${id}`,newFeedback,config)
  return data
}

  const productService = {
    getAllProducts,
    deleteItem,
    createItem,
    updateItem,
    
  }

export default productService