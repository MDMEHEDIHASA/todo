import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import FeedbackList from "../components/FeedbackList";
import FeedbackStats from "../components/FeedbackStats";
import FeedbackForm from "../components/FeedbackForm";
import Loader from "../components/Loader";

function HomeScreen() {
    const navigate = useNavigate()
    const {isLoading,user} = useSelector(state=>state.userAuth)
    useEffect(()=>{
        if(user ===null){
            navigate('/login')
        }
    },[user,navigate])
  return isLoading ? <Loader/> :(
    <div className="container">
      <FeedbackForm />
      <FeedbackStats />
      <FeedbackList />
    </div>
  );
}

export default HomeScreen;
