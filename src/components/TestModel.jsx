// src/components/TestModel.js
import React, { useState } from 'react';
import { Button, Typography, Grid, Container, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import AppBar from '../components/AppBar/AppBar'

const TestModel = () => {
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTest = async () => {
    if (!file) {
      setNotification({ open: true, message: "Please upload a CSV file", severity: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/test-LSTM", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const predictedHeartRate = response.data.predicted_heart_rate;
      const message = predictedHeartRate > 100 
        ? `High Heart Rate Alert: ${predictedHeartRate} BPM`
        : `Predicted Heart Rate: ${predictedHeartRate} BPM`;
      setNotification({ open: true, message, severity: predictedHeartRate > 100 ? 'error' : 'success' });
    } catch (error) {
      setNotification({ open: true, message: "Testing failed", severity: 'error' });
    }
  };

  return (
    <div >
        <AppBar/>
        <br/><br/>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Test LSTM Model
        </Typography>

        {/* File Upload Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            style={{backgroundColor:'grey'}}
          >
            Upload patient Data
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Grid>

        {/* Test Model Button */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleTest} fullWidth>
            Test Model
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TestModel;
