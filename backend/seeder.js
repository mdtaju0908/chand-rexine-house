const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Product = require('./models/Product');
const DealerEnquiry = require('./models/DealerEnquiry');
const Dealer = require('./models/Dealer');
const ManufacturingStatus = require('./models/ManufacturingStatus');
const WhatsAppTemplate = require('./models/WhatsAppTemplate');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Admin.deleteMany();
    await Product.deleteMany();
    await DealerEnquiry.deleteMany();
    await Dealer.deleteMany();
    await ManufacturingStatus.deleteMany();
    await WhatsAppTemplate.deleteMany();

    // Create Admin
    const adminUser = await Admin.create({
      email: 'mdtaju4175@gmail.com',
      password: '123456', // Will be hashed by pre-save hook
      role: 'admin',
    });

    console.log('Data Imported!');
    console.log(`Admin User Created: ${adminUser.email} / admin123`);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Admin.deleteMany();
    await Product.deleteMany();
    await DealerEnquiry.deleteMany();
    await Dealer.deleteMany();
    await ManufacturingStatus.deleteMany();
    await WhatsAppTemplate.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
