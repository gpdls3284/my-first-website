import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

/**
 * ProjectsSection 컴포넌트
 *
 * 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 섹션
 */
function ProjectsSection() {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--color-bg-primary)',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: 'var(--color-text-primary)',
            fontWeight: 600,
            mb: 3,
            textAlign: 'center',
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          Projects
        </Typography>
        <Typography
          sx={{
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            mb: 4,
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            lineHeight: 1.6,
          }}
        >
          여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 더 보기 버튼이 들어갈 예정입니다.
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            component={Link}
            to="/projects"
            variant="contained"
            sx={{
              backgroundColor: 'var(--color-primary)',
              '&:hover': {
                backgroundColor: 'var(--color-primary-light)',
              },
            }}
          >
            더 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
