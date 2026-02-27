import React, { useState, useEffect } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { supabase } from '../lib/supabase';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

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
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');

  const fetchUnsplashImages = async () => {
    setLoadingImages(true);
    setImageError('');
    setSelectedImage(null);

    const query = location.trim() || 'travel';
    const page = Math.floor(Math.random() * 5) + 1;

    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=6&page=${page}&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
      );
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        setImages(data.results.map((img) => img.urls.regular));
      } else {
        setImageError('검색 결과가 없습니다. 다른 장소명을 입력해보세요.');
        setImages([]);
      }
    } catch {
      setImageError('이미지를 불러오지 못했습니다. 다시 시도해주세요.');
    } finally {
      setLoadingImages(false);
    }
  };

  const handleGoToStep2 = () => {
    setError('');
    setStep(2);
    fetchUnsplashImages();
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
              helperText='장소를 입력하면 관련 이미지를 추천해드려요'
            />

            <Button
              variant='contained'
              fullWidth
              size='large'
              onClick={handleGoToStep2}
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
              { location ? `"${location}" 관련 사진을 불러왔어요` : '여행 사진을 선택하거나 건너뛰세요' }
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <Button
                startIcon={<RefreshIcon />}
                onClick={fetchUnsplashImages}
                size='small'
                variant='outlined'
                disabled={loadingImages}
              >
                다른 사진 보기
              </Button>
            </Box>

            { loadingImages ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
              </Box>
            ) : imageError ? (
              <Alert severity='warning' sx={{ mb: 2 }}>{ imageError }</Alert>
            ) : (
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
            )}

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
