import express from 'express';
import Location from '../models/Location';
let router = express.Router();

// get locations
router.get('/', (req, res) => {
  Location.getLocations((results, fields) => {
    res.json(results);
  });
});

export default router;