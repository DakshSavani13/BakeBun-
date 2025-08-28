import React, { useEffect, useMemo, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, InputAdornment, IconButton, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEmailValid = useMemo(() => /.+@.+\..+/.test(email), [email]);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!isEmailValid) {
      setError('Please enter a valid email address.');
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const userJson = JSON.stringify(res.data.user);
      const token = res.data.token;
      
      if (rememberMe) {
        localStorage.setItem('user', userJson);
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('user', userJson);
        sessionStorage.setItem('token', token);
      }
      
      setSuccess('Login successful! Redirecting...');
      
      // Redirect admin users to admin panel
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data?.message || 'Login failed.');
      } else if (err.request) {
        setError('Cannot reach server. Please ensure the backend is running.');
      } else {
        setError(err.message || 'Login failed.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(''), 3000);
    return () => clearTimeout(t);
  }, [error]);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(''), 3000);
    return () => clearTimeout(t);
  }, [success]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
              {success}
            </Alert>
          )}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            error={email.length > 0 && !isEmailValid}
            helperText={email.length > 0 && !isEmailValid ? 'Enter a valid email.' : ' '}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(s => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 1 }}>
            <FormControlLabel control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />} label="Remember me" />
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 1, mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 2, fontWeight: 700, borderRadius: 2, py: 1, fontSize: '1rem', boxShadow: 3 }}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Don’t have an account?{' '}
            <Button component={RouterLink} to="/signup" color="primary" size="small" sx={{ textTransform: 'none', p: 0, minWidth: 0 }}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;


