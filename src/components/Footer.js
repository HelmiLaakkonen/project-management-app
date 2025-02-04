import * as React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        padding: '20px',
        backgroundColor: '#dda0dd ', // Or same as the grey background if needed
        color: 'white',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        mt: 'auto', // Pushes footer down if content isn't tall enough
      }}
    >
      <Typography variant="body1">Authors: Helmi Laakkonen, Pinja Kemppainen, Teemu Räisänen</Typography>
    </Box>
  );
}

export default Footer;
