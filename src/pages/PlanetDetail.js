import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { api } from '../services/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Grid,
  Divider,
  IconButton
} from '@mui/material';
 

const PlanetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: planet, isLoading } = useQuery(
    ['planetDetail', id],
    () => api.getPlanetById(id)
  );
  const location = useLocation();

  // Hide bottom navbar when on planet detail page
  useEffect(() => {
    const navbar = document.getElementById('bottom-navbar');
    if (navbar) {
      navbar.style.display = location.pathname.includes('planet') ? 'none' : 'block';
    }

    return () => {
      if (navbar) {
        navbar.style.display = 'block'; 
      }
    };
  }, [location]);

  if (isLoading) {
    return <LoadingSpinner />; 
  }

  return (
    <Container sx={{ pb: 7, pt: 4 }}>
      <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#FFA500' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{
            mb: 4,
            flex: 1,
            color: '#FFA500',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ff9800, #f44336)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Planet Details
        </Typography>
      </Box>

      {planet && (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Card sx={{ display: 'flex', borderRadius: 2, boxShadow: 3 }}>
              {/* Planet Image */}
              <CardMedia
                component="img"
                sx={{
                  width: '40%',
                  height: 350,
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
                image={planet.image}
                alt={planet.name}
              />
              {/* Planet Details */}
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography gutterBottom variant="h4" sx={{ fontWeight: 'bold', color: '#FFA500' }}>
                  {planet.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Divider sx={{ borderBottomWidth: 2, borderColor: '#FFA500' }} />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold', color: '#FFA500' }}>
                      Description:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {planet.description || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold', color: '#FFA500' }}>
                      Status:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {planet.isDestroyed ? 'Destroyed' : 'Intact'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Characters Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, color: '#FFA500' }}>
        Characters from {planet.name}
      </Typography>
      <Grid container spacing={2}>
        {planet.characters && planet.characters.length > 0 ? (
          planet.characters.map((character) => (
            <Grid item xs={12} sm={6} md={4} key={character.id}>
              <Card sx={{ textAlign: 'center', border: '1px solid #FFA500', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'contain',
                    borderRadius: 2,
                  }}
                  image={character.image}
                  alt={character.name}
                />
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FFA500' }}>
                    {character.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {character.race || '-'} | Ki: {character.maxKi || '-'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {character.description.length > 80
                      ? `${character.description.substring(0, 80)}...`
                      : character.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ padding: 2 }}>
              No characters affiliated with this planet.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default PlanetDetail;