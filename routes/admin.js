const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const {
  getDashboard,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/adminController');

// Admin Dashboard
router.get('/dashboard', ensureAuthenticated, ensureAdmin, getDashboard);

// Announcement Management
router.get('/announcements', ensureAuthenticated, ensureAdmin, getAnnouncements);
router.post('/announcements', ensureAuthenticated, ensureAdmin, createAnnouncement);
router.put('/announcements/:id', ensureAuthenticated, ensureAdmin, updateAnnouncement);
router.delete('/announcements/:id', ensureAuthenticated, ensureAdmin, deleteAnnouncement);

// Add similar routes for other entities (bible readings, clergy, mass times, etc.)

module.exports = router;
