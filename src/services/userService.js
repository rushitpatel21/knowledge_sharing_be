const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.findUserById = async (id) => {
    return await User.findById(id).select('-password');
};

exports.createUser = async ({ email, password, name, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, role });
    return await user.save();
};

exports.comparePassword = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
};