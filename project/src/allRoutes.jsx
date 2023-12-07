import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FirstPage from "./FirstPage";
import Login from "./Login";
import Cart from './Cart';
const AllRoutes = () => {
    return (
      <>
      
        <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        </Routes>
      </>
    );
};
  
export default AllRoutes;