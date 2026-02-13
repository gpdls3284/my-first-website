import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

/**
 * AboutSection 컴포넌트
 *
 * 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 섹션
 */
function AboutSection() {
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
          About Me
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
          여기는 About Me 섹션입니다. 간단한 자기소개와 더 알아보기 버튼이 들어갈 예정입니다.
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            component={Link}
            to="/about"
            variant="outlined"
            sx={{
              color: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              '&:hover': {
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-light)',
                borderColor: 'var(--color-primary)',
              },
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutSection;
