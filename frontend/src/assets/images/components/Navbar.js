import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <nav>
            <div className="container">
                <h1>Sistem Pemesanan Hotel</h1>
                <ul>
                    <li><Link to="/">Beranda</Link></li>
                    <li><Link to="/rooms">Daftar Kamar</Link></li>
                    <li><Link to="/booking">Buat Pemesanan</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/bookings">Daftar Pemesanan</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

