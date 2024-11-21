import React from 'react';
import { Box, Typography } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <img 
        src={`${process.env.PUBLIC_URL}/gokubaby.png`} 
        alt="Loading..."
        style={{
          width: '150px',
          height: 'auto',
          animation: 'spin 2s linear infinite' 
        }}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>Loading...</Typography> 
    </Box>
  );
};


// eslint-disable-next-line
export default () => (
  <>
    <style>
      {`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
    <LoadingSpinner />
  </>
);