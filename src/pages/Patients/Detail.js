import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPatient } from '../../api/patients';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  CircularProgress
} from '@mui/material';

function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await getPatient(id);
        setPatient(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Bemor ma\'lumotlarini yuklashda xato');
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!patient) return <Typography>Bemor topilmadi</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Bemor ma'lumotlari</Typography>
        <Button 
          variant="contained" 
          component={Link}
          to={`/patients/${id}/edit`}
        >
          Tahrirlash
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>{patient.name}</Typography>
          <Typography>Yosh: {patient.age}</Typography>
          <Typography>Jinsi: {patient.gender}</Typography>
          <Typography>Telefon: {patient.phone}</Typography>
          <Typography>Manzil: {patient.address}</Typography>
          <Typography>Tashxis: {patient.disease}</Typography>
          <Typography sx={{ mt: 2 }}>
            Qo'shimcha ma'lumotlar: {patient.notes || 'Mavjud emas'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PatientDetail;