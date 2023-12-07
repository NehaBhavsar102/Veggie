import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FirstPage from "./FirstPage";
import Login from "./Login";
import Cart from './Cart';
import { AuthProvider } from './AuthContext';
const AllRoutes = () => {
    return (
      <>
<<<<<<< HEAD

       


=======
>>>>>>> da22f3b8fb73491297d34d04e32c92e85bf06185
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