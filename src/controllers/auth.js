const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    const { email, confirmPassword, name, role = 'U' } = req.body;
    try {
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        await userService.createUser({ email, password: confirmPassword, name, role });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.findUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await userService.comparePassword(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '12h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
    });
    res.json({ message: 'Logged out successfully' });
};

exports.validateUser = async (req, res) => {        
    try {

        const existingUser = await userService.findUserById(req.userData.userId);
        
        res.json({
            success: true,
            user: existingUser, 
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};