import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../lib/supabase';

/**
 * PostDetailPage - 게시물 상세 페이지
 *
 * Props:
 * @param {object} currentUser - 현재 로그인 사용자 [Required]
 */
function PostDetailPage({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    const { data } = await supabase
      .from('sns_posts')
      .select('*, sns_users(display_name, username, avatar_url)')
      .eq('id', id)
      .single();

    setPost(data);
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from('sns_comments')
      .select('*, sns_users(display_name, username)')
      .eq('post_id', id)
      .order('created_at', { ascending: true });

    setComments(data || []);
  };

  const handleLike = async () => {
    if (!post) return;
    const newCount = liked ? post.likes_count - 1 : post.likes_count + 1;
    await supabase.from('sns_posts').update({ likes_count: newCount }).eq('id', id);
    setPost({ ...post, likes_count: newCount });
    setLiked(!liked);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser) return;

    await supabase.from('sns_comments').insert([{
      content: commentText,
      user_id: currentUser.id,
      post_id: parseInt(id),
    }]);

    setCommentText('');
    fetchComments();
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', pt: 10 }}>
        <Typography>불러오는 중...</Typography>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ textAlign: 'center', pt: 10 }}>
        <Typography>게시물을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position='sticky' elevation={0} sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <IconButton color='inherit' onClick={() => navigate(-1)} edge='start'>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' sx={{ fontWeight: 700, ml: 1 }}>
            게시물
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth='sm' sx={{ py: 2, pb: 10 }}>
        <Card elevation={2} sx={{ borderRadius: 3, overflow: 'hidden', mb: 2 }}>
          {/* 이미지 */}
          { post.image_url && (
            <CardMedia
              component='img'
              image={post.image_url}
              alt='여행 이미지'
              sx={{ maxHeight: 400, objectFit: 'cover', width: '100%' }}
            />
          )}

          <Box sx={{ p: 2 }}>
            {/* 작성자 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 44, height: 44 }}>
                { (post.sns_users?.display_name || post.sns_users?.username || '?')[0].toUpperCase() }
              </Avatar>
              <Box>
                <Typography fontWeight={700}>
                  { post.sns_users?.display_name || post.sns_users?.username }
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  { formatDate(post.created_at) }
                </Typography>
              </Box>
            </Box>

            {/* 위치 */}
            { post.location && (
              <Chip
                icon={<LocationOnIcon />}
                label={post.location}
                color='primary'
                variant='outlined'
                sx={{ mb: 1.5 }}
              />
            )}

            {/* 캡션 */}
            <Typography sx={{ mb: 2, lineHeight: 1.7 }}>{ post.caption }</Typography>

            {/* 좋아요 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton onClick={handleLike} size='small' color={liked ? 'error' : 'default'}>
                { liked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
              </IconButton>
              <Typography variant='body2'>{ post.likes_count } 좋아요</Typography>
            </Box>
          </Box>
        </Card>

        {/* 댓글 섹션 */}
        <Card elevation={1} sx={{ borderRadius: 3, p: 2 }}>
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 700 }}>
            댓글 { comments.length }개
          </Typography>

          {/* 댓글 작성 */}
          { currentUser && (
            <Box component='form' onSubmit={handleComment} sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size='small'
                placeholder='댓글을 입력하세요...'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              <IconButton type='submit' color='primary' disabled={!commentText.trim()}>
                <SendIcon />
              </IconButton>
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />

          {/* 댓글 목록 */}
          { comments.length === 0 ? (
            <Typography variant='body2' color='text.secondary' textAlign='center'>
              첫 번째 댓글을 남겨보세요!
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              { comments.map((comment) => (
                <Box key={comment.id} sx={{ display: 'flex', gap: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: 12 }}>
                    { (comment.sns_users?.display_name || comment.sns_users?.username || '?')[0].toUpperCase() }
                  </Avatar>
                  <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, px: 1.5, py: 1, flexGrow: 1 }}>
                    <Typography variant='caption' fontWeight={700}>
                      { comment.sns_users?.display_name || comment.sns_users?.username }
                    </Typography>
                    <Typography variant='body2'>{ comment.content }</Typography>
                    <Typography variant='caption' color='text.secondary'>
                      { formatDate(comment.created_at) }
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Card>
      </Container>
    </Box>
  );
}

export default PostDetailPage;
