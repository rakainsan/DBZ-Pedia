import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProfileCard = ({ avatarUrl, username, followers, bio, publicRepos, location }) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 3,
        boxShadow: 3,
        borderRadius: 2,
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={avatarUrl}
        alt={`${username}'s avatar`}
        sx={{
          borderRadius: '50%',
          width: 150,
          height: 150,
          objectFit: 'cover',
          mx: 'auto',
          mt: 3,
        }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {username}
        </Typography>
        {bio && (
          <Typography variant="body1" sx={{ mt: 1 }}>
            {bio}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          Followers: {followers}
        </Typography>
        {location && (
          <Typography variant="body2" color="text.secondary">
            Location: {location}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          Public Repositories: {publicRepos}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
