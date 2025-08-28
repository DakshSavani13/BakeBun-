import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Snackbar, IconButton } from '@mui/material';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const offers = [
  {
    id: 1,
    title: 'General & New‑User Offer',
    promoCode: 'TRYNEW',
    description: '60% off (up to ₹120) on select restaurants',
    minOrder: 159,
    maxDiscount: 120,
    expiry: '2025-07-31',
    details: 'Expires Jul 31, 2025',
    type: 'General',
  },
  {
    id: 2,
    title: 'Welcome Offer',
    promoCode: 'WELCOME50',
    description: '50% off (max ₹100) + free delivery on first order',
    minOrder: 149,
    maxDiscount: 100,
    expiry: '2025-07-11',
    details: 'Valid till Jul 11, 2025',
    type: 'General',
  },
  {
    id: 3,
    title: 'Bakebun Offer',
    promoCode: 'BAKEBUNIT',
    description: '30–50% off on select restaurants (up to ₹100 off)',
    minOrder: 179,
    maxDiscount: 100,
    expiry: '2025-07-31',
    details: 'Valid till Jul 31, 2025',
    type: 'General',
  },
  {
    id: 4,
    title: 'Axis Bank Offer',
    promoCode: 'AXIS120',
    description: '₹120 off on orders above ₹500 (Axis My Zone Credit Cards)',
    minOrder: 500,
    maxDiscount: 120,
    expiry: '2025-07-31',
    details: '2x/month; till Jul 31, 2025',
    type: 'Bank',
  },
  {
    id: 5,
    title: 'Axis Select Offer',
    promoCode: 'AXIS200',
    description: '₹200 off on orders above ₹1,000 (Axis Bank Select Credit Card)',
    minOrder: 1000,
    maxDiscount: 200,
    expiry: '2025-07-31',
    details: '2x/month; till Jul 31, 2025',
    type: 'Bank',
  },
  {
    id: 6,
    title: 'Amex Corporate Offer',
    promoCode: 'AMEXCORP',
    description: '20% off (max ₹150) on AmEx Corporate Cards',
    minOrder: 0,
    maxDiscount: 150,
    expiry: '2025-07-31',
    details: 'Till Jul 31, 2025',
    type: 'Bank',
  },
  {
    id: 7,
    title: 'IndusInd Offer',
    promoCode: 'INDUS75',
    description: '₹75 off with IndusInd debit/credit (min. ₹300)',
    minOrder: 300,
    maxDiscount: 75,
    expiry: '2025-07-31',
    details: 'Till Jul 31, 2025',
    type: 'Bank',
  },
  {
    id: 8,
    title: 'Dineout Offer',
    promoCode: 'DINEOUT',
    description: '₹200 off dine-in bill via Swiggy Dineout on orders over ₹1,500',
    minOrder: 1500,
    maxDiscount: 200,
    expiry: '2025-07-31',
    details: 'New users; till Jul 31, 2025',
    type: 'Dining',
  },
  {
    id: 9,
    title: 'Carnival Offer',
    promoCode: 'CARNIVAL',
    description: '₹175 off + free delivery at select restaurants',
    minOrder: 0,
    maxDiscount: 175,
    expiry: '2025-07-31',
    details: 'Till Jul 31, 2025',
    type: 'Dining',
  },
  {
    id: 10,
    title: 'OneCard Offer',
    promoCode: 'ONECARD',
    description: '₹30 off on min. order ₹299',
    minOrder: 299,
    maxDiscount: 30,
    expiry: '2025-07-31',
    details: 'Till Jul 31, 2025',
    type: 'Bank',
  },
];

const Offers = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarCode, setSnackbarCode] = useState('');
  const handleClaim = (offer: any) => {
    // Generate a promo code based on offer title and random digits
    const code = (offer.promoCode || (offer.title.replace(/\s/g, '').toUpperCase().slice(0,6) + Math.floor(1000 + Math.random() * 9000)).slice(0,10));
    setSnackbarCode(code);
    setSnackbarOpen(true);
    localStorage.setItem('promoCode', code);
    navigator.clipboard.writeText(code);
  };
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Special Offers
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Check out our current promotions and special deals
      </Typography>

      <Grid container spacing={3}>
        {offers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} key={offer.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {offer.promoCode === 'BAKEBUNIT' ? 'Bakebun Offer' : offer.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {offer.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Promo Code: <b>{offer.promoCode}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Min. Order: ₹{offer.minOrder} | Max Discount: ₹{offer.maxDiscount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {offer.details}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => handleClaim(offer)}
                >
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={
          <span>
            Promo Code: <b>{snackbarCode}</b> &nbsp;
            <IconButton size="small" color="inherit" onClick={() => navigator.clipboard.writeText(snackbarCode)}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
            Copied!
          </span>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Offers; 