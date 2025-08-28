import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

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
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <IconButton color="inherit" component={RouterLink} to="/cart">
            <Badge badgeContent={0} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </NavLinks>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar; 