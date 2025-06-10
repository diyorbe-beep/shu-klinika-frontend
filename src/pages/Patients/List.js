import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPatients } from '../../api/patients';
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Box
} from '@mui/material';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await getPatients();
        setPatients(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Bemorlarni yuklashda xato');
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) return <Typography>Yuklanmoqda...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Bemorlar ro'yxati</Typography>
        <Button 
          variant="contained" 
          component={Link}
          to="/patients/new"
        >
          Yangi bemor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ism</TableCell>
              <TableCell>Yosh</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Tashxis</TableCell>
              <TableCell>Amallar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.disease}</TableCell>
                <TableCell>
                  <Button 
                    component={Link}
                    to={`/patients/${patient.id}`}
                    size="small"
                  >
                    Ko'rish
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PatientList;