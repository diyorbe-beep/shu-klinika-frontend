import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

// O'zgartirilgan handleSubmit funksiyasi
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await login(formData);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Muvaffaqiyatli login qilgandan so'ng dashboardga yo'naltiramiz
    navigate('/dashboard');
  } catch (error) {
    setError('Noto‘g‘ri email yoki parol');
  }
};

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Klinika Tizimiga Kirish
        </Typography>
        
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Parol"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Kirish
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={() => navigate('/register')}
          >
            Ro'yxatdan o'tish
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;