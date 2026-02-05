import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import NatureIcon from '@mui/icons-material/Nature';

const Header = memo(() => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
      <Toolbar>
        <NatureIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
          EcoTrack
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ color: 'white' }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{ color: 'white' }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';

export default Header;

