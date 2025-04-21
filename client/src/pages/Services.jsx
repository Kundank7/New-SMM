import React, { useState, useEffect } from 'react';
import { getServices } from '../services/api';
import { Box, Grid, Card, CardContent, Typography, Button, Container } from '@mui/material';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Loading services...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Services
      </Typography>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {service.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {service.category}
                </Typography>
                <Typography variant="body2" paragraph>
                  {service.description}
                </Typography>
                <Typography variant="body2">
                  Price: ${service.price}
                </Typography>
                <Typography variant="body2">
                  Quantity: {service.minQuantity} - {service.maxQuantity}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Average Time: {service.averageTime}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  href={`/services/${service._id}`}
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;