import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import Languages from './pages/Languages';
import PrivateRoute from './components/PrivateRoute';
import Payment from './pages/Payment';
import Identity from './pages/Identity';
import Dashboard from './pages/Dashboard';
import CreateTest from './pages/CreateTest';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<PrivateRoute />} >
          <Route path='/' element={<Dashboard />} />
        </Route>
        <Route path='/about' element={<PrivateRoute />} >
          <Route path='/about' element={<About />} />
        </Route>
        <Route path='/contact-info/my' element={<PrivateRoute />} >
          <Route path='/contact-info/my' element={<Contact />} />
        </Route>
        <Route path='/languages' element={<PrivateRoute />} >
          <Route path='/languages' element={<Languages />} />
        </Route>
        <Route path='/payment-info' element={<PrivateRoute />} >
          <Route path='/payment-info' element={<Payment />} />
        </Route>
        {/* <Route path='/identity-verification-center' element={<PrivateRoute />} >
          <Route path='/identity-verification-center' element={<Identity />} />
        </Route> */}
        <Route path='/languages/create-test' element={<PrivateRoute />} >
          <Route path='/languages/create-test' element={<CreateTest />} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </Router>

    <ToastContainer />
    </>
  )
}

export default App;
