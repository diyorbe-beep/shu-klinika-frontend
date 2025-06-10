import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Container, CssBaseline } from '@mui/material';

function Layout() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;