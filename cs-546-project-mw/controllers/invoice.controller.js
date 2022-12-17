import CC from 'currency-converter-lt';

import { Invoice } from '../models/Invoice.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

export const createInvoice = async (req, res) => {
  try {
    const { supplierID, invoiceProducts, currency } = req.body;
    const ownerId = req.user.uid;
    const supplierExists = await User.findById(supplierID);
    if (!supplierExists) return res.status(400).json({ errors: [{ msg: 'Invalid supplier id' }] });
    const productErrors = [];
    let gross_amount = 0;
    for (let i = 0; i < invoiceProducts.length; i++) {
      const product = invoiceProducts[i];
      const productExists = await Product.findById(product.productID);
      if (!productExists) {
        productErrors.push({ msg: `Product ${product.productID} does not exist` });
        continue;
      }
      const supplierExists = productExists.suppliers.find((supp) => supp.supplierID === supplierID);
      if (!supplierExists) {
        productErrors.push({ msg: `Product ${product.productID} does not exist for this supplier` });
        continue;
      }
      try {
        const currenyConvertor = new CC();
        let price = await currenyConvertor.from(supplierExists.currency).to(currency).amount(supplierExists.price).convert();
        product.price = price;
        gross_amount += await currenyConvertor
          .from(supplierExists.currency)
          .to(currency)
          .amount(supplierExists.price * product.quantity)
          .convert();
      } catch (e) {
        product.push({ msg: e.message });
      }
    }
    if (productErrors.length > 0) return res.status(400).json({ errors: productErrors });
    const invoice = new Invoice({
      ownerId,
      supplierID,
      currency,
      invoiceProducts,
      gross_amount,
    });
    await invoice.save();
    res.json(invoice.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};

export const approveInvoice = async (req, res) => {
  try {
    const { due_date, paidAmount, net_amount } = req.body;
    const invoice = await Invoice.findById(req.param.id);
    if (invoice.gross_amount <= net_amount) {
      return res.status(400).json({ errors: [{ msg: 'Net amount cant be less than gross amount' }] });
    }
    if (paidAmount > net_amount) {
      return res.status(400).json({ errors: [{ msg: 'Paid amount cant be less than net amount' }] });
    } else if (paidAmount === net_amount) {
      invoice.paymentStatus = 'PAID';
    } else {
      invoice.paymentStatus = 'PENDING';
    }
    invoice.due_date = due_date;
    invoice.paidAmount = paidAmount;
    invoice.net_amount = net_amount;
    invoice.deliveredDate;
    invoice.save();
    res.json(invoice.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};

export const completeInvoice = async (req, res) => {
  try {
    const { deliveredDate } = req.body;

    const invoice = await Invoice.findById(req.param.id);

    invoice.deliveredDate = deliveredDate;
    invoice.paymentStatus = 'PAID';
    invoice.paidAmount = invoice.net_amount;
    invoice.save();
    res.json(invoice.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({});
    res.json(invoices.map((invoice) => invoice.toJSON()));
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};

export const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (invoice === null) {
      return res.status(404).json({ errors: [{ msg: 'Not Found' }] });
    }
    res.json(invoice.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};
