import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useAuth } from './hooks/use-auth';
import BottomNav from './components/common/bottom-nav';
import AuthPage from './pages/auth-page';
import HomePage from './pages/home-page';
import PostsPage from './pages/posts-page';
import PostDetailPage from './pages/post-detail-page';
import CreatePostPage from './pages/create-post-page';
import MyPage from './pages/my-page';

function App() {
  const auth = useAuth();
  const { currentUser, loading, logout } = auth;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        로딩 중...
      </Box>
    );
  }

  if (!currentUser) {
    return (
      <BrowserRouter>
        <AuthPage useAuth={auth} />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        <Routes>
          <Route path='/' element={<HomePage currentUser={currentUser} onLogout={logout} />} />
          <Route path='/posts' element={<PostsPage />} />
          <Route path='/posts/:id' element={<PostDetailPage currentUser={currentUser} />} />
          <Route path='/create' element={<CreatePostPage currentUser={currentUser} />} />
          <Route path='/mypage' element={<MyPage currentUser={currentUser} onLogout={logout} />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <BottomNav currentUser={currentUser} />
      </Box>
    </BrowserRouter>
  );
}

export default App;
