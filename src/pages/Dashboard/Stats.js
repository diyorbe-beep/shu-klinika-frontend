import { useEffect, useState } from 'react';
import { getStats } from '../../api/stats';
import { 
  Card, 
  CardContent, 
  Grid, 
  Typography,
  CircularProgress,
  Box
} from '@mui/material';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getStats();
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Statistikani yuklashda xato');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Bemorlar
              </Typography>
              <Typography variant="h4">{stats.totalPatients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Talabalar
              </Typography>
              <Typography variant="h4">{stats.totalStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Xodimlar
              </Typography>
              <Typography variant="h4">{stats.totalStaff}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;