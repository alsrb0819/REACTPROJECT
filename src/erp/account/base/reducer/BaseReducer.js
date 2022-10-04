import { createAction } from "redux-actions";

//================================= 2021-03-16 송화준 =================================

//계정과목 조회
export const SEARCH_ACCOUNT_REQUEST = "src/erp/account/Saga/Saga/SEARCH_ACCOUNT";
export const SEARCH_ACCOUNT_SUCCESS = "src/erp/account/Saga/Saga/SEARCH_ACCOUNT_SUCCESS";
export const SEARCH_ACCOUNT_FAILURE = "src/erp/account/Saga/Saga/SEARCH_ACCOUNT_FAILURE";

//========================================= 2020-11-28 계정과목관리  유길현 시작 ==============================================
export const BATCH_ACCOUNT_LIST_REQUEST = "src/erp/account/Saga/Saga/BATCH_ACCOUNT_LIST_REQUEST";
export const BATCH_ACCOUNT_LIST_FAILURE = "src/erp/account/Saga/Saga/BATCH_ACCOUNT_LIST_FAILURE";

//========================================= 2020-09-01 거래처 관리 조편백  시작 ==============================================
export const BATCH_ACCOUNT_REQUEST = "src/erp/account/Saga/Saga/BATCH_ACCOUNT_REQUEST";
export const BATCH_ACCOUNT_FAILURE = "src/erp/account/Saga/Saga/BATCH_ACCOUNT_FAILURE";

export const setAccountList = createAction(SEARCH_ACCOUNT_REQUEST);

const initialState = {
    error: "",
    accountList: [],
};

const BaseReducer = (state = initialState, action) => {
    switch (action.type) {
        // 계정과목 조회
        case SEARCH_ACCOUNT_SUCCESS:
            return {
            ...state,
            accountList: action.payload,
            };
        case SEARCH_ACCOUNT_FAILURE:
            return {
            ...state,
            error: action.error,
            };
        //========================================= 2020-11-27 계정과목관리 유길현  시작  =============================
        case BATCH_ACCOUNT_LIST_FAILURE:
            return {
            ...state,
            error: action.error,
            };
        //========================================= 2020-11-27 계정과목관리 유길현  끝  =============================
        case BATCH_ACCOUNT_FAILURE:
        return {
            ...state,
            error: action.error,
        };
        default:
        return { ...state };
    }
}

export default BaseReducer;
{/* ///////////////////////// 2021-03-02 이은기  /////////////////////////// */}