import { Product } from '../models/Product.js';
export const getProducts = async (req, res) => {
  try {
    const { department, category, subCategory, name } = req.query;
    const query = { department, category, subCategory };
    // name: { $regex: name || '.*' }
    Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);
    let products = await Product.find({ 'suppliers.supplierID': req.user.uid, ...query, name: { $regex: name, $options: 'i' } });
    products = products.map((product) => {
      const { stock, price, currency } = product.suppliers.find((supplier) => supplier.supplierID === req.user.uid);
      return { ...product.toJSON(), stock, price, currency, suppliers: undefined };
    });
    return res.json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
};

export const getProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product === null) {
      return res.status(404).json({ errors: [{ msg: 'Not Found' }] });
    }
    const { stock, price, currency } = product.suppliers.find((supplier) => supplier.supplierID === req.user.uid);
    return res.json({ ...product.toJSON(), stock, price, currency, suppliers: undefined });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
};

export const upsertProduct = async (req, res) => {
  try {
    const { id, name, department, category, subCategory, stock, price, currency } = req.body;
    let product = await Product.findById(id);
    if (product === null) {
      if (id) {
        return res.status(404).json({ errors: [{ msg: 'No product found with the id-' + id }] });
      }
      product = new Product({
        name,
        department,
        category,
        subCategory,
        suppliers: [{ stock, price, currency, supplierID: req.user.uid }],
      });
    } else {
      product.suppliers = product.suppliers.filter((supplier) => supplier.supplierID !== req.user.uid);
      product.suppliers.push({ stock, price, currency, supplierID: req.user.uid });
    }
    await product.save();
    return res.status(201).json({ ...product.toJSON(), stock, price, currency, suppliers: undefined });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ errors: [{ msg: 'Product does not exist' }] });
    product.suppliers = product.suppliers.filter((supplier) => supplier.supplierID !== req.user.uid);

    await product.save();
    return res.status(201).json({ productDeleted: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Something went wrong' }] });
  }
};
