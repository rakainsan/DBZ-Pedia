import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';

const PlanetCard = ({ planet }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        marginBottom: 2,
        borderRadius: 3, // Rounded corners
        boxShadow: 5, // Shadow for depth
        overflow: 'hidden', // Ensure content doesn't spill out
        position: 'relative', // For overlay positioning
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effects
        '&:hover': {
          transform: 'scale(1.05)', // Slight zoom on hover
          boxShadow: 8, // Stronger shadow on hover
        },
      }}
    >
      {/* Planet Image with Overlay */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={planet.image}
          alt={planet.name}
        />
        {/* Overlay for Planet Name */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.8))',
            color: 'white',
            padding: '8px 16px',
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {planet.name}
          </Typography>
        </Box>
      </Box>

      {/* Planet Details */}
      <CardContent sx={{ backgroundColor: '#f9f9f9', padding: 3 }}>
        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          {planet.description.length > 80
            ? `${planet.description.substring(0, 80)}...`
            : planet.description}
        </Typography>

        {/* Status */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chip
            label={planet.isDestroyed ? "Destroyed" : "Not Destroyed"}
            color={planet.isDestroyed ? "error" : "success"}
            sx={{
              fontWeight: 'bold',
              padding: '0 8px',
              fontSize: '0.9rem',
              borderRadius: 2,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlanetCard;
