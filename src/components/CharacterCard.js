import React from 'react';
import { Card, CardMedia, Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const CharacterCard = ({ character, onClick }) => {
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
        backgroundColor: '#333',
        color: 'white',
        width: isMobile ? '100%' : 280,
        margin: '16px auto', 
        transition: 'transform 0.3s ease', 
        '&:hover': {
          transform: 'translateY(-8px)', 
        },
        backgroundImage: 'url("https://www.shutterstock.com/image-photo/see-classic-today-we-present-600nw-2522977275.jpg")', // Replace with the actual image URL
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
      }}
    >
      {/* Gambar Karakter */}
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

      {/* Konten Kartu (Nama, Rincian, dll.) */}
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
            fontSize: '0.9rem',
            color: 'lightgray',
            marginBottom: '8px',
            fontWeight: 500,
          }}
        >
          {character.race} | {character.gender}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            color: '#ffeb3b', 
            marginBottom: '6px',
          }}
        >
          Base KI: {character.ki}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            color: '#ffeb3b', 
            marginBottom: '6px',
          }}
        >
          Total KI: {character.maxKi}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            color: 'lightgray',
          }}
        >
          Affiliation: {character.affiliation}
        </Typography>
      </Box>
    </Card>
  );
};

export default CharacterCard;
