const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Definisikan skema dan model untuk data kamar
const roomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true, unique: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: 'available' } // bisa 'available', 'booked', 'maintenance'
});

const Room = mongoose.model('Room', roomSchema);

// Menambahkan kamar baru
router.post('/rooms', async (req, res) => {
    try {
        const room = new Room(req.body);
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

// Mendapatkan detail kamar berdasarkan ID
router.get('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).send('Kamar tidak ditemukan');
        }
        res.status(200).send(room);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Memperbarui kamar berdasarkan ID
router.put('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!room) {
            return res.status(404).send('Kamar tidak ditemukan');
        }
        res.status(200).send(room);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Menghapus kamar berdasarkan ID
router.delete('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).send('Kamar tidak ditemukan');
        }
        res.status(200).send('Kamar dihapus');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

