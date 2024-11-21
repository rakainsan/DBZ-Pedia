import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';
import { Container, Typography, Box, Paper, CardMedia } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner'; 

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/rakainsan');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching GitHub profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <LoadingSpinner />; 
  }

  return (
    <Container sx={{ pb: 7, pt: 2 }}>
      <Typography variant="h4"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ff9800, #f44336)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }} gutterBottom align="center">
        About Me
      </Typography>
      <ProfileCard
        avatarUrl={profile.avatar_url}
        username={profile.login}
        followers={profile.followers}
        bio={profile.bio}
        publicRepos={profile.public_repos}
        location={profile.location}
      />

      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFA500', mb: 2 }}>
          Tentang Aplikasi DBZ
        </Typography>

        
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: 200,
            objectFit: 'contain',
            marginBottom: 2,
          }}
          image="https://www.galeriebd.com/wp-content/uploads/2023/04/Animation_DRAGON_Ball_4_3.jpg"
          alt="Logo Aplikasi DBZ"
        />
        
        <Paper sx={{ padding: 3, backgroundColor: '#fff3e0', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Aplikasi DBZ adalah sebuah ensiklopedia yang berisi informasi detail mengenai karakter-karakter, ras-ras, dan planet-planet yang ada di dunia Dragon Ball. Aplikasi ini bertujuan untuk memberikan pengalaman mendalam bagi para penggemar Dragon Ball, baik yang sudah lama maupun yang baru mengenal dunia ini.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Di dalam aplikasi ini, pengguna dapat mengeksplorasi berbagai karakter dari universe Dragon Ball, mulai dari latar belakang karakter, ras yang mereka miliki, hingga planet tempat mereka berasal. Aplikasi ini menyajikan berbagai fitur menarik seperti profil karakter, detail planet, dan masih banyak lagi.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Apakah Anda penggemar lama atau baru dalam dunia Dragon Ball? Aplikasi ini menawarkan pengalaman yang seru dan penuh informasi yang akan memperkaya pengetahuan Anda tentang dunia Dragon Ball.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Untuk data dan informasi, aplikasi ini menggunakan API dari <strong>https://web.dragonball-api.com/</strong>, yang menyediakan berbagai informasi terkait dunia Dragon Ball secara lengkap.
          </Typography>
        </Paper>
      </Box>

      
      <Box sx={{ mt: 4, mb: 5 }} /> 
    </Container>
  );
};

export default Profile;