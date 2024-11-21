import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Category, CompareArrowsOutlined, Person, PublicOutlined } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #e0e0e0', 
        zIndex: 10,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
        sx={{
          '& .MuiBottomNavigationAction-root': {
            color: '#757575', 
          },
          '& .MuiBottomNavigationAction-root:hover': {
            color: '#ff9800 !important', 
          },
          '& .Mui-selected': {
            color: '#ff9800 !important', 
          },
          '& .Mui-selected .MuiBottomNavigationAction-label': {
            fontWeight: 'bold', 
          },
        }}
      >
        <BottomNavigationAction 
          label="Home" 
          value="/" 
          icon={<Home />} 
        />
        <BottomNavigationAction 
          label="Categories" 
          value="/categories" 
          icon={<Category />} 
        />
        <BottomNavigationAction 
          label="Planet" 
          value="/Planet" 
          icon={<PublicOutlined />} 
        />
        <BottomNavigationAction 
          label="Comparison" 
          value="/compare" 
          icon={<CompareArrowsOutlined />} 
        />
        <BottomNavigationAction 
          label="Profile" 
          value="/profile" 
          icon={<Person />} 
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
