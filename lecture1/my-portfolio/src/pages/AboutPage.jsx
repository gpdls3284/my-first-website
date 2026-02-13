import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * AboutPage 컴포넌트
 *
 * 상세한 자기소개가 들어갈 About Me 페이지
 */
function AboutPage() {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: { xs: 4, md: 8 },
    }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: 'var(--color-text-primary)',
            fontWeight: 700,
            mb: 4,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          About Me
        </Typography>
        <Box
          sx={{
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-accent)',
            borderRadius: 2,
            py: { xs: 6, md: 8 },
            px: { xs: 3, md: 5 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.8,
            }}
          >
            About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutPage;
