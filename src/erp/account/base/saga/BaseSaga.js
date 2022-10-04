import { takeEvery, put, takeLatest, delay, fork } from "redux-saga/effects";
import accountApi from "api/accountApi";
import * as types from "../reducer/BaseReducer";
import Axios from "axios";
import createRequestSaga from "util/createRequestSaga";
import * as api from '../api';


//================================== 2020-11-28 계정과목관리 유길현  시작  =====================================
function* batchAccountList(action) {
    console.log(
      "계정과목관리  Saga 실행 : " + JSON.stringify(action.params.accountList),
    );
    try {
      if (action.division === "delete") {
        yield accountApi.get(
          "http://localhost:8282/acc/account/deleteAccountList",
          {
            params: { accountInnerCode: action.params.accountInnerCode },
          },
        );
        console.log(" 삭제 ");
      }
      if (action.division === "save") {
        yield Axios.post(
          "http://localhost:8282/acc/account/batchAccountList",
          { accountList: action.params.accountList },
          { headers: { "Content-Type": "application/json" } },
        );
        console.log(" 저장 ");
      }
    } catch (error) {
      yield put({ type: types.BATCH_ACCOUNT_LIST_FAILURE, error });
    }
  }
  //================================== 2020-11-28 계정과목관리 유길현  끝  =====================================
  
//================================== 2020-09-01 거래처 관리 조편백  시작=====================================
function* batchCustormerProcess(action) {
    console.log(
      "거래처 관리  Saga 실행 : " + JSON.stringify(action.params.customerList),
    );
    try {
      if (action.division === "delete") {
        yield accountApi.get(
          "http://localhost:8282/acc/base/deleteNormalCustormer",
          {
            params: { customerCode: action.params.customerCode },
          },
        );
        console.log(" 삭제 ");
      }
      if (action.division === "save") {
        yield Axios.post(
          "http://localhost:8282/acc/base/batchCustormerProcess",
          { customerList: action.params.customerList },
          { headers: { "Content-Type": "application/json" } },
        );
        console.log(" 저장 ");
      }
    } catch (error) {
      yield put({ type: types.BATCH_ACCOUNT_FAILURE, error });
    }
  }
//******************************* 2021-03-16 송화준 **************************************
const searchAccountListSaga = createRequestSaga(types.SEARCH_ACCOUNT_REQUEST, api.searchAccountList);

  

export default function* BaseSaga() {
    yield takeLatest(types.SEARCH_ACCOUNT_REQUEST, searchAccountListSaga);
    yield takeEvery(types.BATCH_ACCOUNT_LIST_REQUEST, batchAccountList);
    yield takeEvery(types.BATCH_ACCOUNT_REQUEST, batchCustormerProcess);
}
