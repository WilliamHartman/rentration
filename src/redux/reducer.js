import axios from 'axios';

const initialState = {
    user: {},
    userBills: {}
}

const GET_USER_DATA = 'GET_USER_DATA';
const GET_USER_BILLS = 'GET_USER_BILLS';


export function getUserData(){
    const user = axios.get('/auth/me').then(res => res.data);
    return {
        type: GET_USER_DATA,
        payload: user
    }
}

export function getUserBills(userID){
    const userBills = axios.get(`/getuserbills/${userID}`).then(res => res.data)
    return {
        type: GET_USER_BILLS,
        payload: userBills
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case GET_USER_BILLS + '_FULFILLED':
            return Object.assign({}, state, { userBills: action.payload });
        default:
            return state;
    }
}