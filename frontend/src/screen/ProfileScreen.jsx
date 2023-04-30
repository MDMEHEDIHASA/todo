import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';



const ProfileScreen = ()=>{
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    
    
    //console.log(redirect);
    const dispatch = useDispatch();
    
    const {isLoading,isError,message,user} = useSelector(state=>state.userAuth);
    
    return isLoading ? <Loader/> : (<div>
        {/* <Meta title='SIGN IN'/> */}
        <FormContainer>
            <h1>Profile</h1>
            {isError && <Message>{message}</Message>}
            <Form>
                <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Your email" value={user.email} />
                </Form.Group>
                <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Your name" value={user.name} />
                </Form.Group>
                <Link to='/'>
                <Button type="submit" className='mt-3' variant="primary">Go Back</Button>
                </Link>
                
            </Form>
            
        </FormContainer>
    </div>)
}


export default ProfileScreen;

