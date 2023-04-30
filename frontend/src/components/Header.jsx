import React from 'react'
import PropTypes from 'prop-types'
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { logout } from '../features/users/userSlice';

function Header({text,bgColor,txtColor}) {
    const headerStyles = {
        backgroundColor:bgColor,
        color:txtColor
    }

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user} = useSelector(state=>state.userAuth);
  const logOut = ()=>{
    dispatch(logout());
    navigate('/')
    window.location.reload(false)
  };
  return (
    <header style={headerStyles}>
        <div className='container'>
            <h2 className='text-center text-white'>{text}</h2>
        </div>
        {user&&(
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                    <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                </NavDropdown>
              )}
    </header>
  )
}

Header.defaultProps={
    text:'Todo  UI',
    bgColor:'rgba(0,0,0,0.4)',
    txtColor:'#ff6a95'
}


Header.propTypes={
    text:PropTypes.string,
    bgColor:PropTypes.string,
    txtColor:PropTypes.string,
}

export default Header