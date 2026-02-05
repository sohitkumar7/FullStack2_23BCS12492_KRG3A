import React, { memo, useMemo } from 'react';
import { logs } from "../data/logs";
import Logs from "./logs";
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';

const DashboardSummary = memo(() => {
  // useMemo to calculate total carbon - avoids recalculation on every render
  const totalCarbon = useMemo(() => {
    return logs.reduce((sum, log) => sum + log.carbon, 0);
  }, []);

  const averageCarbon = useMemo(() => {
    return logs.length > 0 ? (totalCarbon / logs.length).toFixed(2) : 0;
  }, [totalCarbon]);

  const highestCarbonActivity = useMemo(() => {
    if (logs.length === 0) return 'N/A';
    return logs.reduce((max, log) => (log.carbon > max.carbon ? log : max), logs[0]);
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Summary Overview
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Carbon
              </Typography>
              <Typography variant="h4" color="primary">
                {totalCarbon}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                carbon units
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Average Carbon
              </Typography>
              <Typography variant="h4" sx={{ color: '#e65100' }}>
                {averageCarbon}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                per activity
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#fce4ec' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Activities
              </Typography>
              <Typography variant="h4" sx={{ color: '#c2185b' }}>
                {logs.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                total entries
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <Chip 
          label={`Highest Impact: ${highestCarbonActivity.activity} (${highestCarbonActivity.carbon} units)`}
          color="error"
          variant="outlined"
        />
      </Box>

      <Logs logs={logs} />
    </Box>
  );
});

DashboardSummary.displayName = 'DashboardSummary';

export default DashboardSummary;

