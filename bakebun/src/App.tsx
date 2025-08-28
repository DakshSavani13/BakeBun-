import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { CartProvider } from './CartContext';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import About from './pages/About';
import Receipt from './pages/Receipt';
import Offers from './pages/Offers';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminMenuItems from './pages/AdminMenuItems';
import AdminOrders from './pages/AdminOrders';
import AdminSettings from './pages/AdminSettings';
import AdminLayout from './components/AdminLayout';
import AdminGuard from './components/AdminGuard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4B2B',
    },
    secondary: {
      main: '#FFB800',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminGuard>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminGuard>
            } />
            <Route path="/admin/users" element={
              <AdminGuard>
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </AdminGuard>
            } />
            <Route path="/admin/menu" element={
              <AdminGuard>
                <AdminLayout>
                  <AdminMenuItems />
                </AdminLayout>
              </AdminGuard>
            } />
            <Route path="/admin/orders" element={
              <AdminGuard>
                <AdminLayout>
                  <AdminOrders />
                </AdminLayout>
              </AdminGuard>
            } />
            <Route path="/admin/settings" element={
              <AdminGuard>
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </AdminGuard>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App; 