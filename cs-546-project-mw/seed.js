import 'dotenv/config';
import './database/connectdb.js';
import { getUsers, register } from './controllers/auth.controller.js';
import { User } from './models/User.js';
import { upsertProduct } from './controllers/product.controller.js';
import { Product } from './models/Product.js';

const seedUsers = async () => {
  await User.collection.drop();
  const req = {
    body: { email: 'thri@gmail.com', password: 'Babloo@1', organization: 'ABCD', role: 'SUPPLIER' },
  };
  const res = { cookie: () => {}, status: () => ({ json: () => {} }) };
  await register(req, res);
  await register(
    {
      body: {
        email: 'user1@gmail.com',
        password: 'Babloo@1',
        organization: 'ABCD',
        role: 'SUPPLIER',
      },
    },
    res
  );
  await register(
    {
      body: {
        email: 'user2@gmail.com',
        password: 'Babloo@1',
        organization: 'ABCD',
        role: 'SUPPLIER',
      },
    },
    res
  );
  await register(
    {
      body: {
        email: 'user3@gmail.com',
        password: 'Babloo@1',
        organization: 'ABCD',
        role: 'SUPPLIER',
      },
    },
    res
  );
  await register(
    {
      body: {
        email: 'user4@gmail.com',
        password: 'Babloo@1',
        organization: 'ABCD',
        role: 'SUPPLIER',
      },
    },
    res
  );
  await register(
    {
      body: { email: 'user5@gmail.com', password: 'Babloo@1', organization: 'ABCD', role: 'OWNER' },
    },
    res
  );
  await register(
    {
      body: { email: 'user6@gmail.com', password: 'Babloo@1', organization: 'ABCD', role: 'OWNER' },
    },
    res
  );
  await register(
    {
      body: { email: 'user7@gmail.com', password: 'Babloo@1', organization: 'ABCD', role: 'OWNER' },
    },
    res
  );
  await register(
    {
      body: { email: 'user8@gmail.com', password: 'Babloo@1', organization: 'ABCD', role: 'OWNER' },
    },
    res
  );
  await register(
    {
      body: { email: 'user9@gmail.com', password: 'Babloo@1', organization: 'ABCD', role: 'OWNER' },
    },
    res
  );
};
const seedProduct = async () => {
  await Product.collection.drop();
  let users;
  const res = {
    cookie: () => {},
    json: (u) => {
      users = u;
    },
    status: () => ({ json: () => {} }),
  };
  // const users =
  await getUsers({ params: { role: 'SUPPLIER' } }, res);
  //Prod 0 user 0
  const req = {
    body: {
      name: 'Ahaa Subscription',
      department: 'Entertainment',
      category: 'MEDIA & GAMING',
      subCategory: '4K MOVIES',
      stock: 1000,
      price: 999,
      currency: 'INR',
    },
    user: {
      uid: users[0]._id,
    },
  };
  let product;
  const resP = {
    cookie: () => {},
    json: (p) => {
      product = p;
    },
    status: () => ({
      json: (p) => {
        product = p;
      },
    }),
  };
  await upsertProduct(req, resP);
  // prod 0 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 400,
        price: 799,
        currency: 'INR',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  // prod 0 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 500,
        price: 899,
        currency: 'INR',
      },
      user: {
        uid: users[2]._id,
      },
    },
    resP
  );

  // prod 1 user 0
  await upsertProduct(
    {
      body: {
        name: 'GO PRO',
        department: 'Entertainment',
        category: 'CAMERAS AND SUPPLIES',
        subCategory: 'CAMERAS L3',
        stock: 1000,
        price: 499,
        currency: 'USD',
      },
      user: {
        uid: users[0]._id,
      },
    },
    resP
  );
  // prod 1 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 1500,
        price: 459,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  //prod 1 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 700,
        price: 399,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );

  // prod 2 user 0

  await upsertProduct(
    {
      body: {
        name: "Dunkin' Donuts Breads",
        department: 'Food',
        category: 'COMM BREAD',
        subCategory: 'TORTILLAS',
        stock: 1000,
        price: 99,
        currency: 'USD',
      },
      user: {
        uid: users[0]._id,
      },
    },
    resP
  );
  // prod 2 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 300,
        price: 79,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  //prod 2 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 500,
        price: 89,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );

  // prod 3 user 0

  await upsertProduct(
    {
      body: {
        name: 'Cream O Land Diary Creams',
        department: 'Food',
        category: 'DAIRY',
        subCategory: 'MILK CREAMERS L3',
        stock: 10000,
        price: 99,
        currency: 'USD',
      },
      user: {
        uid: users[0]._id,
      },
    },
    resP
  );
  // prod 3 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 79,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );
  //prod 3 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 89,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );

  // prod 4 user 0

  await upsertProduct(
    {
      body: {
        name: 'Trousers',
        department: 'Apparel',
        category: 'MENS APPAREL',
        subCategory: 'OUTERWEAR MENS',
        stock: 10000,
        price: 199,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  // prod 4 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 179,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );
  //prod 4 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 189,
        currency: 'USD',
      },
      user: {
        uid: users[2]._id,
      },
    },
    resP
  );
  // prod 5 user 0

  await upsertProduct(
    {
      body: {
        name: 'Lingere',
        department: 'Apparel',
        category: 'INTIMATE APPAREL',
        subCategory: 'OUTERWEAR MENS',
        stock: 10000,
        price: 199,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  // prod 5 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 179,
        currency: 'USD',
      },
      user: {
        uid: users[0]._id,
      },
    },
    resP
  );
  //prod 5 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 189,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );
  // prod 6 user 0

  await upsertProduct(
    {
      body: {
        name: 'Volks A/C',
        department: 'HL',
        category: 'HARDWARE',
        subCategory: 'AIR CONDITIONERS',
        stock: 10000,
        price: 159,
        currency: 'USD',
      },
      user: {
        uid: users[2]._id,
      },
    },
    resP
  );
  // prod 6 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 229,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  //prod 6 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 189,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  // prod 7 user 0

  await upsertProduct(
    {
      body: {
        name: 'Car Batteries',
        department: 'HL',
        category: 'AUTOMOTIVE',
        subCategory: 'AUTO BATTERIES',
        stock: 10000,
        price: 459,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  // prod 7 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 529,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );
  //prod 7 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 489,
        currency: 'USD',
      },
      user: {
        uid: users[2]._id,
      },
    },
    resP
  );
  // prod 8 user 0

  await upsertProduct(
    {
      body: {
        name: 'Hair Shampoo',
        department: 'Consumables',
        category: 'PERSONAL CARE',
        subCategory: 'SHAMPOOS AND CONDITIONERS',
        stock: 10000,
        price: 59,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  // prod 8 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 29,
        currency: 'USD',
      },
      user: {
        uid: users[0]._id,
      },
    },
    resP
  );
  //prod 8 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 39,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  // prod 9 user 0

  await upsertProduct(
    {
      body: {
        name: 'Home Trash Bags',
        department: 'Consumables',
        category: 'HOUSEHOLD PAPER GOODS',
        subCategory: 'TRASH BAGS',
        stock: 10000,
        price: 9,
        currency: 'USD',
      },
      user: {
        uid: users[2]._id,
      },
    },
    resP
  );
  // prod 9 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 5,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );
  //prod 9 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 6,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  // prod 10 user 0

  await upsertProduct(
    {
      body: {
        name: 'Stamulo-T',
        department: 'Health & Wellness',
        category: 'PHARMACY OTC',
        subCategory: 'DIABETES OTC',
        stock: 10000,
        price: 9,
        currency: 'USD',
      },
      user: {
        uid: users[2]._id,
      },
    },
    resP
  );
  // prod 10 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 5,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );
  //prod 10 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 6,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  // prod 11 user 0

  await upsertProduct(
    {
      body: {
        name: 'Blue-Lens',
        department: 'Health & Wellness',
        category: 'OPTICAL - LENSES',
        subCategory: 'LAB TINT',
        stock: 10000,
        price: 99,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  // prod 11 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 59,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );
  //prod 11 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 69,
        currency: 'USD',
      },
      user: {
        uid: users[0]._id,
      },
    },
    resP
  );
  // prod 12 user 0

  await upsertProduct(
    {
      body: {
        name: 'Showmen Pillows',
        department: 'Home',
        category: 'BEDDING',
        subCategory: 'BED PILLOWS',
        stock: 10000,
        price: 19,
        currency: 'USD',
      },
      user: {
        uid: users[2]._id,
      },
    },
    resP
  );
  // prod 12 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 29,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  //prod 12 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 39,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  // prod 13 user 0

  await upsertProduct(
    {
      body: {
        name: 'HOME-OFFICE DECORS',
        department: 'Home',
        category: 'FURNITURE',
        subCategory: 'HOME OFFICE',
        stock: 10000,
        price: 59,
        currency: 'USD',
      },
      user: {
        uid: users[0]._id,
      },
    },
    resP
  );
  // prod 13 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 29,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );
  //prod 13 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 39,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  // prod 14 user 0

  await upsertProduct(
    {
      body: {
        name: 'KIDS BIKES',
        department: 'Toys/Seasonal',
        category: 'TOYS',
        subCategory: 'BIKES KIDS',
        stock: 10000,
        price: 159,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  // prod 14 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 129,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );
  //prod 14 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 239,
        currency: 'USD',
      },
      user: {
        uid: users[2]._id,
      },
    },
    resP
  );

  // prod 15 user 0

  await upsertProduct(
    {
      body: {
        name: 'JINGLE BELLS',
        department: 'Toys/Seasonal',
        category: 'SEASONAL',
        subCategory: 'CHRISTMAS ORNAMENTS',
        stock: 10000,
        price: 259,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  // prod 15 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 229,
        currency: 'USD',
      },
      user: {
        uid: users[0]._id,
      },
    },
    resP
  );
  //prod 15 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 239,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  // prod 16 user 0

  await upsertProduct(
    {
      body: {
        name: 'CLINICS',
        department: 'Others',
        category: 'HEALTH AND WELLNESS CLINICS',
        subCategory: 'CLINICS',
        stock: 10000,
        price: 259,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  // prod 15 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 229,
        currency: 'USD',
      },
      user: {
        uid: users[3]._id,
      },
    },
    resP
  );
  //prod 16 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 239,
        currency: 'USD',
      },
      user: {
        uid: users[2]._id,
      },
    },
    resP
  );
  // prod 17 user 0

  await upsertProduct(
    {
      body: {
        name: 'The Fishing Store',
        department: 'Others',
        category: 'LOCAL SHOPS AND SOUVENIRS',
        subCategory: 'HUNTING AND FISHING LICENSES',
        stock: 10000,
        price: 59,
        currency: 'USD',
      },
      user: {
        uid: users[1]._id,
      },
    },
    resP
  );
  // prod 17 user 1
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 3000,
        price: 29,
        currency: 'USD',
      },
      user: {
        uid: users[0]._id,
      },
    },
    resP
  );
  //prod 17 user 2
  await upsertProduct(
    {
      body: {
        id: product._id,
        stock: 5000,
        price: 39,
        currency: 'USD',
      },
      user: {
        uid: users[4]._id,
      },
    },
    resP
  );
  // console.log(product);
};
await seedUsers();
await seedProduct();
console.log('seeding completed');
process.exit(0);
