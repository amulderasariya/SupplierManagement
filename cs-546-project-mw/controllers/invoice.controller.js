import CC from 'currency-converter-lt';

import { Invoice } from '../models/Invoice.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

export const createInvoice = async (req, res) => {
  try {
    const { ownerId, invoiceProducts, due_date, net_amount, currency, invoiceFileURL } = req.body;
    const supplierID = req.user.uid;
    const ownerExists = await User.findById(ownerId);
    if (!ownerExists) return res.status(400).json({ errors: [{ msg: 'Invalid owner id' }] });
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
        gross_amount += await currenyConvertor
          .from(supplierExists.currency)
          .to(currency)
          .amount(product.price)
          .convert();
      } catch (e) {
        product.push({ msg: e.message });
      }
    }
    if (productErrors.length > 0) return res.status(400).json({ errors: productErrors });
    const invoice = new Invoice({
      ownerId,
      supplierID,
      due_date,
      net_amount,
      currency,
      invoiceProducts,
      invoiceFileURL,
      gross_amount,
    });
    await invoice.save();
    res.json(invoice.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json('Something went wrong');
  }
};
