import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { supabase } from '../lib/supabase';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// 여행 관련 Unsplash 이미지 (API 키 없이 사용 가능한 고정 URL)
const TRAVEL_IMAGES = [
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600',
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600',
  'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600',
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600',
  'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600',
  'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600',
  'https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=600',
  'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600',
  'https://images.unsplash.com/photo-1522199710521-72d69614c702?w=600',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/**
 * CreatePostPage - 게시물 작성 페이지
 *
 * Props:
 * @param {object} currentUser - 현재 로그인 사용자 [Required]
 */
function CreatePostPage({ currentUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState(shuffle(TRAVEL_IMAGES).slice(0, 6));
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleRefreshImages = () => {
    setImages(shuffle(TRAVEL_IMAGES).slice(0, 6));
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    if (!caption.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }
    if (!currentUser) {
      setError('로그인이 필요합니다.');
      return;
    }

    setSubmitting(true);
    const { error: err } = await supabase.from('sns_posts').insert([{
      user_id: currentUser.id,
      caption,
      image_url: selectedImage || null,
      location: location || null,
      likes_count: 0,
    }]);

    setSubmitting(false);
    if (err) {
      setError('게시물 작성에 실패했습니다.');
    } else {
      navigate('/posts');
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position='sticky' elevation={0} sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <IconButton color='inherit' onClick={() => navigate(-1)} edge='start'>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' sx={{ fontWeight: 700, ml: 1, flexGrow: 1 }}>
            새 여행 이야기
          </Typography>
          { step === 2 && (
            <Button
              color='inherit'
              onClick={handleSubmit}
              disabled={submitting}
              sx={{ fontWeight: 700 }}
            >
              { submitting ? '저장 중...' : '게시' }
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth='sm' sx={{ py: 3, pb: 10 }}>
        { error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert> }

        { step === 1 && (
          <Box>
            <Typography variant='h6' sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
              1단계: 내용 작성
            </Typography>

            <TextField
              label='어떤 여행을 했나요?'
              multiline
              rows={4}
              fullWidth
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              sx={{ mb: 2 }}
              placeholder='여행의 순간을 공유해주세요...'
            />

            <TextField
              label='📍 여행 장소'
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mb: 3 }}
              placeholder='예: 파리, 프랑스'
              InputProps={{
                startAdornment: <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />,
              }}
            />

            <Button
              variant='contained'
              fullWidth
              size='large'
              onClick={() => { setError(''); setStep(2); }}
              disabled={!caption.trim()}
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
            >
              다음: 사진 선택
            </Button>
          </Box>
        )}

        { step === 2 && (
          <Box>
            <Typography variant='h6' sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
              2단계: 사진 선택 (선택사항)
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              마음에 드는 사진을 선택하거나 건너뛰세요
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <Button
                startIcon={<RefreshIcon />}
                onClick={handleRefreshImages}
                size='small'
                variant='outlined'
              >
                다른 사진 보기
              </Button>
            </Box>

            <Grid container spacing={1} sx={{ mb: 3 }}>
              { images.map((url, idx) => (
                <Grid size={{ xs: 6, sm: 4 }} key={idx}>
                  <Card
                    elevation={selectedImage === url ? 4 : 1}
                    sx={{
                      borderRadius: 2,
                      border: selectedImage === url ? '3px solid' : '3px solid transparent',
                      borderColor: selectedImage === url ? 'primary.main' : 'transparent',
                      position: 'relative',
                    }}
                  >
                    <CardActionArea onClick={() => setSelectedImage(selectedImage === url ? null : url)}>
                      <CardMedia
                        component='img'
                        height='120'
                        image={url}
                        alt={`여행 이미지 ${idx + 1}`}
                        sx={{ objectFit: 'cover' }}
                      />
                      { selectedImage === url && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                            display: 'flex',
                          }}
                        >
                          <CheckCircleIcon sx={{ color: 'white', fontSize: 20 }} />
                        </Box>
                      )}
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            { selectedImage && (
              <Chip
                label='사진 선택됨'
                color='primary'
                icon={<CheckCircleIcon />}
                sx={{ mb: 2 }}
              />
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant='outlined'
                onClick={() => setStep(1)}
                sx={{ flex: 1, borderRadius: 2 }}
              >
                이전
              </Button>
              <Button
                variant='contained'
                onClick={handleSubmit}
                disabled={submitting}
                sx={{ flex: 2, borderRadius: 2, fontWeight: 700 }}
              >
                { submitting ? '저장 중...' : '게시하기' }
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default CreatePostPage;
