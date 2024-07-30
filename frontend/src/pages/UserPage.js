import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const { userId } = useParams(); // Mendapatkan ID pengguna dari parameter URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>Pengguna tidak ditemukan</p>;

    return (
        <div className="user-page">
            <h2>Detail Pengguna</h2>
            <div className="user-info">
                <p><strong>ID:</strong> {user._id}</p>
                <p><strong>Nama:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Peran:</strong> {user.role}</p>
                <p><strong>Telepon:</strong> {user.phone || 'N/A'}</p>
                <p><strong>Alamat:</strong> {user.address || 'N/A'}</p>
                <p><strong>Gabung pada:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default UserPage;

