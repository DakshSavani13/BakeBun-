import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCart } from '../CartContext';

interface Pizza {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  sizes: string[];
  toppings: string[];
  category: string;
}

interface Side {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

interface Drink {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

const MenuItem = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 220,
  width: '100%',
  transition: 'transform 0.3s ease-in-out',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  display: 'block',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  [theme.breakpoints.down('sm')]: {
    height: 160,
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(120deg, #ffb347 0%, #ffcc33 100%)',
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  color: '#222',
  textAlign: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
}));

const HowItWorksSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'linear-gradient(90deg, #fff8e1 0%, #fffbe7 100%)',
  borderRadius: theme.spacing(2),
  margin: theme.spacing(4, 0),
}));

const WhyChooseSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'linear-gradient(90deg, #f5f5f5 0%, #f9f9f9 100%)',
  borderRadius: theme.spacing(2),
  margin: theme.spacing(4, 0),
}));

const Menu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [selectedSide, setSelectedSide] = useState<Side | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('Medium');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const sides: Side[] = [
    {
      id: 1,
      name: 'Garlic Breadsticks',
      description: 'Baked breadsticks with garlic flavor',
      image: '/Garlic Breadsticks.webp',
      price: 497,
      category: 'sides'
    },
    {
      id: 2,
      name: 'Stuffed Garlic Bread',
      description: 'Stuffed with mozzarella cheese, sweet corn, and jalapeños',
      image: '/Stuffed Garlic Bread.webp',
      price: 663,
      category: 'sides'
    },
    {
      id: 3,
      name: 'Paneer Tikka Stuffed Garlic Bread',
      description: 'Stuffed with cheese, onion, and paneer tikka',
      image: '/Paneer Tikka Stuffed Garlic Bread.webp',
      price: 746,
      category: 'sides'
    },
    {
      id: 4,
      name: 'Chicken Pepperoni Stuffed Garlic Bread',
      description: 'Stuffed with chicken pepperoni and cheese',
      image: '/Chicken Pepperoni Stuffed Garlic Bread.webp',
      price: 746,
      category: 'sides'
    },
    {
      id: 5,
      name: 'Cheese Jalapeno Dip',
      description: 'Creamy cheese dip spiced with jalapeno',
      image: '/Cheese Jalapeno Dip.webp',
      price: 331,
      category: 'sides'
    },
    {
      id: 6,
      name: 'Choco Lava Cake',
      description: 'Warm chocolate cake with molten chocolate filling',
      image: '/Choco Lava Cake.webp',
      price: 580,
      category: 'sides'
    }
  ];

  const drinks: Drink[] = [
    {
      id: 1,
      name: 'Coca-Cola Zero Sugar',
      description: 'Same taste, zero sugar',
      image: '/Coca-Cola Zero Sugar.webp',
      price: 248,
      category: 'drinks'
    },
    {
      id: 2,
      name: 'Diet Coke',
      description: 'Low-calorie cola',
      image: '/Diet Coke.webp',
      price: 248,
      category: 'drinks'
    },
    {
      id: 3,
      name: 'Sprite',
      description: 'Clear lemon-lime soda',
      image: '/Sprite.webp',
      price: 248,
      category: 'drinks'
    },
    {
      id: 4,
      name: 'Limca',
      description: 'Lemon-lime flavored with a unique twist',
      image: '/Limca.webp',
      price: 248,
      category: 'drinks'
    },
    {
      id: 5,
      name: 'Thums Up',
      description: 'Strong cola with bold flavor',
      image: '/Thums Up.webp',
      price: 248,
      category: 'drinks'
    },
    {
      id: 6,
      name: 'Fanta ',
      description: 'Sweet and tangy orange soda',
      image: '/Fanta.webp',
      price: 248,
      category: 'drinks'
    },
    {
      id: 8,
      name: 'Kinley Water',
      description: 'Packaged drinking water',
      image: '/Kinley Water.webp',
      price: 165,
      category: 'drinks'
    }
  ];

  const pizzas: Pizza[] = [
    {
      id: 1,
      name: 'Margherita',
      description: 'Classic single cheese topping',
      image: '/Margherita-.webp',
      price: 1078,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Cheese', 'Extra Basil', 'Extra Tomatoes', 'Extra Olive Oil'],
      category: 'vegetarian'
    },
    {
      id: 2,
      name: 'Double Cheese Margherita',
      description: 'Extra cheese for cheese lovers',
      image: '/Double Cheese Margherita.webp',
      price: 1245,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Mozzarella', 'Extra Cheddar', 'Extra Parmesan', 'Extra Basil'],
      category: 'vegetarian'
    },
    {
      id: 3,
      name: 'Farm House',
      description: 'A mix of onions, capsicum, mushrooms, and tomatoes',
      image: '/Farm House.webp',
      price: 1327,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Onions', 'Extra Capsicum', 'Extra Mushrooms', 'Extra Tomatoes', 'Extra Cheese', 'Extra Olives'],
      category: 'vegetarian'
    },
    {
      id: 4,
      name: 'Peppy Paneer',
      description: 'Paneer with crisp capsicum and spicy red pepper',
      image: '/peppy panner.webp',
      price: 1410,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Paneer', 'Extra Capsicum', 'Extra Red Pepper', 'Extra Onions', 'Extra Cheese', 'Extra Spices'],
      category: 'vegetarian'
    },
    {
      id: 5,
      name: 'Mexican Green Wave',
      description: 'Onions, capsicum, tomatoes, jalapeno with Mexican herbs',
      image: '/Mexican Green Wave.webp',
      price: 1410,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Jalapeno', 'Extra Capsicum', 'Extra Onions', 'Extra Tomatoes', 'Extra Mexican Herbs', 'Extra Cheese'],
      category: 'vegetarian'
    },
    {
      id: 6,
      name: 'Deluxe Veggie',
      description: 'Onions, capsicum, mushrooms, paneer, and golden corn',
      image: '/Deluxe Veggie.webp',
      price: 1493,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Paneer', 'Extra Corn', 'Extra Onions', 'Extra Capsicum', 'Extra Mushrooms', 'Extra Cheese'],
      category: 'vegetarian'
    },
    {
      id: 7,
      name: 'Veg Extravaganza',
      description: 'Loaded with golden corn, black olives, onions, capsicum, mushrooms, tomatoes, jalapeno, and extra cheese',
      image: '/Veg Extravaganza.webp',
      price: 1575,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Cheese', 'Extra Olives', 'Extra Corn', 'Extra Onions', 'Extra Capsicum', 'Extra Mushrooms', 'Extra Tomatoes', 'Extra Jalapeno'],
      category: 'vegetarian'
    },
    {
      id: 8,
      name: 'Paneer Makhani',
      description: 'Paneer and capsicum on Makhani sauce',
      image: '/Paneer Makhani.webp',
      price: 1493,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Paneer', 'Extra Capsicum', 'Extra Makhani Sauce', 'Extra Onions', 'Extra Cheese', 'Extra Butter'],
      category: 'vegetarian'
    },
    {
      id: 9,
      name: 'Indi Tandoori Paneer',
      description: 'Tandoori paneer with onion, red paprika, and mint mayo',
      image: '/Indi Tandoori Paneer.webp',
      price: 1575,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Paneer', 'Extra Onions', 'Extra Red Paprika', 'Extra Mint Mayo', 'Extra Cheese', 'Extra Tandoori Spices'],
      category: 'vegetarian'
    },
    {
      id: 10,
      name: 'Chicken Golden Delight',
      description: 'Barbeque chicken with golden corn and extra cheese',
      image: '/Chicken Golden Delight.webp',
      price: 1493,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra BBQ Chicken', 'Extra Corn', 'Extra Cheese', 'Extra BBQ Sauce', 'Extra Onions', 'Extra Capsicum'],
      category: 'non-vegetarian'
    },
    {
      id: 11,
      name: 'Non Veg Supreme',
      description: 'Black olives, onions, grilled mushrooms, pepper BBQ chicken, peri-peri chicken, grilled chicken rashers',
      image: '/Non Veg Supreme.webp',
      price: 1658,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra BBQ Chicken', 'Extra Peri-Peri Chicken', 'Extra Chicken Rashers', 'Extra Olives', 'Extra Onions', 'Extra Mushrooms', 'Extra Cheese'],
      category: 'non-vegetarian'
    },
    {
      id: 12,
      name: 'Chicken Dominator',
      description: 'Double pepper barbecue chicken, peri-peri chicken, chicken tikka, and grilled chicken rashers',
      image: '/Chicken Dominator.webp',
      price: 1740,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra BBQ Chicken', 'Extra Peri-Peri Chicken', 'Extra Chicken Tikka', 'Extra Chicken Rashers', 'Extra Cheese', 'Extra BBQ Sauce'],
      category: 'non-vegetarian'
    },
    {
      id: 13,
      name: 'Pepper Barbecue Chicken',
      description: 'Pepper barbecue chicken with cheese',
      image: '/Pepper Barbecue Chicken.webp',
      price: 1575,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra BBQ Chicken', 'Extra Peppers', 'Extra Cheese', 'Extra BBQ Sauce', 'Extra Onions', 'Extra Capsicum'],
      category: 'non-vegetarian'
    },
    {
      id: 14,
      name: 'Chicken Sausage',
      description: 'Chicken sausage with cheese',
      image: '/Chicken Sausage.webp',
      price: 1493,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Sausage', 'Extra Cheese', 'Extra Onions', 'Extra Peppers', 'Extra Mushrooms', 'Extra Herbs'],
      category: 'non-vegetarian'
    },
    {
      id: 15,
      name: 'Chicken Fiesta',
      description: 'Grilled chicken rashers, peri-peri chicken, onion, and capsicum',
      image: '/Chicken Fiesta.webp',
      price: 1575,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Chicken Rashers', 'Extra Peri-Peri Chicken', 'Extra Onions', 'Extra Capsicum', 'Extra Cheese', 'Extra Peri-Peri Sauce'],
      category: 'non-vegetarian'
    },
    {
      id: 16,
      name: 'Indi Chicken Tikka',
      description: 'Chicken tikka with onion, red paprika, and mint mayo',
      image: '/Indi Chicken Tikka.webp',
      price: 1658,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Chicken Tikka', 'Extra Onions', 'Extra Red Paprika', 'Extra Mint Mayo', 'Extra Cheese', 'Extra Tandoori Spices'],
      category: 'non-vegetarian'
    },
    {
      id: 17,
      name: 'Chicken Pepperoni',
      description: 'Classic chicken pepperoni with extra cheese',
      image: '/Chicken Pepperoni.webp',
      price: 1493,
      sizes: ['Small', 'Medium', 'Large'],
      toppings: ['Extra Pepperoni', 'Extra Cheese', 'Extra Onions', 'Extra Peppers', 'Extra Mushrooms', 'Extra Herbs'],
      category: 'non-vegetarian'
    }
  ];

  const handlePizzaClick = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setSelectedSide(null);
    setSelectedDrink(null);
    setSelectedSize('Medium');
    setSelectedToppings([]);
    setOpenDialog(true);
  };

  const handleSideClick = (side: Side) => {
    setSelectedSide(side);
    setSelectedPizza(null);
    setSelectedDrink(null);
    setOpenDialog(true);
  };

  const handleDrinkClick = (drink: Drink) => {
    setSelectedDrink(drink);
    setSelectedPizza(null);
    setSelectedSide(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPizza(null);
    setSelectedSide(null);
    setSelectedDrink(null);
    setSelectedSize('Medium');
    setSelectedToppings([]);
  };

  const handleToppingToggle = (topping: string) => {
    setSelectedToppings(prev => 
      prev.includes(topping)
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const calculateTotalPrice = () => {
    if (selectedPizza) {
      let basePrice = selectedPizza.price;
      // Add size price adjustment
      if (selectedSize === 'Small') basePrice -= 2;
      if (selectedSize === 'Large') basePrice += 2;
      // Add toppings price (each topping costs ₹30)
      const toppingsPrice = selectedToppings.length * 30;
      return Math.round(basePrice + toppingsPrice).toString();
    }
    if (selectedSide) return Math.round(selectedSide.price).toString();
    if (selectedDrink) return Math.round(selectedDrink.price).toString();
    return '0';
  };

  const { addToCart } = useCart();
  const handleAddToCart = () => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!storedUser) {
      alert('You must be logged in to place an order.');
      window.location.href = '/login';
      return;
    }
    if (selectedPizza) {
      addToCart({
        id: selectedPizza.id,
        name: selectedPizza.name,
        size: selectedSize,
        quantity: 1,
        price: selectedPizza.price,
        toppings: selectedToppings,
      });
    } else if (selectedSide) {
      addToCart({
        id: selectedSide.id + 1000, // offset to avoid id clash
        name: selectedSide.name,
        size: 'Regular',
        quantity: 1,
        price: selectedSide.price,
        toppings: [],
      });
    } else if (selectedDrink) {
      addToCart({
        id: selectedDrink.id + 2000, // offset to avoid id clash
        name: selectedDrink.name,
        size: 'Regular',
        quantity: 1,
        price: selectedDrink.price,
        toppings: [],
      });
    }
    handleCloseDialog();
  };

  const renderPizzaSection = (category: string) => {
    const filteredPizzas = pizzas.filter(pizza => pizza.category === category);
    const sectionTitle = category === 'vegetarian' ? 'Vegetarian Pizzas' : 'Non-Vegetarian Pizzas';

    return (
      <Box sx={{ 
        mb: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"}
          component="h2" 
          sx={{ 
            mb: 3, 
            color: 'primary.main',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            pb: 1,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          {sectionTitle}
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {filteredPizzas.map((pizza) => (
            <Grid item key={pizza.id} xs={12} sm={6} md={4}>
              <MenuItem onClick={() => handlePizzaClick(pizza)}>
                <StyledCardMedia
                  image={pizza.image}
                  title={pizza.name}
                />
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                  <Typography 
                    gutterBottom 
                    variant={isMobile ? "h6" : "h5"} 
                    component="h2"
                    sx={{ 
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {pizza.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {pizza.description}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="primary"
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    ₹{pizza.price}
                  </Typography>
                </CardContent>
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderSidesSection = () => {
    return (
      <Box sx={{ 
        mb: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"}
          component="h2" 
          sx={{ 
            mb: 3, 
            color: 'primary.main',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            pb: 1,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Sides & More
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {sides.map((side) => (
            <Grid item key={side.id} xs={12} sm={6} md={4}>
              <MenuItem onClick={() => handleSideClick(side)}>
                <StyledCardMedia
                  image={side.image}
                  title={side.name}
                />
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                  <Typography 
                    gutterBottom 
                    variant={isMobile ? "h6" : "h5"} 
                    component="h2"
                    sx={{ 
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {side.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {side.description}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="primary"
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    ₹{side.price}
                  </Typography>
                </CardContent>
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderDrinksSection = () => {
    return (
      <Box sx={{ 
        mb: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"}
          component="h2" 
          sx={{ 
            mb: 3, 
            color: 'primary.main',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            pb: 1,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          🥤 Cold Drinks
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {drinks.map((drink) => (
            <Grid item key={drink.id} xs={12} sm={6} md={3}>
              <MenuItem onClick={() => handleDrinkClick(drink)}>
                <StyledCardMedia
                  image={drink.image}
                  title={drink.name}
                />
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                  <Typography 
                    gutterBottom 
                    variant={isMobile ? "h6" : "h5"} 
                    component="h2"
                    sx={{ 
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {drink.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {drink.description}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="primary"
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                  >
                    ₹{drink.price}
                  </Typography>
                </CardContent>
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Typography 
        variant={isMobile ? "h4" : "h3"} 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{
          mb: { xs: 4, sm: 6 },
          fontWeight: 700,
          color: 'primary.main'
        }}
      >
        Our Menu
      </Typography>
      {renderPizzaSection('vegetarian')}
      {renderPizzaSection('non-vegetarian')}
      {renderSidesSection()}
      {renderDrinksSection()}

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: { xs: 1, sm: 2 }
          }
        }}
      >
        {selectedPizza && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                {selectedPizza.name}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Size</FormLabel>
                  <RadioGroup 
                    row 
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    sx={{ 
                      flexWrap: { xs: 'wrap', sm: 'nowrap' },
                      gap: { xs: 1, sm: 2 }
                    }}
                  >
                    {selectedPizza.sizes.map((size) => (
                      <FormControlLabel
                        key={size}
                        value={size}
                        control={<Radio />}
                        label={size}
                        sx={{ 
                          flex: { xs: '1 1 auto', sm: '1' },
                          minWidth: { xs: '45%', sm: 'auto' }
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Extra Toppings (₹30 each)
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1,
                  mb: 2
                }}>
                  {selectedPizza.toppings.map((topping) => (
                    <StyledChip
                      key={topping}
                      label={topping}
                      onClick={() => handleToppingToggle(topping)}
                      color={selectedToppings.includes(topping) ? "primary" : "default"}
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{ 
                mt: 2,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  Total: ₹{calculateTotalPrice()}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button 
                onClick={handleCloseDialog}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddToCart} 
                variant="contained" 
                color="primary"
                sx={{ 
                  px: 3,
                  fontWeight: 600
                }}
              >
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
        {selectedSide && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                {selectedSide.name}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedSide.description}
              </Typography>
              <Box sx={{ 
                mt: 2,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  ₹{selectedSide.price}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button 
                onClick={handleCloseDialog}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddToCart} 
                variant="contained" 
                color="primary"
                sx={{ 
                  px: 3,
                  fontWeight: 600
                }}
              >
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
        {selectedDrink && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                {selectedDrink.name}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedDrink.description}
              </Typography>
              <Box sx={{ 
                mt: 2,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  ₹{selectedDrink.price}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button 
                onClick={handleCloseDialog}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddToCart} 
                variant="contained" 
                color="primary"
                sx={{ 
                  px: 3,
                  fontWeight: 600
                }}
              >
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Menu; 