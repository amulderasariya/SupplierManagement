import CC from 'currency-converter-lt';

import { Invoice } from '../models/Invoice.js';
import { PreBuild } from '../models/preBuild.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

export const createInvoice = async (req, res) => {
  try {
    const { supplierID, invoiceProducts, currency } = req.body;
    const ownerID = req.user.uid;
    const supplierExists = await User.findById(supplierID);
    if (!supplierExists) return res.status(400).json({ errors: [{ msg: 'Invalid supplier id' }] });
    const productErrors = [];
    let gross_amount = 0;
    for (let i = 0; i < invoiceProducts.length; i++) {
      const product = {};
      product.productID = invoiceProducts[i].productID;
      product.quantity = invoiceProducts[i].quantity;
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
        if (isNaN(price)) {
          productErrors.push({ msg: `Product ${product.productID}, We are not able to convert currenct at the moment, please try again later` });
        }
        product.price = price;
        gross_amount += price * product.quantity;
      } catch (e) {
        productErrors.push({ msg: e.message });
      }
      invoiceProducts[i] = product;
    }
    let status = 'PENDING';
    if (productErrors.length > 0) return res.status(400).json({ errors: productErrors });
    const invoice = new Invoice({
      ownerID,
      supplierID,
      currency,
      invoiceProducts,
      gross_amount,
      status,
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
    const isSeedRunning = await PreBuild.find();
    const { due_date, paidAmount, net_amount } = req.body;
    const invoice = await Invoice.findById(req.params.id);
    if (invoice === null) {
      return res.status(404).json({ errors: [{ msg: 'Not Found' }] });
    }
    if (invoice.supplierID !== req.user.uid) {
      return res.status(403).json({ errors: [{ msg: 'Forbidden' }] });
    }
    if (invoice.status !== 'PENDING') {
      return res.status(400).json({ errors: [{ msg: 'Invoice is not in PENDING State' }] });
    }
    if (invoice.gross_amount > net_amount) {
      return res.status(400).json({ errors: [{ msg: 'Net amount cannot be less than gross amount' }] });
    }
    if (paidAmount > net_amount) {
      return res.status(400).json({ errors: [{ msg: 'Paid amount cannot be more than net amount' }] });
    } else if (paidAmount === net_amount) {
      invoice.paymentStatus = 'PAID';
    } else {
      invoice.paymentStatus = 'PENDING';
    }
    if (isSeedRunning[0] && !isSeedRunning[0].isSeedRunning) {
      if (due_date.getTime() < new Date().getTime()) {
        return res.status(400).json({ errors: [{ msg: 'Due date cannot be in the past' }] });
      }
    }
    invoice.due_date = due_date;
    invoice.paidAmount = paidAmount;
    invoice.net_amount = net_amount;
    invoice.status = 'APPROVED';
    for (let i = 0; i < invoice.invoiceProducts.length; i++) {
      let product = invoice.invoiceProducts[i].toJSON();
      const productExists = await Product.findById(product.productID);
      const supplierExists = productExists.suppliers.find((supp) => supp.supplierID === invoice.supplierID);
      if (supplierExists.stock >= product.quantity) {
        supplierExists.stock = supplierExists.stock - product.quantity;
      } else {
        return res.status(400).json({ errors: [{ msg: 'Stock is lower than quantity in Invoice' }] });
      }
      await productExists.save();
      await invoice.save();
    }
    res.json(invoice.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};

export const rejectInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (invoice === null) {
      return res.status(404).json({ errors: [{ msg: 'Not Found' }] });
    }
    if (invoice.supplierID !== req.user.uid) {
      return res.status(403).json({ errors: [{ msg: 'Forbidden' }] });
    }
    if (invoice.status !== 'PENDING') {
      return res.status(400).json({ errors: [{ msg: 'Invoice is not in PENDING State' }] });
    }
    invoice.status = 'REJECTED';
    await invoice.save();
    res.json(invoice.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};

export const completeInvoice = async (req, res) => {
  try {
    const { deliveredDate } = req.body;
    const invoice = await Invoice.findById(req.params.id);
    const isSeedRunning = await PreBuild.find();
    if (invoice === null) {
      return res.status(404).json({ errors: [{ msg: 'Not Found' }] });
    }
    if (invoice.ownerID !== req.user.uid) {
      return res.status(403).json({ errors: [{ msg: 'Forbidden' }] });
    }
    if (invoice.status !== 'APPROVED') {
      return res.status(400).json({ errors: [{ msg: 'Invoice is not in APPROVED State' }] });
    }
    if (isSeedRunning[0] && !isSeedRunning[0].isSeedRunning) {
      if (deliveredDate.getTime() > new Date().getTime()) {
        return res.status(400).json({
          errors: [{ msg: 'Delivered date date cannot be in the future' }],
        });
      }
    }
    invoice.deliveredDate = deliveredDate;
    invoice.paymentStatus = 'PAID';
    invoice.paidAmount = invoice.net_amount;
    invoice.status = 'COMPLETED';
    await invoice.save();
    res.json(invoice.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices_data = await Invoice.find({ $or: [{ ownerID: req.user.uid }, { supplierID: req.user.uid }] });
    const invoices_segregated = {};
    invoices_segregated.PENDING = [];
    invoices_segregated.APPROVED = [];
    invoices_segregated.REJECTED = [];
    invoices_segregated.COMPLETED = [];
    for (let i = 0; i < invoices_data.length; i++) {
      let invoice = invoices_data[i].toJSON();
      let owner = await User.findById(invoice.ownerID);
      let supplier = await User.findById(invoice.supplierID);
      invoice.ownerName = owner.organization;
      invoice.supplierName = supplier.organization;
      for (let j = 0; j < invoice.invoiceProducts.length; j++) {
        let product = await Product.findById(invoice.invoiceProducts[j].productID);
        invoice.invoiceProducts[j].productName = product.name;
      }
      invoices_segregated[invoice.status].push(invoice);
    }
    res.json(invoices_segregated);
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
    if (invoice.ownerID === req.user.uid || invoice.supplierID === req.user.uid) {
      res.json(invoice.toJSON());
    } else {
      return res.status(403).json({ errors: [{ msg: 'Forbidden' }] });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};

export const addRating = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const invoice = await Invoice.findById(req.params.id);
    if (invoice === null) {
      return res.status(404).json({ errors: [{ msg: 'Not Found' }] });
    }
    if (invoice.ownerID === req.user.uid || invoice.supplierID === req.user.uid) {
      if (invoice.status == 'COMPLETED') {
        let rating2 = rating.toFixed(2);
        if (req.user.role == 'SUPPLIER') {
          invoice.ownerRating = rating2;
          invoice.ownerReview = review;
        } else if (req.user.role == 'OWNER') {
          invoice.supplierRating = rating2;
          invoice.supplierReview = review;
        }
        await invoice.save();
        await computeOverallRating(req.user.uid);
        res.json(invoice.toJSON());
      }
    } else {
      return res.status(403).json({ errors: [{ msg: 'Forbidden' }] });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};

let computeOverallRating = async (userID) => {
  try {
    let user = await User.findById(userID);
    let current_rating = user.rating;
    let total = 0;
    let average = 0;
    const invoices_data = await Invoice.find({
      $and: [{ $or: [{ ownerID: userID }, { supplierID: userID }] }, { status: 'COMPLETED' }],
    });
    if (user.role == 'OWNER') {
      if (invoices_data.length !== 0) {
        invoices_data.forEach((element) => {
          if (!isNaN(element.ownerRating)) {
            total += element.ownerRating;
          }
        });
        average = total / invoices_data.length;
        // console.log('total =', total);
        average = average.toFixed(2);
        // console.log('average =', average);
        user.rating = average;
        await user.save();
      }
    } else if (user.role == 'SUPPLIER') {
      if (invoices_data.length !== 0) {
        invoices_data.forEach((element) => {
          if (!isNaN(element.supplierRating)) {
            total += element.supplierRating;
          }
        });
        average = total / invoices_data.length;
        // console.log('total =', total);
        average = average.toFixed(2);
        // console.log('average =', average);
        user.rating = average;
        await user.save();
      }
    }
  } catch (e) {
    console.log(e);
  }
};
