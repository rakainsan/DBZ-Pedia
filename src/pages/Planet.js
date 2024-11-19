import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import PlanetCard from '../components/PlanetCard';

const Planet = () => {
  const [page, setPage] = useState(1);
  const [planets, setPlanets] = useState([]);
  const observerRef = useRef(null);

  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['planets', page],
    () => api.getPlanets(page),
    {
      keepPreviousData: true,
      onSuccess: (newData) => {
        setPlanets((prev) =>
          page === 1 ? newData.items : [...prev, ...newData.items]
        );
      },
    }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching) {
          const totalPages = data?.meta?.totalPages;
          if (totalPages && page < totalPages) {
            setPage((prevPage) => prevPage + 1);
          }
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
        // eslint-disable-next-line
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [data, page, isFetching]);

  if (isLoading && page === 1)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );

  if (isError)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" color="error">
          Error loading planets
        </Typography>
        <Typography variant="body2">{error.message}</Typography>
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ pb: 7, pt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ff9800, #f44336)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Planets in Dragon Ball Universe
        </Typography>
        <Box
          sx={{
            width: '100px',
            height: '4px',
            backgroundColor: '#f44336',
            margin: '0 auto',
            borderRadius: 2,
          }}
        ></Box>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {planets && planets.length > 0 ? (
          planets.map((planet) => (
            <Grid
              item
              xs={12} // Satu kartu per baris di perangkat kecil
              sm={6} // Dua kartu per baris di perangkat sedang
              md={4} // Tiga kartu per baris di perangkat besar
              lg={3} // Empat kartu per baris di perangkat sangat besar
              key={planet.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Link
                to={`/planet/${planet.id}`}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <PlanetCard planet={planet} />
              </Link>
            </Grid>
          ))
        ) : (
          <Typography>No planets found.</Typography>
        )}
      </Grid>

      {isFetching && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
          sx={{ height: 50 }}
        >
          <CircularProgress />
        </Box>
      )}

      <div ref={observerRef} style={{ height: '1px', marginTop: '50px' }}></div>
    </Container>
  );
};

export default Planet;
