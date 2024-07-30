const moment = require('moment');

// Fungsi untuk memeriksa apakah tanggal check-in dan check-out valid
const isValidDateRange = (checkInDate, checkOutDate) => {
    return moment(checkInDate).isBefore(moment(checkOutDate));
};

// Fungsi untuk memformat tanggal
const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
};

// Fungsi untuk menghitung durasi menginap dalam hari
const calculateDuration = (checkInDate, checkOutDate) => {
    return moment(checkOutDate).diff(moment(checkInDate), 'days');
};

// Fungsi untuk memeriksa apakah kamar tersedia dalam rentang tanggal tertentu
const isRoomAvailable = async (Room, roomId, checkInDate, checkOutDate) => {
    const bookings = await Room.find({
        _id: roomId,
        $or: [
            { checkInDate: { $lte: checkOutDate, $gte: checkInDate } },
            { checkOutDate: { $lte: checkOutDate, $gte: checkInDate } }
        ]
    });
    return bookings.length === 0;
};

// Fungsi untuk meng-hash password
const hashPassword = async (password, bcrypt) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Fungsi untuk memeriksa password
const checkPassword = async (inputPassword, hashedPassword, bcrypt) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};

module.exports = {
    isValidDateRange,
    formatDate,
    calculateDuration,
    isRoomAvailable,
    hashPassword,
    checkPassword
};

