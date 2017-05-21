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
  let from, to;
  if(req.query.date) {
    from = req.query.date.from;
    to = req.query.date.to;
  }
  const { interval } = req.query;
  Unit.getUnitDataFromKeyDate(unitId, unitKeyId, {
    date: {
      from,
      to
    },
    interval
  }, (err, data) => {
    if(data) {
      res.json(data);
    } else {
      res.status(400).send();
    }
  });
});

export default router;