const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const keys = require('./keys');

// Definisikan skema dan model untuk data pengguna
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' } // bisa 'user' atau 'admin'
});

const User = mongoose.model('User', userSchema);

// Middleware untuk otentikasi JWT
const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');
    
    try {
        const verified = jwt.verify(token, keys.secretOrKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

// Menambahkan pengguna baru (registrasi)
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
router.get('/users', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access Denied');

    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mendapatkan detail pengguna berdasarkan ID (hanya admin)
router.get('/user/:id', auth, async (req, res) => {
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
router.put('/user/:id', auth, async (req, res) => {
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
router.delete('/user/:id', auth, async (req, res) => {
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

