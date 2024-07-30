const express = require('express');
const router = express.Router();
const Booking = require('./db'); // Impor model Booking

// Membuat pemesanan baru
router.post('/book', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Mendapatkan daftar semua pemesanan
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mendapatkan pemesanan berdasarkan ID
router.get('/booking/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send('Booking tidak ditemukan');
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Memperbarui pemesanan berdasarkan ID
router.put('/booking/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!booking) {
            return res.status(404).send('Booking tidak ditemukan');
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Menghapus pemesanan berdasarkan ID
router.delete('/booking/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).send('Booking tidak ditemukan');
        }
        res.status(200).send('Booking dihapus');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

