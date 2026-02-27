import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { supabase } from '../lib/supabase';

/**
 * MyPage - 마이페이지
 *
 * Props:
 * @param {object} currentUser - 현재 로그인 사용자 [Required]
 * @param {function} onLogout - 로그아웃 함수 [Required]
 */
function MyPage({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    if (currentUser) fetchMyPosts();
  }, [currentUser]);

  const fetchMyPosts = async () => {
    const { data } = await supabase
      .from('sns_posts')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });

    setPosts(data || []);
    const likes = (data || []).reduce((sum, p) => sum + (p.likes_count || 0), 0);
    setTotalLikes(likes);
  };

  if (!currentUser) return null;

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position='sticky' elevation={0} sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant='h6' sx={{ fontWeight: 700, flexGrow: 1 }}>
            마이페이지
          </Typography>
          <Button
            color='inherit'
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            size='small'
          >
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth='sm' sx={{ pb: 10 }}>
        {/* 프로필 헤더 */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #0d47a1 0%, #1e88e5 100%)',
            pt: 4,
            pb: 3,
            px: 3,
            textAlign: 'center',
            color: 'white',
            mx: -2,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'white',
              color: 'primary.main',
              fontSize: 32,
              fontWeight: 700,
              mx: 'auto',
              mb: 2,
              border: '3px solid rgba(255,255,255,0.5)',
            }}
          >
            { (currentUser.display_name || currentUser.username)[0].toUpperCase() }
          </Avatar>
          <Typography variant='h5' fontWeight={700}>
            { currentUser.display_name || currentUser.username }
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.85 }}>
            @{ currentUser.username }
          </Typography>
          { currentUser.bio && (
            <Typography variant='body2' sx={{ mt: 1, opacity: 0.9 }}>
              { currentUser.bio }
            </Typography>
          )}
        </Box>

        {/* 통계 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            py: 2.5,
            bgcolor: 'white',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
              <CameraAltIcon sx={{ color: 'primary.main', fontSize: 18 }} />
              <Typography variant='h6' fontWeight={700} color='primary.main'>
                { posts.length }
              </Typography>
            </Box>
            <Typography variant='caption' color='text.secondary'>게시물</Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
              <FavoriteIcon sx={{ color: 'error.main', fontSize: 18 }} />
              <Typography variant='h6' fontWeight={700} color='error.main'>
                { totalLikes }
              </Typography>
            </Box>
            <Typography variant='caption' color='text.secondary'>총 좋아요</Typography>
          </Box>
        </Box>

        {/* 내 게시물 그리드 */}
        <Box sx={{ pt: 2 }}>
          <Typography variant='subtitle1' fontWeight={700} sx={{ px: 1, mb: 1.5, color: 'primary.main' }}>
            내 여행 이야기
          </Typography>
          { posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography color='text.secondary' sx={{ mb: 2 }}>
                아직 게시물이 없습니다.
              </Typography>
              <Button
                variant='contained'
                onClick={() => navigate('/create')}
                sx={{ borderRadius: 2 }}
              >
                첫 여행 이야기 작성
              </Button>
            </Box>
          ) : (
            <Grid container spacing={0.5}>
              { posts.map((post) => (
                <Grid size={{ xs: 4 }} key={post.id}>
                  <Card
                    elevation={0}
                    sx={{ borderRadius: 0, aspectRatio: '1/1' }}
                  >
                    <CardActionArea
                      onClick={() => navigate(`/posts/${post.id}`)}
                      sx={{ height: '100%' }}
                    >
                      { post.image_url ? (
                        <CardMedia
                          component='img'
                          image={post.image_url}
                          alt='내 여행'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            bgcolor: 'primary.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 100,
                          }}
                        >
                          <CameraAltIcon sx={{ color: 'white', fontSize: 30 }} />
                        </Box>
                      )}
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default MyPage;
