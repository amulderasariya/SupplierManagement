import { Invoice } from '../models/Invoice.js';

export const getSalesGraph = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const invoice = await Invoice.aggregate([
      // First Stage
      {
        $match: { deliveredDate: { $gte: startDate, $lt: endDate }, $or: [{ ownerID: req.user.uid }, { supplierID: req.user.uid }] },
      },
      // Second Stage
      {
        $group: {
          _id: { $week: '$deliveredDate' },
          net_amount: { $sum: '$net_amount' },
          gross_amount: { $sum: '$gross_amount' },
          count: { $sum: 1 },
        },
      },
      // Third Stage
      {
        $sort: { _id: 1 },
      },
    ]);
    //   console.log(invoice)
    res.json(invoice);
  } catch (e) {
    console.log(e);
    res.json('Something went wrong');
  }
};

export const getByDepartments = async (req, res) => {
  try {
    const { startDate, endDate, groupBy } = req.query;

    const project1 = `invoiceProducts.${groupBy}`;
    const pip = [
      {
        $match: { deliveredDate: { $gte: startDate, $lt: endDate }, $or: [{ ownerID: req.user.uid }, { supplierID: req.user.uid }] },
      },
      { $unwind: '$invoiceProducts' },
      {
        $lookup: {
          from: 'products',
          localField: 'invoiceProducts.productID',
          foreignField: '_id',
          as: 'invoiceProducts.ProductDetails',
        },
      },
      {
        $project: {
          _id: 1,
          'invoiceProducts.price': '$invoiceProducts.price',
          'invoiceProducts.quantity': '$invoiceProducts.quantity',
        },
      },
      {
        $group: {
          _id: { $first: `$invoiceProducts.${groupBy}` },
          gross_amount: { $sum: { $multiply: ['$invoiceProducts.price', '$invoiceProducts.quantity'] } },
        },
      },
    ];
    pip[3].$project[project1] = `$invoiceProducts.ProductDetails.${groupBy}`;
    const invoiceCurrYear = await Invoice.aggregate(pip);
    startDate.setFullYear(startDate.getFullYear() - 1);
    endDate.setFullYear(endDate.getFullYear() - 1);
    pip[0].$match.deliveredDate.$gte = startDate;
    pip[0].$match.deliveredDate.$lte = endDate;

    const invoicePrevYear = await Invoice.aggregate(pip);
    res.json([invoicePrevYear, invoiceCurrYear]);
  } catch (e) {
    console.log(e);
    res.json('Something went wrong');
  }
};
