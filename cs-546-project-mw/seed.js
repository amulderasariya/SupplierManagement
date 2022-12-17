import "dotenv/config";
import "./database/connectdb.js";
//import { getUsers, register } from "./controllers/auth.controller.js";
import { User } from "./models/User.js";
// import { upsertProduct } from "./controllers/product.controller.js";
import { Product } from "./models/Product.js";
import axios from "axios";

let supplier_token1,
	supplier_token2,
	supplier_token3,
	supplier_token4,
	supplier_token5,
	owner_token1,
	owner_token2,
	owner_token3,
	owner_token4,
	owner_token5;

const seedUsers = async () => {
	try {
		await User.collection.drop();
		let res = await axios.post("http://localhost:8000/auth/register", {
			email: "supplier1@gmail.com",
			password: "Babloo@1",
			repassword: "Babloo@1",
			role: "SUPPLIER",
			organization: "Beacon Community",
		});
		supplier_token1 = res.data.token;
		//console.log(supplier_token1+"inside");
		await axios.post(
			"http://localhost:8000/auth/user",
			{
				city: "Hoboken",
				state: "NJ",
				country: "US",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);
		let res1 = await axios.post("http://localhost:8000/auth/register", {
			email: "supplier2@gmail.com",
			password: "Hello@12",
			repassword: "Hello@12",
			role: "SUPPLIER",
			organization: "Journal commute",
		});
		supplier_token2 = res1.data.token;
		await axios.post(
			"http://localhost:8000/auth/user",
			{
				city: "Jersey City",
				state: "NJ",
				country: "US",
			},
			{ headers: { Authorization: "Bearer " + supplier_token2 } }
		);
		let res2 = await axios.post("http://localhost:8000/auth/register", {
			email: "supplier3@gmail.com",
			password: "Hello@12",
			repassword: "Hello@12",
			role: "SUPPLIER",
			organization: "American Tourister",
		});
		supplier_token3 = res2.data.token;
		await axios.post(
			"http://localhost:8000/auth/user",
			{
				city: "Austin",
				state: "TX",
				country: "US",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		let res3 = await axios.post("http://localhost:8000/auth/register", {
			email: "supplier4@gmail.com",
			password: "Hello@12",
			repassword: "Hello@12",
			role: "SUPPLIER",
			organization: "Jersey Mills",
		});
		supplier_token4 = res3.data.token;
		await axios.post(
			"http://localhost:8000/auth/user",
			{
				city: "Syracuse",
				state: "NY",
				country: "US",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);
		let res4 = await axios.post("http://localhost:8000/auth/register", {
			email: "supplier5@gmail.com",
			password: "Hello@12",
			repassword: "Hello@12",
			role: "SUPPLIER",
			organization: "Journal commute",
		});
		supplier_token5 = res4.data.token;
		await axios.post(
			"http://localhost:8000/auth/user",
			{
				city: "Dallas",
				state: "TX",
				country: "US",
			},
			{ headers: { Authorization: "Bearer " + supplier_token5 } }
		);
		let res5 = await axios.post("http://localhost:8000/auth/register", {
			email: "owner1@gmail.com",
			password: "Babloo@1",
			repassword: "Babloo@1",
			role: "OWNER",
			organization: "Beacon Community",
		});
		owner_token1 = res5.data.token;
		//console.log(supplier_token1+"inside");
		await axios.post(
			"http://localhost:8000/auth/user",
			{
				city: "Hoboken",
				state: "NJ",
				country: "US",
			},
			{ headers: { Authorization: "Bearer " + owner_token1 } }
		);
		let res6 = await axios.post("http://localhost:8000/auth/register", {
			email: "owner2@gmail.com",
			password: "Hello@12",
			repassword: "Hello@12",
			role: "OWNER",
			organization: "Journal commute",
		});
		owner_token2 = res6.data.token;
		await axios.post(
			"http://localhost:8000/auth/user",
			{
				city: "Jersey City",
				state: "NJ",
				country: "US",
			},
			{ headers: { Authorization: "Bearer " + owner_token2 } }
		);
		let res7 = await axios.post("http://localhost:8000/auth/register", {
			email: "owner3@gmail.com",
			password: "Hello@12",
			repassword: "Hello@12",
			role: "OWNER",
			organization: "American Tourister",
		});
		owner_token3 = res7.data.token;
		await axios.post(
			"http://localhost:8000/auth/user",
			{
				city: "Austin",
				state: "TX",
				country: "US",
			},
			{ headers: { Authorization: "Bearer " + owner_token3 } }
		);
		let res8 = await axios.post("http://localhost:8000/auth/register", {
			email: "owner4@gmail.com",
			password: "Hello@12",
			repassword: "Hello@12",
			role: "OWNER",
			organization: "Jersey Mills",
		});
		owner_token4 = res8.data.token;
		await axios.post(
			"http://localhost:8000/auth/user",
			{
				city: "Syracuse",
				state: "NY",
				country: "US",
			},
			{ headers: { Authorization: "Bearer " + owner_token4 } }
		);
		let res9 = await axios.post("http://localhost:8000/auth/register", {
			email: "owner5@gmail.com",
			password: "Hello@12",
			repassword: "Hello@12",
			role: "OWNER",
			organization: "Journal commute",
		});
		owner_token5 = res9.data.token;
		await axios.post(
			"http://localhost:8000/auth/user",
			{
				city: "Dallas",
				state: "TX",
				country: "US",
			},
			{ headers: { Authorization: "Bearer " + owner_token5 } }
		);
	} catch (error) {
		console.log(error.response.data.errors);
	}
};
const seedProduct = async () => {
	try {
		//const users= await axios.get("http://localhost:8000/auth/users/suppliers", {header: {Authorization: "Bearer "+ supplier_token}})
		await Product.collection.drop();
		// prod 0
		let prod0 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Ahaa Subscription",
				department: "Entertainment",
				category: "MEDIA & GAMING",
				subCategory: "4K MOVIES",
				stock: 1000,
				price: 999,
				currency: "INR",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);
		prod0 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod0.data._id,
				stock: 400,
				price: 799,
				currency: "INR",
			},
			{ headers: { Authorization: "Bearer " + supplier_token2 } }
		);
		prod0 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod0.data._id,
				stock: 500,
				price: 899,
				currency: "INR",
			},
			{ headers: { Authorization: "Bearer " + supplier_token5 } }
		);

		// prod 1
		let prod1 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "GO PRO",
				department: "Entertainment",
				category: "CAMERAS AND SUPPLIES",
				subCategory: "CAMERAS L3",
				stock: 1000,
				price: 499,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token2 } }
		);

		prod1 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod1.data._id,
				stock: 1500,
				price: 459,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		prod1 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod1.data._id,
				stock: 700,
				price: 399,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);
		// prod 2
		let prod2 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Dunkin' Donuts Breads",
				department: "Food",
				category: "COMM BREAD",
				subCategory: "TORTILLAS",
				stock: 1000,
				price: 99,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);

		prod2 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod2.data._id,
				stock: 300,
				price: 79,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token5 } }
		);
		prod2 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod2.data._id,
				stock: 500,
				price: 89,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);

		// prod 3
		let prod3 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Cream O Land Diary Creams",
				department: "Food",
				category: "DAIRY",
				subCategory: "MILK CREAMERS L3",
				stock: 10000,
				price: 99,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token2 } }
		);
		prod3 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod3.data._id,
				stock: 3000,
				price: 79,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		prod3 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod3.data._id,
				stock: 5000,
				price: 89,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);

		// prod 4
		let prod4 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Trousers",
				department: "Apparel",
				category: "MENS APPAREL",
				subCategory: "OUTERWEAR MENS",
				stock: 10000,
				price: 199,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);
		prod4 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod4.data._id,
				stock: 3000,
				price: 179,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token5 } }
		);
		prod4 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod4.data._id,
				stock: 5000,
				price: 189,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);

		// // prod 5
		// await axios.post(
		// 	"http://localhost:8000/products",
		// 	{
		// 		name: "Lingere",
		// 		department: "Apparel",
		// 		category: "INTIMATE APPAREL",
		// 		subCategory: "OUTERWEAR MENS",
		// 		stock: 10000,
		// 		price: 199,
		// 		currency: "USD",
		// 	},
		// 	{ headers: { Authorization: "Bearer " + supplier_token5 } }
		// );
		// prod5 = await axios.post(
		// 	"http://localhost:8000/products",
		// 	{
		// 		id: prod5.data._id,
		// 		stock: 3000,
		// 		price: 179,
		// 		currency: "USD",
		// 	},
		// 	{ headers: { Authorization: "Bearer " + supplier_token3 } }
		// );
		// prod5 = await axios.post(
		// 	"http://localhost:8000/products",
		// 	{
		// 		id: prod5.data._id,
		// 		stock: 5000,
		// 		price: 189,
		// 		currency: "USD",
		// 	},
		// 	{ headers: { Authorization: "Bearer " + supplier_token2 } }
		// );

		// prod 6
		let prod6 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Volks A/C",
				department: "HL",
				category: "HARDWARE",
				subCategory: "AIR CONDITIONERS",
				stock: 10000,
				price: 159,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);
		prod6 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod6.data._id,
				stock: 3000,
				price: 229,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);
		prod6 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod6.data._id,
				stock: 5000,
				price: 189,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		// prod 7
		let prod7 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Car Batteries",
				department: "HL",
				category: "AUTOMOTIVE",
				subCategory: "AUTO BATTERIES",
				stock: 10000,
				price: 459,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token2 } }
		);
		prod7 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod7.data._id,
				stock: 3000,
				price: 529,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token5 } }
		);
		prod7 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod7.data._id,
				stock: 5000,
				price: 489,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);
		// prod 8
		let prod8 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Hair Shampoo",
				department: "Consumables",
				category: "PERSONAL CARE",
				subCategory: "SHAMPOOS AND CONDITIONERS",
				stock: 10000,
				price: 59,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		prod8 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod8.data._id,
				stock: 3000,
				price: 29,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);
		prod8 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod8.data._id,
				stock: 5000,
				price: 39,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token5 } }
		);
		// prod 9
		let prod9 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Home Trash Bags",
				department: "Consumables",
				category: "HOUSEHOLD PAPER GOODS",
				subCategory: "TRASH BAGS",
				stock: 10000,
				price: 9,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token2 } }
		);

		prod9 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod9.data._id,
				stock: 3000,
				price: 5,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);

		prod9 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod9.data._id,
				stock: 5000,
				price: 6,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);
		// prod 10
		let prod10 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Stamulo-T",
				department: "Health & Wellness",
				category: "PHARMACY OTC",
				subCategory: "DIABETES OTC",
				stock: 10000,
				price: 9,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token5 } }
		);
		prod10 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod10.data._id,
				stock: 3000,
				price: 5,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);
		prod10 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod10.data._id,
				stock: 5000,
				price: 6,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		// prod 11
		let prod11 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Blue-Lens",
				department: "Health & Wellness",
				category: "OPTICAL - LENSES",
				subCategory: "LAB TINT",
				stock: 10000,
				price: 99,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		prod11 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod11.data._id,
				stock: 3000,
				price: 59,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token2 } }
		);
		prod11 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod11.data._id,
				stock: 5000,
				price: 69,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);
		// prod 12
		let prod12 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "Showmen Pillows",
				department: "Home",
				category: "BEDDING",
				subCategory: "BED PILLOWS",
				stock: 10000,
				price: 19,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token5 } }
		);
		prod12 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod12.data._id,
				stock: 3000,
				price: 29,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);
		prod12 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod12.data._id,
				stock: 5000,
				price: 39,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token2 } }
		);
		// prod 13
		let prod13 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "HOME-OFFICE DECORS",
				department: "Home",
				category: "FURNITURE",
				subCategory: "HOME OFFICE",
				stock: 10000,
				price: 59,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		prod13 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod13.data._id,
				stock: 3000,
				price: 29,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);
		prod13 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod13.data._id,
				stock: 5000,
				price: 39,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);
		// prod 14
		let prod14 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "KIDS BIKES",
				department: "Toys/Seasonal",
				category: "TOYS",
				subCategory: "BIKES KIDS",
				stock: 10000,
				price: 159,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);
		prod14 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod14.data._id,
				stock: 5000,
				price: 229,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token5 } }
		);
		prod14 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod14.data._id,
				stock: 5000,
				price: 229,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		// prod 15
		let prod15 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "JINGLE BELLS",
				department: "Toys/Seasonal",
				category: "SEASONAL",
				subCategory: "CHRISTMAS ORNAMENTS",
				stock: 10000,
				price: 259,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);
		prod15 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod15.data._id,
				stock: 5000,
				price: 229,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);
		prod15 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod15.data._id,
				stock: 5000,
				price: 229,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token2 } }
		);
		// // prod 16
		let prod16 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "CLINICS",
				department: "Others",
				category: "HEALTH AND WELLNESS CLINICS",
				subCategory: "CLINICS",
				stock: 10000,
				price: 259,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token4 } }
		);
		prod16 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod16.data._id,
				stock: 5000,
				price: 229,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token5 } }
		);
		prod16 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod16.data._id,
				stock: 10000,
				price: 239,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		// prod 17
		let prod17 = await axios.post(
			"http://localhost:8000/products",
			{
				name: "The Fishing Store",
				department: "Others",
				category: "LOCAL SHOPS AND SOUVENIRS",
				subCategory: "HUNTING AND FISHING LICENSES",
				stock: 10000,
				price: 59,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token1 } }
		);
		prod17 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod17.data._id,
				stock: 3000,
				price: 29,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token3 } }
		);
		prod17 = await axios.post(
			"http://localhost:8000/products",
			{
				id: prod17.data._id,
				stock: 7000,
				price: 39,
				currency: "USD",
			},
			{ headers: { Authorization: "Bearer " + supplier_token2 } }
		);
	} catch (error) {
		console.error(error.response.data.errors);
	}
};

await seedUsers();
await seedProduct();
console.log("seeding completed");
process.exit(0);
