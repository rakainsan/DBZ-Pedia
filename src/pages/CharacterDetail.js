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
 

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: character, isLoading } = useQuery(
    ['character', id],
    () => api.getCharacterById(id)
  );

  const location = useLocation(); 

  
  useEffect(() => {
    const navbar = document.getElementById('bottom-navbar'); 
    if (navbar) {
      navbar.style.display = location.pathname.includes('character') ? 'none' : 'block';
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
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#ff9800' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{
            mb: 4,
            flex: 1,
            color: '#ff9800',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ff9800, #f44336)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Character Details
        </Typography>
      </Box>

      {character && (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Card sx={{ display: 'flex', borderRadius: 2, boxShadow: 3 }}>
              {/* Character Image */}
              <CardMedia
                component="img"
                sx={{
                  width: '40%',
                  height: 350,
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
                image={character.image}
                alt={character.name}
              />
              {/* Character Details */}
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: 'bold', color: '#ff9800' }}
                >
                  {character.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Divider sx={{ borderBottomWidth: 2, borderColor: '#ff9800' }} />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontWeight: 'bold', color: '#ff9800' }}
                    >
                      Race:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {character.race || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontWeight: 'bold', color: '#ff9800' }}
                    >
                      Planet:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {character.originPlanet?.name || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontWeight: 'bold', color: '#ff9800' }}
                    >
                      Power Level:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {character.maxKi || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontWeight: 'bold', color: '#ff9800' }}
                    >
                      Affiliation:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {character.affiliation || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontWeight: 'bold', color: '#ff9800' }}
                    >
                      Description:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {character.description || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontWeight: 'bold', color: '#ff9800' }}
                    >
                      Transformations:
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                      {character.transformations && character.transformations.length > 0 ? (
                        character.transformations.map((transformation) => (
                          <Grid item xs={12} sm={6} md={4} key={transformation.id}>
                            <Card sx={{ textAlign: 'center', boxShadow: 2 }}>
                              <CardMedia
                                component="img"
                                sx={{
                                  width: '100%',
                                  height: 200,
                                  objectFit: 'contain',
                                  borderRadius: 2,
                                }}
                                image={transformation.image}
                                alt={transformation.name}
                              />
                              <CardContent>
                                <Typography
                                  variant="body1"
                                  sx={{ fontWeight: 'bold', color: '#ff9800' }}
                                >
                                  {transformation.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Ki: {transformation.ki}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))
                      ) : (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            textAlign: 'center',
                            padding: 2,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            border: '1px solid #ddd',
                            marginTop: 2,
                            marginBottom: 2,
                          }}
                        >
                          No transformations available.
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CharacterDetail;