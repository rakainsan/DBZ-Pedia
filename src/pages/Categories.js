import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel, Grid, Button } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'; 
import TransgenderIcon from '@mui/icons-material/Transgender'; 
import GroupIcon from '@mui/icons-material/Group'; 
import CharacterCard from '../components/CharacterCard'; 
import LoadingSpinner from '../components/LoadingSpinner';

const Categories = () => {
  const [tabValue, setTabValue] = useState(0);  
  const [selectedCategory, setSelectedCategory] = useState('Saiyan'); 
  const navigate = useNavigate();

  const { data: characters, isLoading } = useQuery(
    ['characters', selectedCategory, tabValue],
    () => {
      if (tabValue === 0) {
        return api.getCharactersByRace(selectedCategory);
      } else if (tabValue === 1) {
        return api.getCharactersByGender(selectedCategory);
      } else if (tabValue === 2) {
        return api.getCharactersByAffiliation(selectedCategory);
      }
    }
  );

  const races = ['Saiyan', 'Human', 'Namekian', 'Majin', 'Frieza Race', 'Android', 'Jiren Race', 'God', 'Angel', 'Evil', 'Nucleico', 'Nucleico benigno', 'Unknown'];
  const genders = ['Male', 'Female', 'Unknown'];
  const affiliations = ['Z Fighter', 'Red Ribbon Army', 'Namekian Warrior', 'Freelancer', 'Army of Frieza', 'Pride Troopers', 'Assistant of Vermoud', 'God', 'Assistant of Beerus', 'Villain', 'Other'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTabChange = (event) => {
    const selectedTab = event.target.value;
    setTabValue(selectedTab);
    setSelectedCategory(selectedTab === 0 ? races[0] : selectedTab === 1 ? genders[0] : affiliations[0]);
  };

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`); 
  };

  if (isLoading) {
    return <LoadingSpinner />; 
  }

  return (
    <Container sx={{ pb: 7, pt: 2 }}>
      <Typography
        gutterBottom
        align="center"
        variant="h4"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #FFA500, #FF5722)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        Categories
      </Typography>

      {/* Dropdown for category type selection */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Category</InputLabel>
        <Select
          value={tabValue}
          onChange={handleTabChange}
          label="Select Category"
          sx={{
            backgroundColor: '#FFF3E0',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFA500',
            },
          }}
        >
          <MenuItem value={0} sx={{
            '&:hover': { backgroundColor: '#FFA500', color: '#FFFFFF' }
          }}>
            <AccessibilityNewIcon sx={{ mr: 2, color: '#FF5722' }} />
            Races
          </MenuItem>
          <MenuItem value={1} sx={{
            '&:hover': { backgroundColor: '#FFA500', color: '#FFFFFF' }
          }}>
            <TransgenderIcon sx={{ mr: 2, color: '#FF5722' }} />
            Genders
          </MenuItem>
          <MenuItem value={2} sx={{
            '&:hover': { backgroundColor: '#FFA500', color: '#FFFFFF' }
          }}>
            <GroupIcon sx={{ mr: 2, color: '#FF5722' }} />
            Affiliations
          </MenuItem>
        </Select>
      </FormControl>

      {/* Display the category options as buttons */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {(tabValue === 0 ? races : tabValue === 1 ? genders : affiliations).map((category) => (
          <Grid item xs={6} sm={4} key={category}>
            <Button
              variant={selectedCategory === category ? 'contained' : 'outlined'}
              sx={{
                color: selectedCategory === category ? '#FFFFFF' : '#FF5722',
                backgroundColor: selectedCategory === category ? '#FFA500' : 'transparent',
                borderColor: '#FFA500',
                '&:hover': {
                  backgroundColor: selectedCategory === category ? '#FF7043' : '#FFE0B2', // Warna hover oranye terang
                  borderColor: '#FF7043',
                },
              }}
              fullWidth
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Display the characters of the selected category using CharacterCard */}
      <Grid container spacing={2}>
        {characters?.map((character) => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <CharacterCard
              character={character}
              onClick={() => handleCharacterClick(character.id)} // Pass onClick with character ID
              sx={{
                backgroundColor: '#FFF3E0',
                borderColor: '#FFA500',
                '&:hover': {
                  boxShadow: '0px 4px 20px rgba(255, 87, 34, 0.2)',
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;