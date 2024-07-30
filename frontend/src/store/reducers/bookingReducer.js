import {
    FETCH_BOOKINGS_REQUEST,
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_FAILURE,
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAILURE,
    UPDATE_BOOKING_REQUEST,
    UPDATE_BOOKING_SUCCESS,
    UPDATE_BOOKING_FAILURE,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILURE
} from './bookingActions';

// State awal
const initialState = {
    bookings: [],
    loading: false,
    error: null
};

// Reducer
const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKINGS_REQUEST:
        case CREATE_BOOKING_REQUEST:
        case UPDATE_BOOKING_REQUEST:
        case DELETE_BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_BOOKINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload
            };

        case CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: [...state.bookings, action.payload]
            };

        case UPDATE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: state.bookings.map(booking =>
                    booking._id === action.payload._id ? action.payload : booking
                )
            };

        case DELETE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: state.bookings.filter(booking => booking._id !== action.payload)
            };

        case FETCH_BOOKINGS_FAILURE:
        case CREATE_BOOKING_FAILURE:
        case UPDATE_BOOKING_FAILURE:
        case DELETE_BOOKING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default bookingReducer;

