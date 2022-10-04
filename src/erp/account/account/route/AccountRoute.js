import React from "react";
import { Route,withRouter } from "react-router-dom";

// 전 표  =========================================================================================================================
import { default as Slip } from "../page/Slip/Container"; // 일반전표
import { default as ApprovalManager } from "../page/ApprovalManager/ApprovalManager"; // 전표승인
import { default as JournalForm } from "../page/JournalForm/JournalForm"; // 분개장
import { default as GeneralAccountLedger } from "../page/GeneralAccountLedger/GeneralAccountLedger"; // 총계정원장 2020-11-23 추가
// 고정 자산 ===============================================================================================================================
import { default as NonCurrentAsset } from "../page/NonCurrentAsset/NonCurrentAsset";

const AccountRoute = () => {
    return(
        <>
            {/* 일반전표 */}
            <Route
                exact
                path="/app/acc/account/slipForm"
                component={Slip}
            />{" "}
            {/* 전표승인 */}
            <Route
                exact
                path="/app/acc/account/approvalManager"
                component={ApprovalManager}
            />{" "}
            {/* 분개장 */}
            <Route
                exact
                path="/app/acc/account/journalForm"
                component={JournalForm}
            />
            {/* 총계정원장 */}
            <Route
                exact
                path="/app/acc/account/GeneralAccountLedger"
                component={GeneralAccountLedger}
            />
            {/* 고정자산등록 */}
            <Route
                exact
                path="/app/acc/account/CurrentAssetRegister"
                component={NonCurrentAsset}
            />
        </>
    );
}
{/* ///////////////////////// 2021-02-23 이은기  /////////////////////////// */}

export default withRouter(AccountRoute);