import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    items:[],
    isError:false,
    isLoading:false,
    message:'',
    succeess:false,
    newItem:{},
    editItem:{}
}


// get all items
export const getProducts = createAsyncThunk(
    'api/products/allproducts',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().userAuth.user.token;
        return await productService.getAllProducts(token)
      } catch (error) {
        const message = error.response  && error.response.data.message ? error.response.data.message : error.message
        return  thunkAPI.rejectWithValue(message)
      }
    }
  )

  // remove item
export const removeProduct = createAsyncThunk(
  'api/products/deleteproduct/:id',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth.user.token;
      return await productService.deleteItem(token,id)
    } catch (error) {
      const message = error.response  && error.response.data.message ? error.response.data.message : error.message
      return  thunkAPI.rejectWithValue(message)
    }
  }
)

//add item
export const addProduct = createAsyncThunk(
  'api/products/createproduct',
  async (item, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth.user.token;
      return await productService.createItem(token,item)
    } catch (error) {
      const message = error.response  && error.response.data.message ? error.response.data.message : error.message
      return  thunkAPI.rejectWithValue(message)
    }
  }
)

export const editProductId = createAsyncThunk('editId',async(item)=>{
  return item
})

export const updateProductItem = createAsyncThunk('/api/products/updateProduct',async(updateItemWithId,thunkAPI)=>{
  try {
    const token = thunkAPI.getState().userAuth.user.token;
    return await productService.updateItem(token,updateItemWithId)
  } catch (error) {
    const message = error.response  && error.response.data.message ? error.response.data.message : error.message
    return  thunkAPI.rejectWithValue(message)
  }
})


export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
      
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getProducts.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getProducts.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
            state.message = ''
          })
          .addCase(getProducts.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(removeProduct.pending, (state) => {
            state.isLoading = true
          })
          .addCase(removeProduct.fulfilled, (state, action) => {
            state.succeess = action.payload
            state.isLoading = false
            state.message = ''
          })
          .addCase(removeProduct.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(addProduct.pending, (state) => {
            state.isLoading = true
          })
          .addCase(addProduct.fulfilled, (state, action) => {
            state.newItem = action.payload
            state.isLoading = false
            state.message = ''
          })
          .addCase(addProduct.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(editProductId.fulfilled,(state,action)=>{
            state.editItem = action.payload
          })
          .addCase(updateProductItem.pending, (state) => {
            state.isLoading = true
          })
          .addCase(updateProductItem.fulfilled, (state, action) => {
            state.newItem = action.payload
            state.isLoading = false
            state.message = ''
          })
          .addCase(updateProductItem.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
    }

})



export default productSlice.reducer