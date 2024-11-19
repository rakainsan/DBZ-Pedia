import axios from 'axios';

const BASE_URL = 'https://dragonball-api.com/api/characters';
const PLANET_URL = 'https://dragonball-api.com/api/planets';

// Create axios instance with common config
const apiClient = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

export const api = {
  getAllCharacters: async (page = 1) => {
    try {
      const response = await apiClient.get(`${BASE_URL}`, {
        params: {
          page
        }
      });
      
      console.log('getAllCharacters response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getAllCharacters:', error.response || error);
      throw error;
    }
  },

  searchCharacters: async (query, page = 1) => {
    try {
      const response = await apiClient.get(`${BASE_URL}`, {
        params: {
          name: query.trim(), // Directly use the trimmed query
          page,
        },
      });
  
      console.log('searchCharacters response:', response.data);
      if (!response.data || !response.data.items) {
        throw new Error('No characters found');
      }
  
      return response.data;
    } catch (error) {
      console.error('Error in searchCharacters:', error.response?.data || error.message);
      throw error;
    }
  },

  // ... rest of your API methods remain the same


  getNextCharacters: async (nextUrl) => {
    try {
      const response = await axios.get(nextUrl);

      console.log('Next page response:', response.data); // Log for debugging

      if (response.data && Array.isArray(response.data.items)) {
        return response.data; // Return full response, including meta and links
      } else {
        throw new Error('Data format is not as expected');
      }
    } catch (error) {
      console.error('Error fetching next page of characters:', error);
      throw error;
    }
  },

  getPlanetById: async (id) => {
    try {
      const response = await axios.get(`${PLANET_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching planet by ID:', error);
      throw error;
    }
  },


  getCharacterById: async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  getCharactersByRace: async (race) => {
    const response = await axios.get(`${BASE_URL}?race=${race}`);
    return response.data;
  },

  getCharactersByGender: async (gender) => {
    const response = await axios.get(`${BASE_URL}?gender=${gender}`);
    return response.data;
  },

  getCharactersByAffiliation: async (affiliation) => {
    const response = await axios.get(`${BASE_URL}?affiliation=${affiliation}`);
    return response.data;
  },

  getPlanets: async (page = 1) => {
    try {
      const response = await axios.get(`${PLANET_URL}?page=${page}`);
      console.log('Planet API response:', response.data); // Log for debugging

      if (response.data && response.data.items) {
        return response.data; // Return full data, including metadata
      } else {
        throw new Error('Planet data format is not as expected');
      }
    } catch (error) {
      console.error('Error fetching planets from API:', error);
      throw error;
    }
  }
};
