import * as types from './types';

const initState = {
    loading: false
};

export const authReducer = (state = initState, action) => {

    switch(action.type) {
        case types.LOGIN_STARTED: {
            return {
                ...state,
                loading: true
            }
        }
        case types.LOGIN_SUCCESS: {
            console.log('---sdfsdf---',action.errors);
            return {
                ...state,
                loading: false
            }
        }

        case types.LOGIN_FAILED: {
            return {
                ...state,
                loading: false
            }
        }
    }
    return state;
};