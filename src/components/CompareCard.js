import React from 'react';
import { Card, CardMedia, Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const CompareCard = ({ character, isSelected, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      onClick={onClick} 
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        boxShadow: 5,
        cursor: 'pointer',
        backgroundColor: isSelected ? 'primary.main' : '#333',
        color: 'white',
        width: isMobile ? '100%' : 280,
        margin: '16px auto',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
        },
      }}
    >
      {/* Image of the character */}
      <CardMedia
        component="img"
        sx={{
          objectFit: 'cover',
          objectPosition: 'top',
          width: '100%',
          height: isMobile ? 320 : 360,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
        image={character.image} 
        alt={character.name}
      />

      {/* Card content (name and total power) */}
      <Box
        sx={{
          padding: '16px',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '0 0 4px 4px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: 'white',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          {character.name}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: '1.2rem',
            color: '#ffeb3b',
            marginBottom: '6px',
          }}
        >
          Total Power: {character.maxKi} 
        </Typography>
      </Box>
    </Card>
  );
};

export default CompareCard;