import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * App 컴포넌트
 *
 * 16개 UI 섹션을 순차적으로 추가하는 메인 레이아웃
 * 각 섹션은 src/components/sections/ 에서 import하여 추가
 */
function App() {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      py: { xs: 2, md: 4 }
    }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 700,
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          UI Components Test
        </Typography>

        {/* 섹션을 아래에 순차적으로 추가 */}
        {/* <Section01 /> */}
        {/* <Section02 /> */}
        {/* ... */}
        {/* <Section16 /> */}
      </Container>
    </Box>
  );
}

export default App;
