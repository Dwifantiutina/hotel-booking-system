import {
    FETCH_ROOMS_REQUEST,
    FETCH_ROOMS_SUCCESS,
    FETCH_ROOMS_FAILURE,
    CREATE_ROOM_REQUEST,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAILURE,
    UPDATE_ROOM_REQUEST,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAILURE,
    DELETE_ROOM_REQUEST,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAILURE
} from './roomActions';

// State awal
const initialState = {
    rooms: [],
    loading: false,
    error: null
};

// Reducer
const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ROOMS_REQUEST:
        case CREATE_ROOM_REQUEST:
        case UPDATE_ROOM_REQUEST:
        case DELETE_ROOM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_ROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: action.payload
            };

        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: [...state.rooms, action.payload]
            };

        case UPDATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: state.rooms.map(room =>
                    room._id === action.payload._id ? action.payload : room
                )
            };

        case DELETE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                rooms: state.rooms.filter(room => room._id !== action.payload)
            };

        case FETCH_ROOMS_FAILURE:
        case CREATE_ROOM_FAILURE:
        case UPDATE_ROOM_FAILURE:
        case DELETE_ROOM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default roomReducer;

