import React, { useState, useEffect } from 'react';

const BookingPage = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
            }
        };

        fetchRooms();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const bookingData = {
            roomId: selectedRoom,
            checkInDate,
            checkOutDate
        };

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(bookingData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setSuccess('Pemesanan berhasil dibuat!');
            setError(null);
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    return (
        <div className="booking-page">
            <h2>Buat Pemesanan</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="room">Pilih Kamar:</label>
                    <select
                        id="room"
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        required
                    >
                        <option value="">Pilih Kamar</option>
                        {rooms.map(room => (
                            <option key={room._id} value={room._id}>
                                Kamar No: {room.roomNumber} - {room.type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="checkInDate">Tanggal Check-In:</label>
                    <input
                        type="date"
                        id="checkInDate"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="checkOutDate">Tanggal Check-Out:</label>
                    <input
                        type="date"
                        id="checkOutDate"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Buat Pemesanan</button>
            </form>
        </div>
    );
};

export default BookingPage;

