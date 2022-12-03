import CurrencyConverter from 'currency-converter-lt';
import { body, oneOf, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';

import hierJSON from '../hier.json' assert { type: 'json' };
const emptySpaceregex = /^((?!\s).)*/;
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
    body('email', 'Incorrect email format').trim().isEmail().normalizeEmail(),
    body(
      'password',
      'Password should have minimun 6 characters One uppercase, One lower case, one digit and a special char'
    )
      .trim()
      .isStrongPassword({ minLength: 6, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 }),
    body('password', 'Incorrect password format').custom(matchPassword),
    body('role', 'Role should be "OWNER", "SUPPLIER"').trim().isIn(['OWNER', 'SUPPLIER']),
    validationResultExpress,
  ],
  login: [
    body('email', 'Incorrect email format').trim().isEmail().normalizeEmail(),
    body(
      'password',
      'Password should have minimun 6 characters One uppercase, One lower case, one digit and a special char'
    )
      .trim()
      .isStrongPassword({ minLength: 6, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 }),
    validationResultExpress,
  ],
  users: [
    param('role', 'Role should be "OWNER", "SUPPLIER"').trim().isIn(['OWNER', 'SUPPLIER']),
    validationResultExpress,
  ],
};

export const validateProduct = {
  upsert: [
    oneOf(
      [body('id', 'Incorrect id format').trim().custom(isValidMongooseId), body('id', 'Incorrect id format').isEmpty()],
      'Either ID should be correct or should not exist'
    ),
    oneOf(
      [body('name').isString().trim().matches(emptySpaceregex), body('id').exists()],
      'Either id or name should exist'
    ),

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

            throw new Error('Not a valid department/ category');
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
  get: [param('id', 'Incorrect id format').trim().custom(isValidMongooseId), validationResultExpress],
  remove: [param('id', 'Incorrect id format').trim().custom(isValidMongooseId), validationResultExpress],
};


