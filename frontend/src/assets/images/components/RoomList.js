import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('/api/rooms');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="room-list">
            <h2>Daftar Kamar</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room._id}>
                        <h3>Kamar No: {room.roomNumber}</h3>
                        <p><strong>Tipe:</strong> {room.type}</p>
                        <p><strong>Harga:</strong> {room.price} IDR per malam</p>
                        <Link to={`/rooms/${room._id}`}>Lihat Detail</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;

