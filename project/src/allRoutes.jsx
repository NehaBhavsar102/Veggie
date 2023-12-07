import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FirstPage from "./FirstPage";
import Login from "./Login";
import Cart from './Cart';
import { AuthProvider } from './AuthContext';
const AllRoutes = () => {
    return (
      <>

       


      <AuthProvider>
        <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        </Routes>
        </AuthProvider>
      </>
    );
};
  
export default AllRoutes;