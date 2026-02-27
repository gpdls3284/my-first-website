import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { supabase } from '../lib/supabase';

/**
 * HomePage 컴포넌트 - 메인 홈 화면
 *
 * Props:
 * @param {object} currentUser - 현재 로그인 사용자 [Required]
 * @param {function} onLogout - 로그아웃 함수 [Required]
 */
function HomePage({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    const { data } = await supabase
      .from('sns_posts')
      .select('*, sns_users(display_name, username, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(6);

    setPosts(data || []);
    setLoading(false);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 앱바 */}
      <AppBar position='sticky' elevation={0} sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <PublicIcon sx={{ mr: 1 }} />
          <Typography variant='h6' sx={{ flexGrow: 1, fontWeight: 700 }}>
            World Map
          </Typography>
          <Typography variant='body2' sx={{ mr: 2, opacity: 0.9 }}>
            { currentUser?.display_name || currentUser?.username }
          </Typography>
          <IconButton color='inherit' onClick={onLogout} size='small'>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 히어로 배너 */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0d47a1 0%, #1e88e5 100%)',
          py: { xs: 4, md: 6 },
          px: 2,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant='h4' sx={{ fontWeight: 700, mb: 1 }}>
          여행의 순간을 공유하세요 ✈️
        </Typography>
        <Typography variant='body1' sx={{ opacity: 0.85 }}>
          전 세계 여행자들의 이야기를 만나보세요
        </Typography>
      </Box>

      {/* 최근 게시물 */}
      <Container maxWidth='lg' sx={{ py: 3, pb: 10 }}>
        <Typography variant='h6' sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
          최근 여행 이야기
        </Typography>

        { loading ? (
          <Typography color='text.secondary'>불러오는 중...</Typography>
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color='text.secondary' sx={{ mb: 1 }}>
              아직 게시물이 없습니다.
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              첫 번째 여행 이야기를 공유해보세요!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            { posts.map((post) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
                <Card
                  sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}
                  elevation={2}
                >
                  <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
                    { post.image_url && (
                      <CardMedia
                        component='img'
                        height='200'
                        image={post.image_url}
                        alt='여행 사진'
                        sx={{ objectFit: 'cover' }}
                      />
                    )}
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: 12 }}>
                          { (post.sns_users?.display_name || post.sns_users?.username || '?')[0].toUpperCase() }
                        </Avatar>
                        <Typography variant='body2' fontWeight={600}>
                          { post.sns_users?.display_name || post.sns_users?.username }
                        </Typography>
                      </Box>
                      { post.location && (
                        <Chip
                          icon={<LocationOnIcon />}
                          label={post.location}
                          size='small'
                          color='primary'
                          variant='outlined'
                          sx={{ mb: 1 }}
                        />
                      )}
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        { post.caption }
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 0.5 }}>
                        <FavoriteIcon sx={{ fontSize: 14, color: 'error.main' }} />
                        <Typography variant='caption' color='text.secondary'>
                          { post.likes_count }
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default HomePage;
