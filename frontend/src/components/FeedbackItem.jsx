import React from 'react'
import {FaPenSquare,FaTrash} from 'react-icons/fa'
import { useDispatch,useSelector } from 'react-redux'
import { removeProduct,editProductId } from '../features/product/productSlice'
import Loader from './Loader'
import Card from './shared/Card'



function FeedbackItem({item}) {
    
    
    const dispatch = useDispatch()
    const {isLoading} = useSelector(state=>state.product) 



    const deleteItem = (id)=>{
      if(window.confirm('Are you sure you want to delete this item.')){
        dispatch(removeProduct(id))
      }
      window.location.reload(false)
    }

    
    const handleEdit = (item)=>{
      //console.log(item)
      
      dispatch(editProductId({item,edit:true}))
    }

  
  return isLoading ? <Loader/>  :(
    <Card reverse={false}>
        
        <div className='num-display'>{item.rating}</div>

        <button onClick={()=>handleEdit(item)} className='edit'>
          <FaPenSquare/>
        </button>
        
        <button onClick={()=>deleteItem(item.id)} className='close'>
          <FaTrash/>
        </button>
        <div className='card-display'>{item.title}</div>
    </Card>
  )
}


// FeedbackItem.propTypes={
//   item:PropTypes.object.isRequired
// }

export default FeedbackItem