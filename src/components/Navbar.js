import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Chiqish qilgandan so'ng login sahifasiga yo'naltiramiz
  navigate('/login', { replace: true });
};

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Shu Klinika
          </Link>
        </Typography>
        
        {user ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/patients">Bemorlar</Button>
            <Button color="inherit" component={Link} to="/students">Talabalar</Button>
            {user.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin/doctors/add">Admin</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Chiqish</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/login">Kirish</Button>
            <Button color="inherit" component={Link} to="/register">Ro'yxatdan o'tish</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;