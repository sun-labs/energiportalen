import express from 'express';
import Unit from '../models/Unit.js';
let router = express.Router();

// get units
router.get('/', (req, res) => {
  Unit.getUnits((err, units) => {
    res.json(units);
  });
});

// get data keys from a unit
router.get('/:unitId', (req, res) => {
  Unit.getUnitKeys(req.params.unitId, (err, keys) => {
    res.json(keys);
  });
});

// get data from a unit with speicified key
router.get('/:unitId/:unitKeyId', (req, res) => {
  const { unitId, unitKeyId } = req.params;
  Unit.getUnitDataFromKey(unitId, unitKeyId, (err, data) => {
    res.json(data);
  });
});

export default router;