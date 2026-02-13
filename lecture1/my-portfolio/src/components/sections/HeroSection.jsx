import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * HeroSection 컴포넌트
 *
 * 메인 비주얼, 이름, 간단 소개가 들어갈 히어로 섹션
 */
function HeroSection() {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--color-bg-banner)',
        color: 'var(--color-text-light)',
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 3 },
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '2rem', md: '3rem' },
          mb: 2,
        }}
      >
        Welcome
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 400,
          fontSize: { xs: '1rem', md: '1.25rem' },
          opacity: 0.9,
          maxWidth: 600,
          mx: 'auto',
          lineHeight: 1.6,
        }}
      >
        여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
      </Typography>
    </Box>
  );
}

export default HeroSection;
