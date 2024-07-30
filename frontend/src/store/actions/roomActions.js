import axios from 'axios';

// Tipe-tipe aksi
export const FETCH_ROOMS_REQUEST = 'FETCH_ROOMS_REQUEST';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_FAILURE = 'FETCH_ROOMS_FAILURE';
export const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE';
export const UPDATE_ROOM_REQUEST = 'UPDATE_ROOM_REQUEST';
export const UPDATE_ROOM_SUCCESS = 'UPDATE_ROOM_SUCCESS';
export const UPDATE_ROOM_FAILURE = 'UPDATE_ROOM_FAILURE';
export const DELETE_ROOM_REQUEST = 'DELETE_ROOM_REQUEST';
export const DELETE_ROOM_SUCCESS = 'DELETE_ROOM_SUCCESS';
export const DELETE_ROOM_FAILURE = 'DELETE_ROOM_FAILURE';

// Aksi untuk mendapatkan semua kamar
export const fetchRooms = () => async (dispatch) => {
    dispatch({ type: FETCH_ROOMS_REQUEST });
    try {
        const response = await axios.get('/api/rooms');
        dispatch({ type: FETCH_ROOMS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ROOMS_FAILURE, payload: error.message });
    }
};

// Aksi untuk membuat kamar baru
export const createRoom = (roomData) => async (dispatch) => {
    dispatch({ type: CREATE_ROOM_REQUEST });
    try {
        const response = await axios.post('/api/rooms', roomData);
        dispatch({ type: CREATE_ROOM_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_ROOM_FAILURE, payload: error.message });
    }
};

// Aksi untuk memperbarui kamar
export const updateRoom = (roomId, updates) => async (dispatch) => {
    dispatch({ type: UPDATE_ROOM_REQUEST });
    try {
        const response = await axios.put(`/api/rooms/${roomId}`, updates);
        dispatch({ type: UPDATE_ROOM_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_ROOM_FAILURE, payload: error.message });
    }
};

// Aksi untuk menghapus kamar
export const deleteRoom = (roomId) => async (dispatch) => {
    dispatch({ type: DELETE_ROOM_REQUEST });
    try {
        await axios.delete(`/api/rooms/${roomId}`);
        dispatch({ type: DELETE_ROOM_SUCCESS, payload: roomId });
    } catch (error) {
        dispatch({ type: DELETE_ROOM_FAILURE, payload: error.message });
    }
};

