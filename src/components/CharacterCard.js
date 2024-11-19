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
        borderRadius: 4, // Rounded corners for a modern look
        boxShadow: 5, // Slightly stronger shadow for better depth
        cursor: 'pointer',
        backgroundColor: '#333',
        color: 'white',
        width: isMobile ? '100%' : 280,
        margin: '16px auto', // Adds spacing between cards and centers them
        transition: 'transform 0.3s ease', // Smooth card hover effect
        '&:hover': {
          transform: 'translateY(-8px)', // Slight lift on hover for interactivity
        },
        backgroundImage: 'url("https://www.shutterstock.com/image-photo/see-classic-today-we-present-600nw-2522977275.jpg")', // Replace with the actual image URL
        backgroundSize: 'cover', // Ensure the image covers the card area
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Ensure the image doesn't repeat
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
          transition: 'transform 0.3s ease', // Smooth transition for the image scaling
          '&:hover': {
            transform: 'scale(1.1)', // Zoom effect on hover
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
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for text section
          borderRadius: '0 0 4px 4px', // Rounded corners on the bottom
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: isMobile ? '1.1rem' : '1.3rem', // Slightly smaller text on mobile
            color: 'white',
            textTransform: 'uppercase', // Uppercase for emphasis
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
            color: '#ffeb3b', // Bright yellow for key attributes
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
            color: '#ffeb3b', // Bright yellow for key attributes
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
