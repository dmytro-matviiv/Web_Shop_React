import * as types from './types';

const initalState = {
    data: 25
};


export const counterReducer = (state = initalState, action) => {

    switch(action.type) {
        case types.COUNTER_INCREMENT:
            return {
                ...state,
                data: state.data+1
            };
            break;
    }
    return state;
}