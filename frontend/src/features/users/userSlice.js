import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
    user:JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):null,
    isError:false,
    isLoading:false,
    message:'',
    
    
}

// Register new user
export const register = createAsyncThunk(
    'api/users',
    async (user, thunkAPI) => {
      try {
        return await userService.register(user)
      } catch (error) {
        const message = error.response  && error.response.data.message ? error.response.data.message : error.message
        return  thunkAPI.rejectWithValue(message)
      }
    }
  )
  
  // Login user
  export const login = createAsyncThunk('/api/users/login', async (user, thunkAPI) => {
    try {
        
        return await userService.login(user)
    } catch (error) {
        const message = error.response  && error.response.data.message ? error.response.data.message : error.message
        return  thunkAPI.rejectWithValue(message)
    }
  })


  
  export const userSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
      logout: (state) => {
        localStorage.removeItem('user')
        state.user = null
      },
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
          state.user = action.payload
          state.isLoading = false
          state.message = ''
        })
        .addCase(register.rejected, (state,action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(login.pending, (state) => {
          state.isLoading = false
        })
        .addCase(login.fulfilled, (state, action) => {
          state.user = action.payload
          state.isLoading = false
        })
        .addCase(login.rejected, (state,action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        
    },
  })
  
  export const {logout} = userSlice.actions
  export default userSlice.reducer