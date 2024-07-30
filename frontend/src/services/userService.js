const User = require('../models/User'); // Model User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys'); // Kunci rahasia untuk JWT

// Fungsi untuk membuat pengguna baru
const createUser = async (name, email, password, role = 'user') => {
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat pengguna baru
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Gagal membuat pengguna: ${error.message}`);
    }
};

// Fungsi untuk mendapatkan semua pengguna
const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(`Gagal mendapatkan pengguna: ${error.message}`);
    }
};

// Fungsi untuk mendapatkan pengguna berdasarkan ID
const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Pengguna tidak ditemukan');
        }
        return user;
    } catch (error) {
        throw new Error(`Gagal mendapatkan pengguna: ${error.message}`);
    }
};

// Fungsi untuk memperbarui detail pengguna
const updateUser = async (userId, updates) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Pengguna tidak ditemukan');
        }

        // Terapkan pembaruan pada pengguna
        Object.keys(updates).forEach(key => {
            if (key === 'password') {
                // Hash password jika ada perubahan
                user[key] = bcrypt.hashSync(updates[key], 10);
            } else {
                user[key] = updates[key];
            }
        });

        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Gagal memperbarui pengguna: ${error.message}`);
    }
};

// Fungsi untuk menghapus pengguna
const deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error('Pengguna tidak ditemukan');
        }
        return user;
    } catch (error) {
        throw new Error(`Gagal menghapus pengguna: ${error.message}`);
    }
};

// Fungsi untuk login pengguna
const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Pengguna tidak ditemukan');
        }

        // Verifikasi password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Password salah');
        }

        // Buat token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    } catch (error) {
        throw new Error(`Gagal login: ${error.message}`);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};

