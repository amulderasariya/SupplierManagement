import CurrencyConverter from 'currency-converter-lt';
import { body, oneOf, param, query } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { Country, State, City } from 'country-state-city';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import xss from 'xss';

import hierJSON from '../hier.json' assert { type: 'json' };
const emptySpaceregex = /^((?!\s).)*/;
const onlyCharAndNumberRegex = /^[a-zA-Z0-9-\s]*$/;
const onlyCharAndSpaceRegex = /^[a-zA-Z\s]*$/;
// prettier-ignore
export const listOfCurrencies = new CurrencyConverter().currencyCode;

const isValidMongooseId = (value, { req }) => {
  if (!isValidObjectId(value)) throw new Error('Id is not valid');
  return value;
};

const matchPassword = (value, { req }) => {
  if (value !== req.body.repassword) {
    throw new Error('passwords do not match');
  }
  return value;
};

export const validateAuth = {
  register: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    body('email', 'Incorrect email format').trim().isEmail().normalizeEmail(),
    body('password', 'Password should have minimun 6 characters One uppercase, One lower case, one digit and a special char')
      .trim()
      .isStrongPassword({ minLength: 6, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 }),
    body('password', 'Incorrect password format').custom(matchPassword),
    body('role', 'Role should be "OWNER", "SUPPLIER"').trim().isIn(['OWNER', 'SUPPLIER']),
    body('organization', 'Invalid Organization').exists().matches(onlyCharAndSpaceRegex),
    validationResultExpress,
  ],
  login: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    body('email', 'Incorrect email format').trim().isEmail().normalizeEmail(),
    body('password', 'Password should have minimun 6 characters One uppercase, One lower case, one digit and a special char')
      .trim()
      .isStrongPassword({ minLength: 6, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 }),
    validationResultExpress,
  ],
  user: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    body('country', 'Invalid City').isIn(Country.getAllCountries().map((v) => v.isoCode)),
    body('state', 'Invalid State').custom((value, { req }) =>
      State.getStatesOfCountry(req.body.country)
        .map((v) => v.isoCode)
        .includes(value)
    ),
    body('city', 'Invalid City').custom((value, { req }) =>
      City.getCitiesOfState(req.body.country, req.body.state)
        .map((v) => v.name)
        .includes(value)
    ),
    validationResultExpress,
  ],
  getUser: [param('role', 'Role should be "OWNER", "SUPPLIER"').trim().isIn(['OWNER', 'SUPPLIER']), validationResultExpress],
};

export const validateProduct = {
  upsert: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    oneOf(
      [body('id', 'Incorrect id format').trim().custom(isValidMongooseId), body('id', 'Incorrect id format').isEmpty()],
      'Either ID should be correct or should not exist'
    ),
    oneOf([body('name').isString().trim().matches(emptySpaceregex), body('id').exists()], 'Either id or name should exist'),

    oneOf(
      [body('department', 'Invalid Department').isString().trim().isIn(Object.keys(hierJSON)), body('id').exists()],
      'Either id or department should exist'
    ),

    oneOf(
      [
        body('category', 'Invalid Category')
          .isString()
          .trim()
          .custom((value, { req }) => {
            if (hierJSON[req.body.department] && hierJSON[req.body.department][value]) return value;

            throw new Error('Not a valid department/ category');
          }),
        // isIn(Object.keys(hierJSON[this.department])),
        body('id').exists(),
      ],
      'Either id or category should exist'
    ),

    oneOf(
      [
        body('subCategory')
          .isString()
          .trim()
          .custom((value, { req }) => {
            if (hierJSON[req.body.department] && hierJSON[req.body.department][req.body.category][value]) return value;

            throw new Error('Not a valid department / category / subCategory');
          }),
        body('id').exists(),
      ],
      'Either id or subCategory should exist'
    ),
    body('stock', 'Stock should be an integer with min 0').isInt({ min: 0 }),
    body('price', 'Price should be an float with min 0').isFloat({ min: 0 }),
    body('currency', 'Invalid currency').isString().trim().isIn(listOfCurrencies),
    validationResultExpress,
  ],
  get: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('id', 'Incorrect id format').trim().custom(isValidMongooseId),
    validationResultExpress,
  ],
  getProducts: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    oneOf(
      [query('supplierID', 'Incorrect id format').trim().custom(isValidMongooseId), query('supplierID').isEmpty()],
      'Either supplierID should be correct or should not exist'
    ),
    oneOf(
      [query('department', 'Invalid Department').isString().trim().isIn(Object.keys(hierJSON)), query('department').isEmpty()],
      'Either Department should be correct or should not exist'
    ),
    oneOf(
      [
        query('category', 'Invalid Category')
          .isString()
          .trim()
          .custom((value, { req }) => {
            if (hierJSON[req.query.department] && hierJSON[req.query.department][value]) return value;

            throw new Error('Not a valid department/ category');
          }),
        query('category').isEmpty(),
      ],
      'Either category should be correct or should not exist'
    ),
    oneOf(
      [
        query('subCategory')
          .isString()
          .trim()
          .custom((value, { req }) => {
            if (hierJSON[req.query.department] && hierJSON[req.query.department][req.query.category][value]) return value;

            throw new Error('Not a valid department / category / subCategory');
          }),
        query('subCategory').isEmpty(),
      ],
      'Either subCategory should be correct or should not exist'
    ),
    validationResultExpress,
  ],
  remove: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('id', 'Incorrect id format').trim().custom(isValidMongooseId),
    validationResultExpress,
  ],
};

