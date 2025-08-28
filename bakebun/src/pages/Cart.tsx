import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Divider,
  Snackbar,
  Alert,
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
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CartItem = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

interface CartItem {
  id: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
  toppings: string[];
}

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateCartItem, clearCart, addToCart } = useCart();
  const [savedForLater, setSavedForLater] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('savedForLater');
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem('savedForLater', JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    const storedPromo = localStorage.getItem('promoCode');
    if (storedPromo && storedPromo !== 'SWIGGY8489' && !promoCode) setPromoCode(storedPromo);
  }, []);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [undoItem, setUndoItem] = useState<CartItem | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<CartItem | null>(null);
  const [editSize, setEditSize] = useState('');
  const [editToppings, setEditToppings] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [venue, setVenue] = useState('');
  const [venueError, setVenueError] = useState('');

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const handleBatchRemove = () => {
    selectedItems.forEach(id => removeFromCart(id));
    setSelectedItems([]);
  };

  const handleBatchSaveForLater = () => {
    const toSave = cartItems.filter(item => selectedItems.includes(item.id));
    setSavedForLater(prev => [...prev, ...toSave]);
    toSave.forEach(item => removeFromCart(item.id));
    setSelectedItems([]);
  };

  const handleSaveForLater = (item: CartItem) => {
    setSavedForLater(prev => [...prev, item]);
    removeFromCart(item.id);
  };

  const handleMoveToCart = (item: CartItem) => {
    addToCart(item);
    setSavedForLater(prev => prev.filter(i => i.id !== item.id));
  };

  const handleRemoveSaved = (id: number) => {
    setSavedForLater(prev => prev.filter(i => i.id !== id));
  };

  const pizzaSizes = ['Small', 'Medium', 'Large'];
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

  const updateQuantity = (id: number, change: number) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + change);
    updateCartItem(id, { quantity: newQty });
  };

  const removeItem = (id: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item) setUndoItem(item);
    removeFromCart(id);
    setAlertMessage('Item removed from cart');
    setShowAlert(true);
  };

  const handleUndo = () => {
    if (undoItem) {
      updateCartItem(undoItem.id, undoItem);
      setUndoItem(null);
      setShowAlert(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.05); // 5% GST
  };

  const calculateDelivery = () => (cartItems.length > 0 ? 40 : 0);

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateDelivery();
  };

  // Estimate delivery time: 30 min + 2 min per item
  const estimatedDeliveryTime = 30 + cartItems.reduce((sum, item) => sum + item.quantity, 0) * 2;

  // Add offers array for promo code logic
  const offers = [
    { promoCode: 'TRYNEW', percent: 60, maxDiscount: 120, minOrder: 159 },
    { promoCode: 'WELCOME50', percent: 50, maxDiscount: 100, minOrder: 149 },
    { promoCode: 'BAKEBUNIT', percent: 50, maxDiscount: 100, minOrder: 179 },
    { promoCode: 'AXIS120', percent: 100, maxDiscount: 120, minOrder: 500 },
    { promoCode: 'AXIS200', percent: 100, maxDiscount: 200, minOrder: 1000 },
    { promoCode: 'AMEXCORP', percent: 20, maxDiscount: 150, minOrder: 0 },
    { promoCode: 'INDUS75', percent: 100, maxDiscount: 75, minOrder: 300 },
    { promoCode: 'DINEOUT', percent: 100, maxDiscount: 200, minOrder: 1500 },
    { promoCode: 'CARNIVAL', percent: 100, maxDiscount: 175, minOrder: 0 },
    { promoCode: 'ONECARD', percent: 100, maxDiscount: 30, minOrder: 299 },
  ];

  // Promo code logic
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    const offer = offers.find(o => o.promoCode === code);
    const subtotal = calculateSubtotal();
    if (offer) {
      if (subtotal >= offer.minOrder) {
        let discountValue = Math.round(subtotal * (offer.percent / 100));
        if (discountValue > offer.maxDiscount) discountValue = offer.maxDiscount;
        setDiscount(discountValue);
        setPromoError('');
      } else {
        setDiscount(0);
        setPromoError(`Min order ₹${offer.minOrder} required for this code.`);
      }
    } else if (code !== '') {
      setDiscount(0);
      setPromoError('Invalid promo code');
    } else {
      setDiscount(0);
      setPromoError('');
    }
  };

  const calculateTotalWithDiscount = () => {
    return calculateTotal() - discount;
  };

  const handleCheckout = () => {
    if (!venue.trim()) {
      setVenueError('Delivery venue is required');
      return;
    }
    setVenueError('');
    const orderDetails = {
      items: cartItems,
      total: calculateTotalWithDiscount(),
      orderNumber: Math.floor(Math.random() * 1000000).toString(),
      date: new Date().toLocaleDateString(),
      specialInstructions,
      estimatedDeliveryTime,
      promoCode,
      discount,
      venue,
    };
    navigate('/receipt', { state: { orderDetails } });
  };

  const handleEditClick = (item: CartItem) => {
    setEditItem(item);
    setEditSize(item.size);
    setEditToppings(item.toppings);
    setEditDialogOpen(true);
  };

  const handleEditToppingToggle = (topping: string) => {
    setEditToppings(prev =>
      prev.includes(topping)
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const handleEditSave = () => {
    if (editItem) {
      updateCartItem(editItem.id, { size: editSize, toppings: editToppings });
    }
    setEditDialogOpen(false);
    setEditItem(null);
  };

  const handleEditCancel = () => {
    setEditDialogOpen(false);
    setEditItem(null);
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/menu')}
          >
            Browse Menu
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center" mb={2}>
              <Checkbox
                checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                indeterminate={selectedItems.length > 0 && selectedItems.length < cartItems.length}
                onChange={handleSelectAll}
                sx={{ mr: 1 }}
              />
              <Typography>Select All</Typography>
              <Button size="small" variant="outlined" sx={{ ml: 2 }} onClick={handleBatchRemove} disabled={selectedItems.length === 0}>Remove Selected</Button>
              <Button size="small" variant="outlined" sx={{ ml: 1 }} onClick={handleBatchSaveForLater} disabled={selectedItems.length === 0}>Save Selected for Later</Button>
            </Box>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    sx={{ ml: 1 }}
                  />
                </Box>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {item.size}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Toppings: {item.toppings.join(', ')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleEditClick(item)} disabled={item.toppings.length === 0 && item.size === ''}>
                          Edit
                        </Button>
                        <IconButton 
                          size="small"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Remove />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <IconButton 
                          size="small"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Add />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>
                          ₹{item.price * item.quantity}
                        </Typography>
                        <Button size="small" variant="text" color="secondary" sx={{ mr: 1 }} onClick={() => handleSaveForLater(item)}>
                          Save for Later
                        </Button>
                        <IconButton 
                          color="error"
                          onClick={() => removeItem(item.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </CartItem>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Button variant="outlined" color="error" fullWidth sx={{ mb: 2 }} onClick={clearCart} disabled={cartItems.length === 0}>
                  Clear Cart
                </Button>
                <Box sx={{ my: 2 }}>
                  <TextField
                    label="Delivery Venue"
                    fullWidth
                    required
                    value={venue}
                    onChange={e => setVenue(e.target.value)}
                    error={!!venueError}
                    helperText={venueError || 'E.g. Home, Office, Hostel, etc.'}
                    sx={{ mb: 2 }}
                  />
                  <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                      label="Promo Code"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      error={!!promoError}
                      helperText={promoError || 'Use SAVE10 for 10% off'}
                      sx={{ mr: 2, flex: 1 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button onClick={handleApplyPromo} variant="contained" color="primary" size="small">Apply</Button>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography>Estimated Delivery</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{estimatedDeliveryTime} min</Typography>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography>Subtotal</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>₹{calculateSubtotal()}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography>GST (5%)</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>₹{calculateTax()}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography>Delivery</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>₹{calculateDelivery()}</Typography>
                    </Grid>
                  </Grid>
                  {discount > 0 && (
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Typography color="success.main">Promo Discount</Typography>
                      </Grid>
                      <Grid item>
                        <Typography color="success.main">-₹{discount}</Typography>
                      </Grid>
                    </Grid>
                  )}
                  <Divider sx={{ my: 2 }} />
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h6">Total</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">₹{calculateTotalWithDiscount()}</Typography>
                    </Grid>
                  </Grid>
                  <TextField
                    label="Special Instructions"
                    multiline
                    minRows={2}
                    fullWidth
                    value={specialInstructions}
                    onChange={e => setSpecialInstructions(e.target.value)}
                    sx={{ mt: 2 }}
                    placeholder="E.g. Please make it extra spicy, call on arrival, etc."
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Save for Later Section */}
      {savedForLater.length > 0 && (
        <Box mt={6}>
          <Typography variant="h5" gutterBottom>Saved for Later</Typography>
          {savedForLater.map(item => (
            <CartItem key={item.id}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Size: {item.size}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Toppings: {item.toppings.join(', ')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                      <Button size="small" variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleMoveToCart(item)}>
                        Move to Cart
                      </Button>
                      <IconButton color="error" onClick={() => handleRemoveSaved(item.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </CartItem>
          ))}
        </Box>
      )}

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={undoItem && (
          <Button color="secondary" size="small" onClick={handleUndo}>
            Undo
          </Button>
        )}
      >
        <Alert onClose={() => setShowAlert(false)} severity="info" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <Dialog open={editDialogOpen} onClose={handleEditCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Pizza</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Size</FormLabel>
              <RadioGroup
                row
                value={editSize}
                onChange={(e) => setEditSize(e.target.value)}
                sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: { xs: 1, sm: 2 } }}
              >
                {pizzaSizes.map((size) => (
                  <FormControlLabel
                    key={size}
                    value={size}
                    control={<Radio />}
                    label={size}
                    sx={{ flex: { xs: '1 1 auto', sm: '1' }, minWidth: { xs: '45%', sm: 'auto' } }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Extra Toppings
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {allToppings.map((topping) => (
                <Chip
                  key={topping}
                  label={topping}
                  onClick={() => handleEditToppingToggle(topping)}
                  color={editToppings.includes(topping) ? "primary" : "default"}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} variant="outlined">Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart; 