const Room = require('../models/Room'); // Model Room

// Fungsi untuk membuat kamar baru
const createRoom = async (roomNumber, type, price, amenities, description) => {
    try {
        // Buat kamar baru
        const room = new Room({
            roomNumber,
            type,
            price,
            amenities,
            description
        });

        await room.save();
        return room;
    } catch (error) {
        throw new Error(`Gagal membuat kamar: ${error.message}`);
    }
};

// Fungsi untuk mendapatkan semua kamar
const getAllRooms = async () => {
    try {
        const rooms = await Room.find();
        return rooms;
    } catch (error) {
        throw new Error(`Gagal mendapatkan kamar: ${error.message}`);
    }
};

// Fungsi untuk mendapatkan kamar berdasarkan ID
const getRoomById = async (roomId) => {
    try {
        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error('Kamar tidak ditemukan');
        }
        return room;
    } catch (error) {
        throw new Error(`Gagal mendapatkan kamar: ${error.message}`);
    }
};

// Fungsi untuk memperbarui detail kamar
const updateRoom = async (roomId, updates) => {
    try {
        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error('Kamar tidak ditemukan');
        }

        // Terapkan pembaruan pada kamar
        Object.keys(updates).forEach(key => {
            room[key] = updates[key];
        });

        await room.save();
        return room;
    } catch (error) {
        throw new Error(`Gagal memperbarui kamar: ${error.message}`);
    }
};

// Fungsi untuk menghapus kamar
const deleteRoom = async (roomId) => {
    try {
        const room = await Room.findByIdAndDelete(roomId);
        if (!room) {
            throw new Error('Kamar tidak ditemukan');
        }
        return room;
    } catch (error) {
        throw new Error(`Gagal menghapus kamar: ${error.message}`);
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
};

