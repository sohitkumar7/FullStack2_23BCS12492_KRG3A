import React, { memo } from 'react';
import { Link, Outlet } from "react-router-dom";
import { Box, Tabs, Tab, Container, Paper, Typography } from '@mui/material';

const DashboardLayout = memo(() => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Dashboard
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs aria-label="dashboard tabs">
            <Tab
              label="Summary"
              component={Link}
              to="summary"
            />
            <Tab
              label="Analytics"
              component={Link}
              to="analytics"
            />
          </Tabs>
        </Box>
        <Outlet />
      </Paper>
    </Container>
  );
});

DashboardLayout.displayName = 'DashboardLayout';

export default DashboardLayout;

