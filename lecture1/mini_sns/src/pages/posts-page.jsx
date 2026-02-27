import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { supabase } from '../lib/supabase';

/**
 * PostsPage 컴포넌트 - 게시물 목록 페이지
 */
function PostsPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('sns_posts')
      .select('*, sns_users(display_name, username, avatar_url)')
      .order('created_at', { ascending: false });

    setPosts(data || []);
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position='sticky' elevation={0} sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant='h6' sx={{ fontWeight: 700 }}>
            여행 탐색 🗺️
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth='sm' sx={{ py: 2, pb: 10 }}>
        { loading ? (
          <Typography color='text.secondary' sx={{ mt: 4, textAlign: 'center' }}>
            불러오는 중...
          </Typography>
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color='text.secondary'>게시물이 없습니다.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            { posts.map((post) => (
              <Card key={post.id} elevation={2} sx={{ borderRadius: 3 }}>
                <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
                  { post.image_url && (
                    <CardMedia
                      component='img'
                      height='260'
                      image={post.image_url}
                      alt='여행 이미지'
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent>
                    {/* 작성자 정보 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                        { (post.sns_users?.display_name || post.sns_users?.username || '?')[0].toUpperCase() }
                      </Avatar>
                      <Box>
                        <Typography variant='body2' fontWeight={700}>
                          { post.sns_users?.display_name || post.sns_users?.username }
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          @{ post.sns_users?.username }
                        </Typography>
                      </Box>
                    </Box>

                    {/* 위치 태그 */}
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

                    {/* 캡션 */}
                    <Typography variant='body2' color='text.secondary' sx={{ mb: 1.5 }}>
                      { post.caption }
                    </Typography>

                    {/* 좋아요 & 날짜 */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <FavoriteIcon sx={{ fontSize: 16, color: 'error.main' }} />
                        <Typography variant='caption'>{ post.likes_count }</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant='caption' color='text.secondary'>
                          { formatDate(post.created_at) }
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default PostsPage;
