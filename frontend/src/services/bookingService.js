const Booking = require('../models/Booking'); // Model Booking
const Room = require('../models/Room'); // Model Room
const User = require('../models/User'); // Model User

// Fungsi untuk membuat pemesanan baru
const createBooking = async (userId, roomId, checkInDate, checkOutDate) => {
    try {
        // Periksa apakah kamar tersedia
        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error('Kamar tidak ditemukan');
        }

        // Periksa apakah pengguna ada
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Pengguna tidak ditemukan');
        }

        // Buat pemesanan baru
        const booking = new Booking({
            user: userId,
            room: roomId,
            checkInDate,
            checkOutDate,
            status: 'Booked'
        });

        await booking.save();
        return booking;
    } catch (error) {
        throw new Error(`Gagal membuat pemesanan: ${error.message}`);
    }
};

// Fungsi untuk mendapatkan semua pemesanan
const getAllBookings = async () => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email') // Mengisi data pengguna
            .populate('room', 'roomNumber type'); // Mengisi data kamar
        return bookings;
    } catch (error) {
        throw new Error(`Gagal mendapatkan pemesanan: ${error.message}`);
    }
};

// Fungsi untuk mendapatkan pemesanan berdasarkan ID
const getBookingById = async (bookingId) => {
    try {
        const booking = await Booking.findById(bookingId)
            .populate('user', 'name email') // Mengisi data pengguna
            .populate('room', 'roomNumber type'); // Mengisi data kamar
        if (!booking) {
            throw new Error('Pemesanan tidak ditemukan');
        }
        return booking;
    } catch (error) {
        throw new Error(`Gagal mendapatkan pemesanan: ${error.message}`);
    }
};

// Fungsi untuk memperbarui status pemesanan
const updateBookingStatus = async (bookingId, status) => {
    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new Error('Pemesanan tidak ditemukan');
        }

        booking.status = status;
        await booking.save();
        return booking;
    } catch (error) {
        throw new Error(`Gagal memperbarui status pemesanan: ${error.message}`);
    }
};

// Fungsi untuk menghapus pemesanan
const deleteBooking = async (bookingId) => {
    try {
        const booking = await Booking.findByIdAndDelete(bookingId);
        if (!booking) {
            throw new Error('Pemesanan tidak ditemukan');
        }
        return booking;
    } catch (error) {
        throw new Error(`Gagal menghapus pemesanan: ${error.message}`);
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking
};