export const validateInvoice = {
  get: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('id', 'Incorrect id format').isString().trim().custom(isValidMongooseId),
    validationResultExpress,
  ],
  approve: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('id', 'Incorrect id format').isString().trim().custom(isValidMongooseId),
    body('due_date', 'Due date is not a valid date').isISO8601().toDate(),
    body('net_amount', 'Net Amount should be an float with min 0').isFloat({ min: 0 }),
    body('paidAmount', 'Paid Amount should be an float with min 0').isFloat({ min: 0 }),
    validationResultExpress,
  ],
  reject: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('id', 'Incorrect id format').trim().custom(isValidMongooseId),
    validationResultExpress,
  ],
  complete: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('id', 'Incorrect id format').isString().trim().custom(isValidMongooseId),
    body('deliveredDate', 'Delivered date is not a valid date').isISO8601().toDate(),
    validationResultExpress,
  ],
  rating: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('id', 'Incorrect id format').isString().trim().custom(isValidMongooseId),
    body('rating', 'Rating should be an float with values between min 0 and max 5.0').isFloat({ min: 0.0, max: 5.0 }),
    body('review', 'Review should be string').isString().trim(),
    validationResultExpress,
  ],
  remove: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('id', 'Incorrect id format').trim().custom(isValidMongooseId),
    validationResultExpress,
  ],
  create: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    body('supplierID', 'Incorrect id format').isString().trim().custom(isValidMongooseId),
    body('invoiceProducts', 'Invoice product should be an array with min length 1').isArray({ min: 1 }),
    body('invoiceProducts.*.productID', 'Invalid Product id').trim().custom(isValidMongooseId),
    body('invoiceProducts.*.quantity', 'Quantity should be an integer with min 1').isInt({ min: 1 }),
    body('currency', 'Invalid currency').isString().trim().isIn(listOfCurrencies),
    validationResultExpress,
  ],
};

export const validateDashboard = {
  salesGraph: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('startDate', 'invalid query param start date is not a valid date').isISO8601().toDate(),
    query('endDate', 'invalid query param endDate date is not a valid date').isISO8601().toDate(),
    validationResultExpress,
  ],
  group: [
    body('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    param('*', 'XSS Attack Detected, Take shelter!').custom((value) => {
      return xss(value);
    }),
    query('startDate', 'invalid query param start date is not a valid date').isISO8601().toDate(),
    query('endDate', 'invalid query param endDate date is not a valid date').isISO8601().toDate(),
    query('groupBy', 'invalid query param groupby').isIn(['department', 'category', 'subCategory']),
    validationResultExpress,
  ],
};
