import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
