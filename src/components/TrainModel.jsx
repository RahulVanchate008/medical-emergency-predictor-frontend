// src/components/TrainModel.js
import React, { useState } from 'react';
import { Button, Typography, Grid, Container, Snackbar, Alert, Box } from '@mui/material';
import axios from 'axios';
import AppBar from '../components/AppBar/AppBar'

const TrainModel = () => {
  const [files, setFiles] = useState({ dat: null, hea: null, atr: null });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleTrain = async () => {
    if (!files.dat || !files.hea || !files.atr) {
      setNotification({ open: true, message: "Please upload all files (.dat, .hea, .atr)", severity: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append("dat_file", files.dat);
    formData.append("hea_file", files.hea);
    formData.append("atr_file", files.atr);

    try {
      const response = await axios.post("http://localhost:8000/upload-ecg", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNotification({ open: true, message: response.data.message, severity: 'success' });
    } catch (error) {
      setNotification({ open: true, message: "Training failed", severity: 'error' });
    }
  };

  return (
    
    <div >
        <AppBar />
        <br /><br />
      <Grid container spacing={2} direction="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Train LSTM Model
        </Typography>

        {/* File Upload Buttons */}
        {['dat', 'hea', 'atr'].map((fileType) => (
          <Grid item key={fileType} xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              style={{backgroundColor:'grey'}}
            >
              Upload {fileType.toUpperCase()} File
              <input
                type="file"
                name={fileType}
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleTrain} fullWidth>
            Train Model
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

export default TrainModel;
