import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Selamat Datang di Sistem Pemesanan Hotel</h1>
            <p>Temukan kamar terbaik dan buat pemesanan dengan mudah.</p>
            <div className="homepage-links">
                <ul>
                    <li><Link to="/rooms">Lihat Daftar Kamar</Link></li>
                    <li><Link to="/booking">Buat Pemesanan</Link></li>
                    <li><Link to="/bookings">Daftar Pemesanan Anda</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default HomePage;

