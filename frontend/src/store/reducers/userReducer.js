import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './userActions';

// State awal
const initialState = {
    users: [],
    user: null,
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null // Menyimpan token jika ada
};

// Reducer
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
        case CREATE_USER_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload]
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map(user =>
                    user._id === action.payload._id ? action.payload : user
                )
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter(user => user._id !== action.payload)
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token
            };

        case FETCH_USERS_FAILURE:
        case CREATE_USER_FAILURE:
        case UPDATE_USER_FAILURE:
        case DELETE_USER_FAILURE:
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default userReducer;

