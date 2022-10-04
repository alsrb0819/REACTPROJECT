import { createAction } from 'redux-actions';

export const SELECT_BASE_WORK_TIME_LIST = 'src/erp/hr/Saga/Saga/SELECT_BASE_WORK_TIME_LIST';
//export const INSERT_BASE_WORK_TIME_LIST = 'baseworktime/INSERT_BASE_WORK_TIME_LIST';
export const DELETE_BASE_WORK_TIME = 'src/erp/hr/Saga/Saga/DELETE_BASE_WORK_TIME';

export const SELECT_BASE_WORK_TIME_LIST_SUCCESS = 'src/erp/hr/Saga/Saga/SELECT_BASE_WORK_TIME_LIST_SUCCESS';
export const SELECT_BASE_WORK_TIME_LIST_FAILURE = 'src/erp/hr/Saga/Saga/SELECT_BASE_WORK_TIME_LIST_FAILURE';

//export const INSERT_BASE_WORK_TIME_LIST_SUCCESS = 'baseworktime/INSERT_BASE_WORK_TIME_LIST_SUCCESS';
//export const INSERT_BASE_WORK_TIME_LIST_FAILURE = 'baseworktime/INSERT_BASE_WORK_TIME_LIST_FAILURE';

export const DELETE_BASE_WORK_TIME_SUCCESS = 'src/erp/hr/Saga/Saga/DELETE_BASE_WORK_TIME_SUCCESS';
export const DELETE_BASE_WORK_TIME_FAILURE = 'src/erp/hr/Saga/Saga/DELETE_BASE_WORK_TIME_FAILURE';

export const BATCH_BASE_WORK_TIME_SUCCESS = 'baseworktime/BATCH_BASE_WORK_TIME_SUCCESS';
export const BATCH_BASE_WORK_TIME_FAILURE = 'baseworktime/BATCH_BASE_WORK_TIME_FAILURE';

const initialState = {
    baseWorkTimeList: [],
    errorCode: '',
    errorMsg: '',
};

const baseworktime = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_BASE_WORK_TIME:
            console.log('DELETE_BASE_WORK_TIME');
            return {
                ...state
            };
        case DELETE_BASE_WORK_TIME_SUCCESS:
            alert('삭제 완료');
            console.log('DELETE_BASE_WORK_TIME_SUCCESS');
            console.log(action.payload.map(el => el.applyYear));
            return {
                ...state,
                baseWorkTimeList: state.baseWorkTimeList.filter(baseWorkTime => {
                    return !(
                        action.payload.map(el => el.applyYear).indexOf(baseWorkTime.applyYear) > -1
                    );
                })
            };

        case DELETE_BASE_WORK_TIME_FAILURE:
            console.log('DELETE_BASE_WORK_TIME_FAILURE');
            return {
                ...state
            };

        // case INSERT_BASE_WORK_TIME_LIST:
        //     console.log('INSERT_BASE_WORK_TIME_LIST');
        //     return {
        //         ...state
        //     };

        // case INSERT_BASE_WORK_TIME_LIST_SUCCESS:
        //     console.log('INSERT_BASE_WORK_TIME_LIST_SUCCESS');
        //     return {
        //         ...state,
        //         baseWorkTimeList: state.baseWorkTimeList.concat({
        //             applyYear: null,
        //             attendTime: null,
        //             chk: null,
        //             dinnerEndTime: null,
        //             dinnerStartTime: null,
        //             errorCode: null,
        //             errorMsg: null,
        //             lunchEndTime: null,
        //             lunchStartTime: null,
        //             nightEndTime: null,
        //             overEndTime: null,
        //             quitTime: null,
        //             status: 'insert'
        //         })
        //     };

        // case INSERT_BASE_WORK_TIME_LIST_FAILURE:
        //     console.log('HrReducer');
        //     return {
        //         ...state
        //     };

        case SELECT_BASE_WORK_TIME_LIST:
            console.log('HrReducer');
            return {
                ...state
            };

        case SELECT_BASE_WORK_TIME_LIST_SUCCESS:
            console.log('HR리듀서 SELECT_BASE_WORK_TIME_LIST_SUCCESS  ', action);
            return {
                ...state,
                baseWorkTimeList: action.payload
            };

        case SELECT_BASE_WORK_TIME_LIST_FAILURE:
            console.log('HR리듀서 SELECT_BASE_WORK_TIME_LIST_FAILURE  ', action);
            return {
                ...state
            };
            
        default:
            return state;
    }
};

export default baseworktime;
