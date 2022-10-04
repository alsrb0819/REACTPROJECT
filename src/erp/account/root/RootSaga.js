import { all } from "redux-saga/effects";
import AccountSaga from "erp/account/account/saga/AccountSaga";
import StatementSaga from "erp/account/statement/saga/StatementSaga";
import BaseSaga from "erp/account/base/saga/BaseSaga";

export default function* AccRootSaga() {
    yield all([
        AccountSaga(),
        StatementSaga(),
        BaseSaga()
    ]);
}