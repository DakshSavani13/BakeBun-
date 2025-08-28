
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StarIcon from '@mui/icons-material/Star';
import { useCart } from '../CartContext';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Chip from '@mui/material/Chip';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)',
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  color: '#222',
  textAlign: 'center',
  justifyContent: 'center',
}));

const HowItWorksSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#fff8e1',
}));

const WhyChooseSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#f5f5f5',
}));

const TestimonialsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#fff8e1',
}));

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState<any>(null);
  const [selectedToppings, setSelectedToppings] = React.useState<string[]>([]);

  const allToppings = [
    'Extra Cheese', 'Extra Basil', 'Extra Tomatoes', 'Extra Olive Oil',
    'Extra Mozzarella', 'Extra Cheddar', 'Extra Parmesan',
    'Extra Onions', 'Extra Capsicum', 'Extra Mushrooms', 'Extra Jalapeno',
    'Extra Paneer', 'Extra Corn', 'Extra Red Pepper', 'Extra Spices',
    'Extra Olives', 'Extra Makhani Sauce', 'Extra Butter', 'Extra BBQ Chicken',
    'Extra Peri-Peri Chicken', 'Extra Chicken Rashers', 'Extra Chicken Tikka',
    'Extra Peppers', 'Extra Herbs', 'Extra Mint Mayo', 'Extra Tandoori Spices',
    'Extra BBQ Sauce', 'Extra Mexican Herbs', 'Extra Tomatoes'
  ];

  const testimonials = [
    {
      name: 'Amit S.',
      text: 'Best pizza delivery in town! Always hot and fresh.',
      avatar: '',
    },
    {
      name: 'Priya K.',
      text: 'Love the variety and the quick service. Highly recommend BakeBun!',
      avatar: '',
    },
    {
      name: 'Rahul D.',
      text: 'The crust is perfect and the toppings are generous. 5 stars!',
      avatar: '',
    },
  ];

  const handlePizzaClick = (pizza: any) => {
    setSelectedPizza(pizza);
    setSelectedToppings([]);
    setDialogOpen(true);
  };

  const handleToppingToggle = (topping: string) => {
    setSelectedToppings(prev =>
      prev.includes(topping)
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const handleDialogAddToCart = () => {
    if (selectedPizza) {
      addToCart({
        id: selectedPizza.id,
        name: selectedPizza.name,
        size: 'Medium',
        quantity: 1,
        price: selectedPizza.price,
        toppings: selectedToppings,
      });
      setSnackbarMsg(`${selectedPizza.name} added to cart!`);
      setSnackbarOpen(true);
    }
    setDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#222' }}>
            Welcome to BakeBun
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: '#444' }}>
            Delicious pizzas, delivered hot & fresh to your doorstep
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/menu')}
            sx={{ mt: 4, px: 6, py: 2, fontSize: '1.2rem', borderRadius: 3 }}
          >
            Order Now
          </Button>
        </Container>
      </HeroSection>

      <HowItWorksSection>
        <Container>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
            How It Works
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <LocalPizzaIcon sx={{ fontSize: 48, color: '#ff9800' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>Choose Your Pizza</Typography>
                <Typography color="text.secondary">Browse our menu and pick your favorite pizza and sides.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <DeliveryDiningIcon sx={{ fontSize: 48, color: '#43a047' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>Fast Delivery</Typography>
                <Typography color="text.secondary">We deliver your order hot and fresh, right to your door.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <StarIcon sx={{ fontSize: 48, color: '#fbc02d' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>Enjoy & Rate Us</Typography>
                <Typography color="text.secondary">Enjoy your meal and let us know how we did!</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HowItWorksSection>

      <WhyChooseSection>
        <Container>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
            Why Choose BakeBun?
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <img src="/pizza-icon.svg" alt="Quality" width={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>Premium Ingredients</Typography>
                <Typography color="text.secondary">We use only the freshest and highest quality ingredients for every pizza.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <img src="/vite.svg" alt="Fast" width={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>Lightning Fast</Typography>
                <Typography color="text.secondary">Our delivery is super quick so you never have to wait long for your meal.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <img src="/placeholder.svg" alt="Variety" width={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>Great Variety</Typography>
                <Typography color="text.secondary">From classic Margherita to spicy specials, we have something for everyone.</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </WhyChooseSection>

      <TestimonialsSection>
        <Container>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
            What Our Customers Say
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
            {testimonials.map((t, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: '#ffb347', mx: 'auto', mb: 2 }}>{t.name[0]}</Avatar>
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    "{t.text}"
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 2, color: '#888' }}>
                    – {t.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </TestimonialsSection>
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Select Toppings for {selectedPizza?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {allToppings.map((topping) => (
              <Chip
                key={topping}
                label={topping}
                onClick={() => handleToppingToggle(topping)}
                color={selectedToppings.includes(topping) ? "primary" : "default"}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined">Cancel</Button>
          <Button onClick={handleDialogAddToCart} variant="contained" color="primary">Add to Cart</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Home; 