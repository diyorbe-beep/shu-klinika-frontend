import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'patient'
  });
  
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Ism kiritilishi shart';
    if (!formData.email.includes('@')) newErrors.email = 'Noto‘g‘ri email formati';
    if (formData.password.length < 6) newErrors.password = 'Parol kamida 6 belgidan iborat bo‘lishi kerak';
    if (!formData.phone) newErrors.phone = 'Telefon raqam kiritilishi shart';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// O'zgartirilgan handleSubmit funksiyasi
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validate()) return;
  
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', formData);
    
    if (response.data.success) {
      setSnackbarMessage('Muvaffaqiyatli ro‘yxatdan o‘tdingiz! Iltimos, tizimga kiring');
      setOpenSnackbar(true);
      // Registerdan keyin login sahifasiga yo'naltiramiz
      setTimeout(() => navigate('/login'), 2000);
    }
  } catch (error) {
    setSnackbarMessage(error.response?.data?.message || 'Ro‘yxatdan o‘tishda xato');
    setOpenSnackbar(true);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 8, 
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Yangi hisob yaratish
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            margin="normal"
            label="To'liq ismingiz"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Email manzil"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Telefon raqam"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Parol"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Hisob turi</InputLabel>
            <Select
              name="role"
              value={formData.role}
              label="Hisob turi"
              onChange={handleChange}
            >
              <MenuItem value="patient">Bemor</MenuItem>
              <MenuItem value="doctor">Shifokor</MenuItem>
              <MenuItem value="admin" disabled>Admin (faqat tizim admini)</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Ro'yxatdan o'tish
          </Button>
          
          <Box textAlign="center">
            <Button 
              component="a" 
              href="/login" 
              color="primary"
            >
              Hisobingiz bormi? Kirish
            </Button>
          </Box>
        </Box>
      </Box>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Muvaffaqiyatli') ? 'success' : 'error'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}