import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PublicIcon from '@mui/icons-material/Public';

/**
 * AuthPage 컴포넌트 - 로그인/회원가입 페이지
 *
 * Props:
 * @param {object} useAuth - auth 훅 객체 (login, signup 포함) [Required]
 */
function AuthPage({ useAuth }) {
  const navigate = useNavigate();
  const { login, signup } = useAuth;

  const [tab, setTab] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    username: '',
    displayName: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await login(loginForm.email, loginForm.password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      navigate('/');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!signupForm.username || !signupForm.email || !signupForm.password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    setLoading(true);
    const { error: err } = await signup(signupForm);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1e88e5 100%)',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth='sm'>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <PublicIcon sx={{ fontSize: 60, color: 'white', mb: 1 }} />
          <Typography variant='h4' sx={{ color: 'white', fontWeight: 700 }}>
            World Map
          </Typography>
          <Typography variant='body1' sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
            여행의 순간을 공유하세요
          </Typography>
        </Box>

        <Paper
          elevation={8}
          sx={{ borderRadius: 3, overflow: 'hidden' }}
        >
          <Tabs
            value={tab}
            onChange={(e, v) => { setTab(v); setError(''); }}
            variant='fullWidth'
            sx={{
              bgcolor: 'primary.main',
              '& .MuiTab-root': { color: 'rgba(255,255,255,0.7)', fontWeight: 600 },
              '& .Mui-selected': { color: 'white !important' },
              '& .MuiTabs-indicator': { bgcolor: 'white', height: 3 },
            }}
          >
            <Tab label='로그인' />
            <Tab label='회원가입' />
          </Tabs>

          <Box sx={{ p: { xs: 3, md: 4 } }}>
            { error && (
              <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert>
            )}

            { tab === 0 && (
              <Box component='form' onSubmit={handleLogin}>
                <TextField
                  label='이메일'
                  type='email'
                  fullWidth
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label='비밀번호'
                  type='password'
                  fullWidth
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  sx={{ mb: 3 }}
                />
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  size='large'
                  disabled={loading}
                  startIcon={<FlightTakeoffIcon />}
                  sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
                >
                  { loading ? '로그인 중...' : '로그인' }
                </Button>
              </Box>
            )}

            { tab === 1 && (
              <Box component='form' onSubmit={handleSignup}>
                <TextField
                  label='사용자명 (@아이디)'
                  fullWidth
                  required
                  value={signupForm.username}
                  onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label='표시 이름'
                  fullWidth
                  value={signupForm.displayName}
                  onChange={(e) => setSignupForm({ ...signupForm, displayName: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label='이메일'
                  type='email'
                  fullWidth
                  required
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label='비밀번호'
                  type='password'
                  fullWidth
                  required
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  sx={{ mb: 3 }}
                />
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  size='large'
                  disabled={loading}
                  sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
                >
                  { loading ? '처리 중...' : '회원가입' }
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default AuthPage;
