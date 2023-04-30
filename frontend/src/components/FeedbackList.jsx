
import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import { getProducts } from '../features/product/productSlice'
import FeedbackItem from "./FeedbackItem";
import Loader from "./Loader";



function FeedbackList() {
    const dispatch = useDispatch()

    const {isLoading,items,success} = useSelector(state=>state.product)

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch,success])
   
   

  return isLoading ? <Loader/> : items.length===0?<p>No Feedback item yet</p> : items.map((item) => {
    return (<FeedbackItem key={item.id} item={item}/>);
  });
}




export default FeedbackList;
