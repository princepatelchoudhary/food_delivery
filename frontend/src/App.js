import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './screen/Home.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screen/login.jsx';
import Signup from './screen/signup.jsx';
import MyOrder from './screen/myOrder.jsx';
// import Cart from './screen/cart.jsx/index.js';

function App() {

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/myorder" element={<MyOrder />} />
          {/* <Route exact path='/cart' element={<Cart/>}/> */}
        </Routes>
    </Router>
  );
}

export default App;
