import axios from "axios";

const register = async (userData) => {
    const response = await axios.post('/api/users/register', userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  }


const login = async(user)=>{
    const {data} = await axios.post('/api/users/login',user)
    if (data) {
        localStorage.setItem('user', JSON.stringify(data))
      }
      return data
}


const userService = {
    register,
    login
  }

export default userService