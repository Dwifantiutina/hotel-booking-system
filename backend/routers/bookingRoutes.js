const express = require('express');
const router = express.Router();
const Booking = require('./Booking'); // Impor model Booking
const authMiddleware = require('./authMiddleware');

// Membuat pemesanan baru
router.post('/bookings', authMiddleware, async (req, res) => {
    try {
        const { room, user, checkInDate, checkOutDate } = req.body;

        // Validasi ketersediaan kamar
        const existingBooking = await Booking.findOne({
            room,
            $or: [
                { checkInDate: { $lte: checkOutDate, $gte: checkInDate } },
                { checkOutDate: { $lte: checkOutDate, $gte: checkInDate } }
            ]
        });

        if (existingBooking) {
            return res.status(400).send('Kamar sudah dipesan untuk tanggal tersebut.');
        }

        const booking = new Booking({ room, user, checkInDate, checkOutDate });
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Mendapatkan daftar semua pemesanan (hanya admin)
router.get('/bookings', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).send('Access Denied');
        }

        const bookings = await Booking.find().populate('room').populate('user');
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mendapatkan pemesanan berdasarkan ID
router.get('/bookings/:id', authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('room').populate('user');
        if (!booking) {
            return res.status(404).send('Booking tidak ditemukan');
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Memperbarui pemesanan berdasarkan ID
router.put('/bookings/:id', authMiddleware, async (req, res) => {
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
router.delete('/bookings/:id', authMiddleware, async (req, res) => {
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

