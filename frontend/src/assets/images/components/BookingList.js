import React, { useEffect, useState } from 'react';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('/api/bookings', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Daftar Pemesanan</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pengguna</th>
                        <th>Kamar</th>
                        <th>Tanggal Check-In</th>
                        <th>Tanggal Check-Out</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking._id}>
                            <td>{booking._id}</td>
                            <td>{booking.user ? booking.user.name : 'N/A'}</td>
                            <td>{booking.room ? booking.room.roomNumber : 'N/A'}</td>
                            <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                            <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                            <td>{booking.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;

