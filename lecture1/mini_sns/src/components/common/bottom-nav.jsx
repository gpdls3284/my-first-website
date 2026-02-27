import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';

/**
 * BottomNav 컴포넌트 - 하단 탭 네비게이션
 *
 * Props:
 * @param {object} currentUser - 현재 로그인 사용자 정보 [Required]
 */
function BottomNav({ currentUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ['/', '/posts', '/create', '/mypage'];
  const currentValue = routes.indexOf(location.pathname);

  const handleChange = (event, newValue) => {
    if (newValue === 2) {
      navigate('/create');
    } else {
      navigate(routes[newValue]);
    }
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={currentValue}
        onChange={handleChange}
        sx={{
          bgcolor: 'background.paper',
          '& .Mui-selected': { color: 'primary.main' },
        }}
      >
        <BottomNavigationAction label='홈' icon={<HomeIcon />} />
        <BottomNavigationAction label='탐색' icon={<ExploreIcon />} />
        <BottomNavigationAction
          label='작성'
          icon={
            <AddCircleIcon
              sx={{ fontSize: 40, color: 'primary.main', mt: -1 }}
            />
          }
        />
        <BottomNavigationAction label='마이' icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
