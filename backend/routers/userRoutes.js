const express = require('express');
const router = express.Router();
const User = require('./User'); // Impor model User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('./keys');
const authMiddleware = require('./authMiddleware');

// Pendaftaran pengguna baru
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    // Cek apakah email sudah terdaftar
    const emailExist = await User.findOne({ email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat pengguna baru
    const user = new User({ name, email, password: hashedPassword, role });

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login pengguna
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Cek apakah email terdaftar
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email is not found');

    // Cek password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // Buat dan assign token
    const token = jwt.sign({ _id: user._id, role: user.role }, keys.secretOrKey);
    res.header('Authorization', 'Bearer ' + token).send(token);
});

// Mendapatkan daftar semua pengguna (hanya admin)
router.get('/users', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access Denied');

    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mendapatkan detail pengguna berdasarkan ID (hanya admin)
router.get('/users/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access Denied');

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Memperbarui pengguna berdasarkan ID (hanya admin)
router.put('/users/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access Denied');

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Menghapus pengguna berdasarkan ID (hanya admin)
router.delete('/users/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access Denied');

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send('User deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

