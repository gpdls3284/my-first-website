import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * ContactSection 컴포넌트
 *
 * 연락처, SNS, 간단한 메시지 폼이 들어갈 섹션
 */
function ContactSection() {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-light)',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 3,
            textAlign: 'center',
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          Contact
        </Typography>
        <Typography
          sx={{
            color: 'var(--color-accent)',
            textAlign: 'center',
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            lineHeight: 1.6,
          }}
        >
          여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default ContactSection;
