import React, { memo, useMemo } from 'react';
import { logs } from "../data/logs";
import { Grid, Card, CardContent, Typography, Box, LinearProgress, Alert } from '@mui/material';

const DashboardAnalutics = memo(() => {
  // useMemo to calculate analytics data
  const analytics = useMemo(() => {
    const totalCarbon = logs.reduce((sum, log) => sum + log.carbon, 0);
    
    const carbonBreakdown = logs.map(log => ({
      ...log,
      percentage: totalCarbon > 0 ? ((log.carbon / totalCarbon) * 100).toFixed(1) : 0
    }));

    const carbonDistribution = carbonBreakdown.sort((a, b) => b.carbon - a.carbon);

    return {
      totalCarbon,
      carbonDistribution,
      highImpactCount: logs.filter(log => log.carbon >= 5).length,
      lowImpactCount: logs.filter(log => log.carbon === 0).length
    };
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Analytics Overview
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                High Impact Activities
              </Typography>
              <Typography variant="h4" color="error.main">
                {analytics.highImpactCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                (≥5 carbon units)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Low Impact Activities
              </Typography>
              <Typography variant="h4" color="success.main">
                {analytics.lowImpactCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                (0 carbon units)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Carbon Distribution
          </Typography>
          {analytics.carbonDistribution.map((log) => (
            <Box key={log.id} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">
                  {log.activity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {log.carbon} units ({log.percentage}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={parseFloat(log.percentage)}
                sx={{ height: 8, borderRadius: 4 }}
                color={log.carbon >= 5 ? 'error' : log.carbon === 0 ? 'success' : 'primary'}
              />
            </Box>
          ))}
        </CardContent>
      </Card>

      {analytics.totalCarbon > 10 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Your carbon footprint is above average. Consider reducing high-impact activities.
        </Alert>
      )}
    </Box>
  );
});

DashboardAnalutics.displayName = 'DashboardAnalutics';

export default DashboardAnalutics;

