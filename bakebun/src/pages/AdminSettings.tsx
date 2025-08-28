import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';
import {
  Settings,
  Notifications,
  Security,
  Business,
  Payment,
  DeliveryDining,
  Save,
  Refresh
} from '@mui/icons-material';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'BakeBun',
    siteDescription: 'Delicious baked goods delivered to your door',
    contactEmail: 'admin@bakebun.com',
    contactPhone: '+1 (555) 123-4567',
    
    // Business Settings
    businessHours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '21:00', closed: false }
    },
    
    // Order Settings
    minimumOrderAmount: 15.00,
    deliveryFee: 3.99,
    freeDeliveryThreshold: 25.00,
    maxDeliveryDistance: 10, // miles
    preparationTime: 20, // minutes
    
    // Payment Settings
    acceptCash: true,
    acceptCard: true,
    acceptOnline: true,
    taxRate: 8.5, // percentage
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    orderConfirmations: true,
    deliveryUpdates: true,
    marketingEmails: false,
    
    // Security Settings
    requirePhoneVerification: true,
    requireEmailVerification: true,
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // In a real application, this would save to the backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetSettings = () => {
    // Reset to default values
    setSettings({
      siteName: 'BakeBun',
      siteDescription: 'Delicious baked goods delivered to your door',
      contactEmail: 'admin@bakebun.com',
      contactPhone: '+1 (555) 123-4567',
      businessHours: {
        monday: { open: '09:00', close: '22:00', closed: false },
        tuesday: { open: '09:00', close: '22:00', closed: false },
        wednesday: { open: '09:00', close: '22:00', closed: false },
        thursday: { open: '09:00', close: '22:00', closed: false },
        friday: { open: '09:00', close: '23:00', closed: false },
        saturday: { open: '10:00', close: '23:00', closed: false },
        sunday: { open: '10:00', close: '21:00', closed: false }
      },
      minimumOrderAmount: 15.00,
      deliveryFee: 3.99,
      freeDeliveryThreshold: 25.00,
      maxDeliveryDistance: 10,
      preparationTime: 20,
      acceptCash: true,
      acceptCard: true,
      acceptOnline: true,
      taxRate: 8.5,
      emailNotifications: true,
      smsNotifications: false,
      orderConfirmations: true,
      deliveryUpdates: true,
      marketingEmails: false,
      requirePhoneVerification: true,
      requireEmailVerification: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5
    });
  };

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          BakeBun Settings
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleResetSettings}
          >
            Reset to Defaults
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </Box>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSaved(false)}>
          Settings saved successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="General Settings"
              avatar={<Business />}
            />
            <CardContent>
              <TextField
                fullWidth
                label="Site Name"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Site Description"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                margin="normal"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                label="Contact Email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                margin="normal"
                type="email"
              />
              <TextField
                fullWidth
                label="Contact Phone"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Business Hours */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Business Hours"
              avatar={<Business />}
            />
            <CardContent>
              {daysOfWeek.map((day) => (
                <Box key={day.key} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {day.label}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      size="small"
                      type="time"
                      value={settings.businessHours[day.key as keyof typeof settings.businessHours].open}
                      onChange={(e) => handleSettingChange('businessHours', day.key, {
                        ...settings.businessHours[day.key as keyof typeof settings.businessHours],
                        open: e.target.value
                      })}
                      disabled={settings.businessHours[day.key as keyof typeof settings.businessHours].closed}
                    />
                    <Typography variant="body2">to</Typography>
                    <TextField
                      size="small"
                      type="time"
                      value={settings.businessHours[day.key as keyof typeof settings.businessHours].close}
                      onChange={(e) => handleSettingChange('businessHours', day.key, {
                        ...settings.businessHours[day.key as keyof typeof settings.businessHours],
                        close: e.target.value
                      })}
                      disabled={settings.businessHours[day.key as keyof typeof settings.businessHours].closed}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.businessHours[day.key as keyof typeof settings.businessHours].closed}
                          onChange={(e) => handleSettingChange('businessHours', day.key, {
                            ...settings.businessHours[day.key as keyof typeof settings.businessHours],
                            closed: e.target.checked
                          })}
                        />
                      }
                      label="Closed"
                    />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Order Settings"
              avatar={<DeliveryDining />}
            />
            <CardContent>
              <TextField
                fullWidth
                label="Minimum Order Amount (₹)"
                value={settings.minimumOrderAmount}
                onChange={(e) => setSettings({ ...settings, minimumOrderAmount: parseFloat(e.target.value) || 0 })}
                margin="normal"
                type="number"
                InputProps={{ startAdornment: '₹' }}
              />
              <TextField
                fullWidth
                label="Delivery Fee (₹)"
                value={settings.deliveryFee}
                onChange={(e) => setSettings({ ...settings, deliveryFee: parseFloat(e.target.value) || 0 })}
                margin="normal"
                type="number"
                InputProps={{ startAdornment: '₹' }}
              />
              <TextField
                fullWidth
                label="Free Delivery Threshold (₹)"
                value={settings.freeDeliveryThreshold}
                onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: parseFloat(e.target.value) || 0 })}
                margin="normal"
                type="number"
                InputProps={{ startAdornment: '₹' }}
              />
              <TextField
                fullWidth
                label="Max Delivery Distance (miles)"
                value={settings.maxDeliveryDistance}
                onChange={(e) => setSettings({ ...settings, maxDeliveryDistance: parseInt(e.target.value) || 0 })}
                margin="normal"
                type="number"
              />
              <TextField
                fullWidth
                label="Preparation Time (minutes)"
                value={settings.preparationTime}
                onChange={(e) => setSettings({ ...settings, preparationTime: parseInt(e.target.value) || 0 })}
                margin="normal"
                type="number"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Payment Settings"
              avatar={<Payment />}
            />
            <CardContent>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.acceptCash}
                    onChange={(e) => setSettings({ ...settings, acceptCash: e.target.checked })}
                  />
                }
                label="Accept Cash Payments"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.acceptCard}
                    onChange={(e) => setSettings({ ...settings, acceptCard: e.target.checked })}
                  />
                }
                label="Accept Card Payments"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.acceptOnline}
                    onChange={(e) => setSettings({ ...settings, acceptOnline: e.target.checked })}
                  />
                }
                label="Accept Online Payments"
              />
              <TextField
                fullWidth
                label="Tax Rate (%)"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) || 0 })}
                margin="normal"
                type="number"
                InputProps={{ endAdornment: '%' }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Notification Settings"
              avatar={<Notifications />}
            />
            <CardContent>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.smsNotifications}
                    onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                  />
                }
                label="SMS Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.orderConfirmations}
                    onChange={(e) => setSettings({ ...settings, orderConfirmations: e.target.checked })}
                  />
                }
                label="Order Confirmations"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.deliveryUpdates}
                    onChange={(e) => setSettings({ ...settings, deliveryUpdates: e.target.checked })}
                  />
                }
                label="Delivery Updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.marketingEmails}
                    onChange={(e) => setSettings({ ...settings, marketingEmails: e.target.checked })}
                  />
                }
                label="Marketing Emails"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Security Settings"
              avatar={<Security />}
            />
            <CardContent>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.requirePhoneVerification}
                    onChange={(e) => setSettings({ ...settings, requirePhoneVerification: e.target.checked })}
                  />
                }
                label="Require Phone Verification"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.requireEmailVerification}
                    onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
                  />
                }
                label="Require Email Verification"
              />
              <TextField
                fullWidth
                label="Session Timeout (minutes)"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) || 0 })}
                margin="normal"
                type="number"
              />
              <TextField
                fullWidth
                label="Max Login Attempts"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) || 0 })}
                margin="normal"
                type="number"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminSettings;
