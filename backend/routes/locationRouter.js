import express from 'express';
import Location from '../models/Location';
import Unit from '../models/Unit';
let router = express.Router();

// get locations
router.get('/', (req, res) => {
  Location.getLocations((err, locations) => {
    res.json(locations);
  });
});

router.get('/:locationId', (req, res) => {
  const id = req.params.locationId;
  Location.getLocation(id, (err, location) => {
    if(err) {
      throw err;
    }
    res.json(location);
  });
});

router.get('/:locationId/units', (req, res) => {
  const id = req.params.locationId;
  Unit.getUnitsFromLocation(id, (err, units) => {
    if(err) {
      throw err;
    }
    res.json(units);
  });
});

export default router;