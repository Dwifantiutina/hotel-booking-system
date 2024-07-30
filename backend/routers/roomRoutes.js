const express = require('express');
const router = express.Router();
const Room = require('./Room'); // Impor model Room
const authMiddleware = require('./authMiddleware');

// Membuat kamar baru (hanya admin)
router.post('/rooms', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access Denied');
    }

    try {
        const { roomNumber, type, price, amenities, status } = req.body;
        const room = new Room({ roomNumber, type, price, amenities, status });
        await room.save();
        res.status(201).send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Mendapatkan daftar semua kamar
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).send(rooms);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mendapatkan kamar berdasarkan ID
router.get('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).send('Room tidak ditemukan');
        }
        res.status(200).send(room);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Memperbarui kamar berdasarkan ID (hanya admin)
router.put('/rooms/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access Denied');
    }

    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!room) {
            return res.status(404).send('Room tidak ditemukan');
        }
        res.status(200).send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Menghapus kamar berdasarkan ID (hanya admin)
router.delete('/rooms/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access Denied');
    }

    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).send('Room tidak ditemukan');
        }
        res.status(200).send('Room dihapus');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

