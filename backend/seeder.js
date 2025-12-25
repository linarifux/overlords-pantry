import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'; // Optional: npm install colors (makes logs pretty)
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Wipe the slate clean
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Create Users (Triggering the encryption hook)
    // We create an empty array to store the DB users so we can grab IDs
    const createdUsers = [];
    
    for (const user of users) {
      const newUser = new User(user);
      const savedUser = await newUser.save();
      createdUsers.push(savedUser);
    }

    // 3. The Admin is the owner of the products
    const adminUser = createdUsers[0]._id;

    // 4. Add the Admin ID to every product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // 5. Insert Products
    await Product.insertMany(sampleProducts);

    console.log('Data Imported! The Treasury is full.'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed! The Void consumes all.'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}