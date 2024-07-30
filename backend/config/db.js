const mongoose = require('mongoose');

// URL koneksi ke database MongoDB
const dbURI = 'mongodb://localhost:27017/hotelbookingsystem';

// Menghubungkan ke database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Menangani event koneksi
mongoose.connection.on('connected', () => {
    console.log('Mongoose terhubung ke ' + dbURI);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose error koneksi: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose terputus');
});

// Menangani proses shutdown yang benar
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log('Mongoose terputus melalui ' + msg);
        callback();
    });
};

// Untuk nodemon restart
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Untuk aplikasi shutdown
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// Untuk Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app termination', () => {
        process.exit(0);
    });
});

// Definisikan skema dan model untuk data hotel booking
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    roomType: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    status: { type: String, default: 'booked' } // bisa 'booked', 'checked-in', 'checked-out', 'cancelled'
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

