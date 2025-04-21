import React, { useState, useEffect } from 'react';
import { getServices, createService, updateService } from '../../services/api';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Card,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel
} from '@mui/material';

const categories = ['Instagram', 'Facebook', 'Twitter', 'YouTube', 'TikTok', 'Other'];

const ServiceForm = ({ service, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Instagram',
    price: '',
    minQuantity: '',
    maxQuantity: '',
    averageTime: '',
    active: true,
    ...service
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'active' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Average Time"
              name="averageTime"
              value={formData.averageTime}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Min Quantity"
              name="minQuantity"
              value={formData.minQuantity}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Max Quantity"
              name="maxQuantity"
              value={formData.maxQuantity}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={handleChange}
                  name="active"
                />
              }
              label="Active"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">
          {service ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </form>
  );
};

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

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

  const handleCreateService = async (formData) => {
    try {
      await createService(formData);
      await fetchServices();
      setOpenDialog(false);
    } catch (err) {
      setError('Failed to create service');
    }
  };

  const handleUpdateService = async (formData) => {
    try {
      await updateService(selectedService._id, formData);
      await fetchServices();
      setOpenDialog(false);
      setSelectedService(null);
    } catch (err) {
      setError('Failed to update service');
    }
  };

  const handleOpenDialog = (service = null) => {
    setSelectedService(service);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedService(null);
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Loading services...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Manage Services
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add New Service
        </Button>
      </Box>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

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
                <Typography variant="body2">
                  Average Time: {service.averageTime}
                </Typography>
                <Typography variant="body2">
                  Status: {service.active ? 'Active' : 'Inactive'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleOpenDialog(service)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedService ? 'Edit Service' : 'Create New Service'}
        </DialogTitle>
        <ServiceForm
          service={selectedService}
          onSubmit={selectedService ? handleUpdateService : handleCreateService}
          onClose={handleCloseDialog}
        />
      </Dialog>
    </Container>
  );
};

export default AdminServices;