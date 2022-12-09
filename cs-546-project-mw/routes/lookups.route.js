import CurrencyConverter from "currency-converter-lt";

import hierJSON from "../hier.json" assert { type: "json" };
import { Router } from "express";
import { requireToken } from "../middlewares/token.js";
const lookupRouter = Router();

lookupRouter.get("/:code", requireToken(), (req, res) => {
	switch (req.params.code) {
		case "currencies":
			return res.json(new CurrencyConverter().currencies);
		case "hierarchy":
			return res.json(hierJSON);
		default:
			res.status(400).json({ message: "Invalid lookup code" });
	}
});

export default lookupRouter;
