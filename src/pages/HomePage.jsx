// src/components/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Container, Fab, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrainIcon from '@mui/icons-material/PlayArrow';
import TestIcon from '@mui/icons-material/CheckCircle';
import AppBar from '../components/AppBar/AppBar'

const HomePage = () => {
  const navigate = useNavigate();

  // Mock data for statistics
  const [statistics, setStatistics] = useState({
    datasetsTrained: 5,
    patientsCount: 120,
    avgHeartRate: 75,
    maxHeartRate: 160,
    minHeartRate: 45,
  });

  useEffect(() => {
    // Fetch data from API here if needed
  }, []);

  return (
    <div>
        <AppBar />
        <br />
    <Typography variant="h4" align="center" gutterBottom>
        LSTM Statistics
      </Typography>
      <Grid container spacing={4} style={{marginLeft:'0.5px'}}>
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{backgroundColor:'whitesmoke'}}>
            <CardContent>
              <Typography variant="h6">Datasets Trained</Typography>
              <Typography variant="h4">{statistics.datasetsTrained}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card style={{backgroundColor:'whitesmoke'}}>
            <CardContent>
              <Typography variant="h6">Number of Patients</Typography>
              <Typography variant="h4">{statistics.patientsCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card style={{backgroundColor:'whitesmoke'}}>
            <CardContent>
              <Typography variant="h6">Average Heart Rate (BPM)</Typography>
              <Typography variant="h4">{statistics.avgHeartRate}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card style={{backgroundColor:'whitesmoke'}}>
            <CardContent>
              <Typography variant="h6">Max Heart Rate (BPM)</Typography>
              <Typography variant="h4">{statistics.maxHeartRate}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card style={{backgroundColor:'whitesmoke'}}>
            <CardContent>
              <Typography variant="h6">Min Heart Rate (BPM)</Typography>
              <Typography variant="h4">{statistics.minHeartRate}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Floating Action Buttons for Train and Test */}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Fab color="primary" aria-label="train" onClick={() => navigate('/train')}>
          <TrainIcon />
        </Fab>
        <Fab color="primary" aria-label="test" onClick={() => navigate('/test')}>
          <TestIcon />
        </Fab>
      </Box>
    </div>
  );
};

export default HomePage;
