import React, { memo, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button, Container, Avatar } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const Login = memo(() => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    navigate("/");
  }, [setIsAuthenticated, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={4}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
            <LockIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h4" gutterBottom color="primary">
            EcoTrack Login
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to access your carbon footprint dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
            sx={{ px: 4, py: 1.5 }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
});

Login.displayName = 'Login';

export default Login;

