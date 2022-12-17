import { Router } from 'express';
import {
  approveInvoice,
  completeInvoice,
  createInvoice,
  getInvoice,
  getInvoices,
} from '../controllers/invoice.controller.js';
import { requireToken } from '../middlewares/token.js';
import { validateInvoice } from '../utils/validation.js';

const invoiceRouter = Router();

invoiceRouter.get('/', requireToken(), getInvoices);
invoiceRouter.post('/', requireToken(['OWNER']), validateInvoice.create, createInvoice);
invoiceRouter.get('/:id', requireToken(), validateInvoice.get, getInvoice);
invoiceRouter.post('/:id/approve', requireToken(['SUPPLIER']), validateInvoice.approve, approveInvoice);
invoiceRouter.post('/:id/complete', requireToken(['OWNER']), validateInvoice.complete, completeInvoice);

// invoiceRouter.delete('/:id', requireToken, validateInvoice.remove, removeProduct);

export default invoiceRouter;
