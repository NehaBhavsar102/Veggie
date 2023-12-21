import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FirstPage from "./FirstPage";
import Login from "./Login";
import Cart from './Cart';
import { AuthProvider } from './AuthContext';
import OrderSuccess from './OrderSuccess';
const AllRoutes = () => {
    return (
      <>


       



      <AuthProvider>
        <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<OrderSuccess />} />
        </Routes>
        </AuthProvider>
      </>
    );
};
  
export default AllRoutes;