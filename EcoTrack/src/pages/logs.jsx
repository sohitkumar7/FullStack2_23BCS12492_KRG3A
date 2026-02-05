import React, { memo } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const Logs = memo(({ logs }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Activity Logs
        </Typography>
        <List>
          {logs.map((log) => (
            <ListItem key={log.id}>
              <ListItemText
                primary={log.activity}
                secondary={`${log.carbon} carbon units`}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Total logs: {logs.length}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});

Logs.displayName = 'Logs';

export default Logs;

