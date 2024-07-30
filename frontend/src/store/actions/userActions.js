import axios from 'axios';

// Tipe-tipe aksi
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Aksi untuk mendapatkan semua pengguna
export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
        const response = await axios.get('/api/users');
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
};

// Aksi untuk membuat pengguna baru
export const createUser = (userData) => async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    try {
        const response = await axios.post('/api/users', userData);
        dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
    }
};

// Aksi untuk memperbarui pengguna
export const updateUser = (userId, updates) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
        const response = await axios.put(`/api/users/${userId}`, updates);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
    }
};

// Aksi untuk menghapus pengguna
export const deleteUser = (userId) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
        await axios.delete(`/api/users/${userId}`);
        dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
    } catch (error) {
        dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    }
};

// Aksi untuk login pengguna
export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post('/api/users/login', { email, password });
        // Simpan token ke localStorage atau state aplikasi jika diperlukan
        localStorage.setItem('token', response.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

