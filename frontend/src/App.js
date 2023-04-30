import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from "./components/Header";
import {Container} from 'react-bootstrap'
import LogInScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import HomeScreen from './screen/HomeScreen';
import ProfileScreen from './screen/ProfileScreen';

function App() {
  return (
    <>
    <Router>
    <Header/>
    <main>
      <Container>
        <Routes>
        <Route path='/register' exact element={<RegisterScreen/>}></Route>
        <Route path='/login' exact element={<LogInScreen/>}></Route>
        <Route path='/profile' exact element={<ProfileScreen/>}></Route>
        <Route path='/'   element={<HomeScreen/>}></Route>
        </Routes>
      </Container>
    
    
    </main>
      
    </Router>
    
    </>
  );
}

export default App;
