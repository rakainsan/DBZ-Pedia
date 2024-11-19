import React, { useState, useEffect } from 'react';
import { Container, TextField, Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import LoadingSpinner from '../components/LoadingSpinner'; // Impor komponen LoadingSpinner
import debounce from 'lodash/debounce';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch semua halaman data dari API
  const fetchAllCharacters = async () => {
    setIsFetching(true);
    try {
      let currentPage = 1;
      let allData = [];
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await fetch(`https://dragonball-api.com/api/characters?page=${currentPage}&limit=5`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          allData = [...allData, ...data.items];
        }

        hasNextPage = !!data.links?.next;
        currentPage++;
      }

      setAllCharacters(allData);
      setFilteredCharacters([]);
    } catch (error) {
      console.error('Error fetching all characters:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  const debouncedSearch = React.useMemo(
    () =>
      debounce((query) => {
        if (!query.trim()) {
          setFilteredCharacters([]);
          setIsSearching(false);
          return;
        }
        const results = allCharacters.filter((character) =>
          character.name.toLowerCase().includes(query.trim().toLowerCase())
        );
        setFilteredCharacters(results);
        setIsSearching(false);
      }, 500),
    [allCharacters]
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setIsSearching(true);
    debouncedSearch(value);
  };

  const charactersToDisplay = searchQuery.trim() ? filteredCharacters : allCharacters;

  return (
    <Container sx={{ pb: 7, pt: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #ff9800, #f44336)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}
      >
        Dragon Ball Z Characters
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
      <TextField
  fullWidth
  value={searchQuery}
  onChange={handleSearch}
  placeholder="Search Dragon Ball characters..."
  variant="outlined"
  size="small"
  sx={{
    mb: 3,
    width: { xs: '100%', sm: '400px' },
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#F5F5F5', // Warna abu terang
      color: '#000', // Warna teks hitam
      borderRadius: 2, // Membulatkan sudut
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.3)', // Outline abu gelap
      },
      '&:hover fieldset': {
        borderColor: '#FFA726', // Outline oranye saat hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFA726', // Outline oranye saat fokus
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(0, 0, 0, 0.5)', // Placeholder abu gelap
      opacity: 1,
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.5)' }} />
      </InputAdornment>
    ),
  }}
/>
</Box>

      {isFetching && <LoadingSpinner />} {/* Ganti dengan LoadingSpinner */}

      {!isFetching && (
        <Grid container spacing={2}>
          {charactersToDisplay.map((character) => (
            <Grid item xs={12} sm={6} md={4} key={character.id}>
              <Link to={`/character/${character.id}`} className="character-link" style={{ textDecoration: 'none' }}>
                <CharacterCard character={character} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}

      {isSearching && <LoadingSpinner />} {/* Ganti loading dengan LoadingSpinner */}

      {charactersToDisplay.length === 0 && !isFetching && !isSearching && (
        <Box display="flex" justifyContent="center" my={4}>
          <Typography variant="h6" color="textSecondary">
            {searchQuery.trim() ? `No results found for "${searchQuery}"` : 'No characters available.'}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Home;