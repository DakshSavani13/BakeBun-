import { Box, Typography, Paper, Grid, Divider, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Download } from '@mui/icons-material';
import jsPDF from 'jspdf';
import '../assets/NotoSans-Regular-normal.js';

const Receipt = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails || {
    items: [],
    total: 0,
    orderNumber: '12345',
    date: new Date().toLocaleDateString(),
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFont('NotoSans-Regular');
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add header
    doc.setFontSize(24);
    doc.text('BakeBun', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Thank you for your order!', pageWidth / 2, 30, { align: 'center' });
    
    // Add order details
    doc.setFontSize(10);
    doc.text(`Order #: ${orderDetails.orderNumber}`, 20, 40);
    doc.text(`Date: ${orderDetails.date}`, 20, 47);
    let yPosition = 54;
    if (orderDetails.venue) {
      doc.text(`Address: ${orderDetails.venue}`, 20, yPosition);
      yPosition += 7;
    }
    if (orderDetails.promoCode) {
      doc.text(`Promo Code: ${orderDetails.promoCode}`, 20, yPosition);
      yPosition += 7;
    }
    if (orderDetails.discount && orderDetails.discount > 0) {
      doc.text(`Discount: \u20B9${orderDetails.discount}`, 20, yPosition);
      yPosition += 7;
    }
    if (orderDetails.specialInstructions) {
      doc.text(`Instructions: ${orderDetails.specialInstructions}`, 20, yPosition);
      yPosition += 7;
    }
    if (orderDetails.estimatedDeliveryTime) {
      doc.text(`Est. Delivery: ${orderDetails.estimatedDeliveryTime} min`, 20, yPosition);
      yPosition += 7;
    }
    // Add items
    yPosition += 6;
    doc.setFontSize(12);
    doc.text('Items:', 20, yPosition);
    yPosition += 10;
    
    orderDetails.items.forEach((item: any) => {
      doc.setFontSize(10);
      doc.text(`${item.name} (${item.size})`, 20, yPosition);
      doc.text(`\u20B9${item.price} x ${item.quantity}`, pageWidth - 40, yPosition, { align: 'right' });
      yPosition += 7;
      
      if (item.toppings && item.toppings.length > 0) {
        doc.setFontSize(8);
        doc.text(`Toppings: ${item.toppings.join(', ')}`, 25, yPosition);
        yPosition += 7;
      }
    });
    
    // Add totals
    yPosition += 10;
    doc.setFontSize(10);
    doc.text('Subtotal:', 20, yPosition);
    doc.text(`\u20B9${orderDetails.total}`, pageWidth - 40, yPosition, { align: 'right' });
    
    yPosition += 7;
    doc.text('Tax (10%):', 20, yPosition);
    doc.text(`\u20B9${Math.round(orderDetails.total * 0.1)}`, pageWidth - 40, yPosition, { align: 'right' });
    
    yPosition += 7;
    doc.setFontSize(12);
    doc.text('Total:', 20, yPosition);
    doc.text(`\u20B9${Math.round(orderDetails.total * 1.1)}`, pageWidth - 40, yPosition, { align: 'right' });
    
    // Add footer
    yPosition += 20;
    doc.setFontSize(10);
    doc.text('Thank you for choosing BakeBun!', pageWidth / 2, yPosition, { align: 'center' });
    
    // Save the PDF
    doc.save(`bakebun-receipt-${orderDetails.orderNumber}.pdf`);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          BakeBun
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Thank you for your order!
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body2" gutterBottom>
          Order #: {orderDetails.orderNumber}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Date: {orderDetails.date}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        {orderDetails.items.map((item: any, index: number) => (
          <Grid container key={index} sx={{ mb: 1 }}>
            <Grid item xs={8}>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {item.size}
              </Typography>
              {item.toppings && item.toppings.length > 0 && (
                <Typography variant="body2" color="text.secondary">
                  Toppings: {item.toppings.join(', ')}
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" align="right">
                {item.price} x {item.quantity}
              </Typography>
              <Typography variant="body1" align="right">
                {item.price * item.quantity}
              </Typography>
            </Grid>
          </Grid>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h6">Total</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="right">
              {orderDetails.total}
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Thank you for choosing BakeBun!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Download />}
            onClick={downloadReceipt}
            sx={{ mt: 2 }}
          >
            Download Receipt
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Receipt; 