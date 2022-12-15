import CurrencyConverter from 'currency-converter-lt';

import hierJSON from '../hier.json' assert { type: 'json' };
import { Router } from 'express';
import { requireToken } from '../middlewares/token.js';
import { City, Country, State } from 'country-state-city';
const lookupRouter = Router();

lookupRouter.get('/:code', requireToken(), (req, res) => {
  switch (req.params.code) {
    case 'currencies':
      return res.json(new CurrencyConverter().currencies);
    case 'hierarchy':
      return res.json(hierJSON);
    case 'country':
      return res.json(Country.getAllCountries());
    case 'state': // http://localhost:8000/lookup/state?country=US
      return res.json(State.getStatesOfCountry(req.query.country));
    case 'city': //	http://localhost:8000/lookup/city?country=US&state=NJ
      return res.json(City.getCitiesOfState(req.query.country, req.query.state));
    default:
      res.status(400).json({ message: 'Invalid lookup code' });
  }
});

export default lookupRouter;
