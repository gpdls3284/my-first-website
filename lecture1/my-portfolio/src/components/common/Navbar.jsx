import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar 컴포넌트
 *
 * 상단 네비게이션 바 (Home, About Me, Projects 3개 탭)
 */
function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Me', path: '/about' },
    { label: 'Projects', path: '/projects' },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'var(--color-bg-primary)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Portfolio
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: location.pathname === item.path
                    ? 'var(--color-primary)'
                    : 'var(--color-text-secondary)',
                  fontWeight: location.pathname === item.path ? 700 : 400,
                  borderBottom: location.pathname === item.path
                    ? '2px solid var(--color-primary)'
                    : '2px solid transparent',
                  borderRadius: 0,
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  px: { xs: 1, md: 2 },
                  '&:hover': {
                    color: 'var(--color-primary-light)',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
