import { Router } from 'express';
import { upsertProduct, getProduct, getProducts, removeProduct } from '../controllers/product.controller.js';
import { requireToken } from '../middlewares/token.js';
import { listOfCurrencies, validateProduct } from '../utils/validation.js';
const productRouter = Router();

// http://localhost:8000/products?category=AUTOMOTIVE&name=ca&department=HL&subCategory=AUTO BATTERIES
productRouter.get('/', requireToken(), validateProduct.getProducts, getProducts);
productRouter.get('/:id', requireToken(), validateProduct.get, getProduct);

productRouter.post('/', requireToken(['SUPPLIER']), validateProduct.upsert, upsertProduct);
productRouter.delete('/:id', requireToken(['SUPPLIER']), validateProduct.remove, removeProduct);

export default productRouter;
