import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getPatient, 
  createPatient, 
  updatePatient 
} from '../../api/patients';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box,
  CircularProgress,
  MenuItem
} from '@mui/material';

function PatientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    disease: '',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        try {
          const { data } = await getPatient(id);
          setFormData(data);
        } catch (err) {
          setError(err.response?.data?.message || 'Bemor yuklashda xato');
        } finally {
          setLoading(false);
        }
      };
      fetchPatient();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePatient(id, formData);
      } else {
        await createPatient(formData);
      }
      navigate('/patients');
    } catch (err) {
      setError(err.response?.data?.message || 'Saqlashda xato');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Bemor ma\'lumotlarini tahrirlash' : 'Yangi bemor qo\'shish'}
        </Typography>
        
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Ism"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Yosh"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Jinsi"
            name="gender"
            select
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <MenuItem value="Erkak">Erkak</MenuItem>
            <MenuItem value="Ayol">Ayol</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Telefon"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Manzil"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tashxis"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Qo'shimcha ma'lumotlar"
            name="notes"
            multiline
            rows={4}
            value={formData.notes}
            onChange={handleChange}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              Saqlash
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/patients')}
            >
              Bekor qilish
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default PatientForm;