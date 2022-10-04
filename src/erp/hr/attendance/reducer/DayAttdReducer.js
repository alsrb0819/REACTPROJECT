import { createAction } from 'redux-actions';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//*********************************일근태 crud***************************/
export const INSERT_DAY_ATTD_SUCCESS = 'dayattd/INSERT_DAY_ATTD_START_SUCCESS';
export const INSERT_DAY_ATTD_FAILURE = 'dayattd/INSERT_DAY_ATTD_START_FAILURE';
export const SELECT_DAY_ATTD_SUCCESS = 'dayattd/SELECT_DAY_ATTD_START_SUCCESS';
export const SELECT_DAY_ATTD_FAILURE = 'dayattd/SELECT_DAY_ATTD_START_FAILURE';
export const DELETE_DAY_ATTD_FAILURE = 'dayattd/DELETE_DAY_ATTD_START_FAILURE';


const initialState = {
    attdData: [],
    errorMsg: '',
    errorCode: '',
 
};

const dayattd = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_DAY_ATTD_SUCCESS:
            return {
                ...state,
                attdData: []
            };
        case INSERT_DAY_ATTD_FAILURE:
            return {
                ...state
            };
        case SELECT_DAY_ATTD_SUCCESS:
            return {
                ...state,
                attdData: action.payload.DayAttdTO
            };
        case SELECT_DAY_ATTD_FAILURE:
            return {
                ...state
            };
        case DELETE_DAY_ATTD_FAILURE:
            return {
                ...state,
                errorMsg: action.payload
            };
        default:
           return state;
            }
        };
        
export default dayattd;