import React,{useState,useEffect} from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {register} from '../features/users/userSlice';




const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message2, setMessage2] = useState(null)
  
    const dispatch = useDispatch()
    const search  = useLocation().search
    const navigate = useNavigate()
  
    const { isLoading, isError,user,message } = useSelector(state => state.userAuth)
  
    const redirect = search ? search.split('=')[1] : '/'
  
    useEffect(() => {
      if (user) {
        navigate(redirect)
      }
    }, [navigate, user, redirect])
  
    const submitHandler = (e) => {
      e.preventDefault();
      if(password.length < 5){
        setMessage2("password must be greater or equal to 5 character.");
        return;
      }
      if (password !== confirmPassword) {
        setMessage2('Passwords do not match')
        return
      }
      if(name === '' || email=== '' || password === '' || confirmPassword===''){
        setMessage2("Cannot be empty.")
        return
      }
      else if(name === '' && email=== '' && password === '' && confirmPassword==='') {
          navigate('/register');
        }
      else{
        dispatch(register({name, email, password}))
      }
    }
  
    return (
      <FormContainer>
        
        <h1>Sign Up</h1>
        {message2 && <Message>{message2}</Message>}
        {isError && <Message>{message}</Message>}
        {isLoading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Button type='submit' className='mt-3' variant='primary'>
            Register
          </Button>
        </Form>
  
        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    )
  }
  
  export default RegisterScreen



























