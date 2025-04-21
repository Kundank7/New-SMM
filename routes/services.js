const express = require('express');
const Service = require('../models/Service');
const Order = require('../models/Order');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all active services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ active: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get service by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new service (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update service (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'category', 'price', 'minQuantity', 'maxQuantity', 'averageTime', 'active'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    updates.forEach(update => service[update] = req.body[update]);
    await service.save();

    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create new order
router.post('/:id/order', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const { quantity, link } = req.body;
    
    if (quantity < service.minQuantity || quantity > service.maxQuantity) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    const amount = service.price * quantity;
    if (req.user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Create order and update user balance
    const order = new Order({
      user: req.user._id,
      service: service._id,
      quantity,
      link,
      amount
    });

    req.user.balance -= amount;
    await Promise.all([order.save(), req.user.save()]);

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user orders
router.get('/orders/me', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('service')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;