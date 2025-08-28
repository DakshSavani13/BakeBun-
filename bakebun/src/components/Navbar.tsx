import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem, Avatar } from '@mui/material';
import { ShoppingCart, AccountCircle, Logout } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useCart } from '../CartContext';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 2rem',
});

const NavLinks = styled('div')({
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
});

const Logo = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: 'white',
  textDecoration: 'none',
});

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setUser(null);
    handleClose();
    navigate('/');
  };
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <RouterLink to="/" style={{ textDecoration: 'none' }}>
          <Logo>BakeBun</Logo>
        </RouterLink>
        <NavLinks>
          <Button color="inherit" component={RouterLink} to="/menu">
            Menu
          </Button>
          <Button color="inherit" component={RouterLink} to="/offers">
            Offers
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
          {user ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </MenuItem>
                {user.role === 'admin' && (
                  <MenuItem onClick={() => { handleClose(); navigate('/admin'); }}>
                    Admin Panel
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
          <IconButton color="inherit" component={RouterLink} to="/cart">
          <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </NavLinks>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar; 