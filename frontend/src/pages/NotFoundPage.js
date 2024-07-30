import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <h1>404</h1>
            <h2>Halaman Tidak Ditemukan</h2>
            <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
            <Link to="/">Kembali ke Beranda</Link>
        </div>
    );
};

export default NotFoundPage;

