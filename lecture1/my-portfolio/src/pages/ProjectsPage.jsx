import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * ProjectsPage 컴포넌트
 *
 * 포트폴리오 작품들이 들어갈 Projects 페이지
 */
function ProjectsPage() {
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
          Projects
        </Typography>
        <Box
          sx={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-light)',
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
            Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
