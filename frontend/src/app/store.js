import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../../src/features/users/userSlice'
import productReducer from '../../src/features/product/productSlice'



export const store = configureStore({
    reducer:{
        userAuth:userReducer,
        product:productReducer,
    }
})