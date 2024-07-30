import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RoomDetail = () => {
    const { roomId } = useParams(); // Mendapatkan ID kamar dari parameter URL
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await fetch(`/api/rooms/${roomId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRoom(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!room) return <p>Room not found</p>;

    return (
        <div className="room-detail">
            <h2>Detail Kamar</h2>
            <div className="room-info">
                <h3>Kamar No: {room.roomNumber}</h3>
                <p><strong>Tipe:</strong> {room.type}</p>
                <p><strong>Harga:</strong> {room.price} IDR per malam</p>
                <p><strong>Fasilitas:</strong> {room.amenities.join(', ')}</p>
                <p><strong>Deskripsi:</strong> {room.description}</p>
            </div>
        </div>
    );
};

export default RoomDetail;

