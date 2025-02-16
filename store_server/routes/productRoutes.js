import express from 'express';
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
  res.send('Product list');
});

export default router;  // This is a default export
