import express from 'express';
import Unit from '../models/Unit.js';
let router = express.Router();

// get units
router.get('/', (req, res) => {
  Unit.getUnits((results, fields) => {
    res.json(results);
  });
});

// get data keys from a unit
router.get('/:unitId', (req, res) => {
  Unit.getUnitKeys(req.params.unitId, (results, fields) => {
    res.json(results);
  });
});

// get data from a unit with speicified key
router.get('/:unitId/:unitKeyId', (req, res) => {
  Unit.getUnitDataFromKey(req.params.unitId, req.params.unitKeyId, (results, fields) => {
    res.json(results);
  });
});

export default router;