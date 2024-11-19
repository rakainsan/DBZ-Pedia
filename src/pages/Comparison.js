import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';
import CompareCard from '../components/CompareCard';
import LoadingSpinner from '../components/LoadingSpinner'; 

const Comparison = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Power scale conversion constants
  const POWER_SCALES = {
    SEPTILLION: 1000000000000000000000000,
    SEXTILLION: 1000000000000000000000,
    QUINTILLION: 1000000000000000000,
    QUADRILLION: 1000000000000000,
    TRILLION: 1000000000000,
    BILLION: 1000000000,
    MILLION: 1000000,
  };

  // Filter characters based on search query
  const filteredCharacters = allCharacters.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const parsePowerLevel = (powerString) => {
    if (!powerString || powerString.toLowerCase() === 'unknown') return null;

    const normalizedPower = powerString.toString().toLowerCase();
    let numericValue = 0;

    if (normalizedPower.includes('septillion')) {
      numericValue = parseFloat(normalizedPower) * POWER_SCALES.SEPTILLION;
    } else if (normalizedPower.includes('sextillion')) {
      numericValue = parseFloat(normalizedPower) * POWER_SCALES.SEXTILLION;
    } else if (normalizedPower.includes('quintillion')) {
      numericValue = parseFloat(normalizedPower) * POWER_SCALES.QUINTILLION;
    } else if (normalizedPower.includes('quadrillion')) {
      numericValue = parseFloat(normalizedPower) * POWER_SCALES.QUADRILLION;
    } else if (normalizedPower.includes('trillion')) {
      numericValue = parseFloat(normalizedPower) * POWER_SCALES.TRILLION;
    } else if (normalizedPower.includes('billion')) {
      numericValue = parseFloat(normalizedPower) * POWER_SCALES.BILLION;
    } else if (normalizedPower.includes('million')) {
      numericValue = parseFloat(normalizedPower) * POWER_SCALES.MILLION;
    } else {
      numericValue = parseFloat(normalizedPower);
    }

    return isNaN(numericValue) ? null : numericValue;
  };

  const fetchAllCharacters = async () => {
    setIsFetching(true);
    try {
      let currentPage = 1;
      let allData = [];
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await fetch(`https://dragonball-api.com/api/characters?page=${currentPage}&limit=10`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          allData = [...allData, ...data.items];
        }

        hasNextPage = !!data.links?.next;
        currentPage++;
      }

      setAllCharacters(allData);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  const handleSelectCharacter = (character) => {
    setSelectedCharacters((prev) =>
      prev.includes(character)
        ? prev.filter((item) => item !== character)
        : [...prev, character].slice(0, 2)
    );
    setWinner(null);
    setIsTie(false);
    setIsInvalid(false);
  };

  const handleCompare = () => {
    if (selectedCharacters.length === 2) {
      const [char1, char2] = selectedCharacters;
      const power1 = parsePowerLevel(char1.totalPower || char1.maxKi);
      const power2 = parsePowerLevel(char2.totalPower || char2.maxKi);

      if (power1 === null || power2 === null) {
        setWinner(null);
        setIsTie(false);
        setIsInvalid(true);
        return;
      }

      if (power1 === power2) {
        setWinner(null);
        setIsTie(true);
        setIsInvalid(false);
      } else {
        const winner = power1 > power2 ? char1 : char2;
        setWinner(winner);
        setIsTie(false);
        setIsInvalid(false);
      }
    }
  };

  const resetComparison = () => {
    setSelectedCharacters([]);
    setWinner(null);
    setIsTie(false);
    setIsInvalid(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fff', color: '#000', py: 2 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: '#FFA726',
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          Compare Dragon Ball Characters
        </Typography>

        {/* Search Input */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
  <TextField
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search characters..."
    variant="outlined"
    size="small"
    sx={{
      width: { xs: '100%', sm: '400px' },
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#F5F5F5', // Warna abu terang untuk kontras lembut
        color: '#000', // Warna teks hitam untuk keterbacaan
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
      '& .MuiInputLabel-root': {
        color: '#666', // Label dengan warna abu-abu
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'rgba(0, 0, 0, 0.5)', // Placeholder dengan abu gelap
        opacity: 1,
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.5)' }} /> {/* Ikon abu gelap */}
        </InputAdornment>
      ),
    }}
  />
</Box>


        {isFetching ? (
          <LoadingSpinner text="Loading Dragon Ball Characters..." />
        ) : (
          <>
            {selectedCharacters.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Grid container alignItems="center" justifyContent="center" spacing={1}>
                  <Grid item xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {selectedCharacters[0] && (
                      <Box sx={{ transform: 'scale(0.9)' }}>
                        <CompareCard
                          character={selectedCharacters[0]}
                          isSelected
                          onClick={() => handleSelectCharacter(selectedCharacters[0])}
                        />
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} sm="auto" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 1 }}>
                    {selectedCharacters.length === 2 && !winner && !isTie && !isInvalid && (
                      <IconButton
                        size="small"
                        sx={{
                          background: 'linear-gradient(to right, #FFA726, #F44336)',
                          color: '#fff',
                          p: 1,
                          '&:hover': {
                            background: 'linear-gradient(to right, #F44336, #FFA726)',
                          },
                        }}
                        onClick={handleCompare}
                      >
                        <SportsMmaIcon sx={{ fontSize: 24 }} />
                      </IconButton>
                    )}
                    {(winner || isTie || isInvalid) && (
                      <IconButton
                        size="small"
                        sx={{
                          background: '#FF9800',
                          color: '#fff',
                          p: 1,
                          '&:hover': {
                            background: '#FF5722',
                          },
                        }}
                        onClick={resetComparison}
                      >
                        <ReplayIcon sx={{ fontSize: 24 }} />
                      </IconButton>
                    )}
                  </Grid>

                  <Grid item xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {selectedCharacters[1] && (
                      <Box sx={{ transform: 'scale(0.9)' }}>
                        <CompareCard
                          character={selectedCharacters[1]}
                          isSelected
                          onClick={() => handleSelectCharacter(selectedCharacters[1])}
                        />
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Result Display */}
            {isInvalid ? (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="h6" color="#F44336">
                  Comparison not valid - Power level unknown
                </Typography>
              </Box>
            ) : isTie ? (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="h6" color="#FFA726">
                  It's a tie!
                </Typography>
              </Box>
            ) : winner ? (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Winner:</Typography>
                <Box sx={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
                  <CompareCard character={winner} />
                </Box>
              </Box>
            ) : (
              <>
                {/* No Results Message */}
                {searchQuery && filteredCharacters.length === 0 ? (
                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="rgba(255, 255, 255, 0.7)">
                      No characters found matching "{searchQuery}"
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={1} justifyContent="center">
                    {filteredCharacters.map((character) => (
                      <Grid item xs={6} sm={4} md={3} lg={2} key={character.id}>
                        <Box 
                          sx={{ 
                            transform: 'scale(0.85)',
                            transformOrigin: 'center top',
                          }}
                        >
                          <CompareCard
                            character={character}
                            isSelected={selectedCharacters.includes(character)}
                            onClick={() => handleSelectCharacter(character)}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Comparison;