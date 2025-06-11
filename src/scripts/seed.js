const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();


const seedAdmin = async () => {
  try {
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const admin = new User({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'A',
      });

      await admin.save();
      console.log('✅  Admin user created.');
    } else {
      console.log('ℹ️  Users already exist. Skipping seed.');
    }
  } catch (err) {
    console.error('❌  Error seeding admin user:', err);
  } 
}

module.exports = seedAdmin;