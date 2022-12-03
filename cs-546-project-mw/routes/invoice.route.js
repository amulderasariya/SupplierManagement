import { Router } from 'express';
import { createInvoice } from '../controllers/invoice.controller.js';
import { requireToken } from '../middlewares/token.js';
import { validateInvoice } from '../utils/validation.js';

const invoiceRouter = Router();

// invoiceRouter.get('/', requireToken, getInvoices);
// invoiceRouter.get('/:id', requireToken, validateInvoice.get, getProduct);

invoiceRouter.post('/', requireToken(['SUPPLIER']), validateInvoice.create, createInvoice);
// invoiceRouter.delete('/:id', requireToken, validateInvoice.remove, removeProduct);

export default invoiceRouter;
