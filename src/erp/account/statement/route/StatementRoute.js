import React from "react";
import { Route,withRouter } from "react-router-dom";

import { default as DetailTrialBalance } from "../page/DetailTrialBalance/DetailTrialBalance"; // 일(월)계표 *********** 2020-08-24 김진호 추가 ***********
import { default as CashJournal } from "../page/CashJournal/CashJournal"; // 현금출납장  *********** 2020-08-24 정대현 추가 ***********
import { default as AccountLedger } from "../page/AccountLedger/AccountLedger"; // 계정별 원장  ======  2020-08-25 조편백  추가 =======
import { default as FinancialStatements } from "../page/FinancialStatements/FinancialStatements"; // 재무상태표
import { default as TotalTrialBalance } from "../page/TotalTrialBalance/TotalTrialBalance"; // 합계잔액시산표
import { default as IncomeStatement } from "../page/IncomeStatement/IncomeStatement"; //손익계산서 ======  2020-08-24 조편백  추가 =======
import { default as MonthIncomeStatement } from "../page/MonthIncomeStatement/MonthIncomeStatement";
import { default as CostStatement } from "../page/CostStatement/CostStatement"; //원가명세서 ======  2020-11-11 추가 =======
import { default as PreviousFinalcialStatement } from "../page/PreviousFinalcialStatement/PreviousFinalcialStatement"; //전기분재무상태표 ======  2020-11-25 최지은&노원찬 추가 =======
import { default as CashFlowStatement } from "../page/CashFlowStatement/CashFlowStatement"; //원가명세서 ======  2020-11-11 추가 =======


const StatementRoute = () => {
    return(
        <>
            {/* 일(월)계표 */}
            <Route
                exact
                path="/app/acc/statement/detailTrialBalance"
                component={DetailTrialBalance}
            />{" "}
            {/* 현금출납장 */}
            <Route
                exact
                path="/app/acc/statement/cashJournal"
                component={CashJournal}
            />
            {/* 계정별원장 */}
            <Route
                exact
                path="/app/acc/statement/AccountLedger"
                component={AccountLedger}
            />{" "}
            {/* 재무상태표 */}
            <Route
                exact
                path="/app/acc/statement/financialPosition"
                component={FinancialStatements}
            />{" "}
            {/* 합계잔액시산표 */}
            <Route
                exact
                path="/app/acc/statement/totalTrialBalance"
                component={TotalTrialBalance}
            />{" "}
            {/* 손익계산서 */}
            <Route
                exact
                path="/app/acc/statement/IncomeStatement"
                component={IncomeStatement}
            />
            {/* 월별손익계산서 */}
            <Route
                exact
                path="/app/acc/statement/monthIncomeStatement"
                component={MonthIncomeStatement}
            />
            {/* 원가명세서 */}
            <Route
                exact
                path="/app/acc/statement/CostStatement"
                component={CostStatement}
            />
            {/* 전기분재무상태표 */}
            <Route
                exact
                path="/app/acc/statement/PreviousFinalcialStatement"
                component={PreviousFinalcialStatement}
            />
            {/* 현금흐름표 */}
            <Route
                exact
                path="/app/acc/statement/cashFlowStatement"
                component={CashFlowStatement}
            />
    </>
    );
}

export default withRouter(StatementRoute);
{/* ///////////////////////// 2021-02-23 이은기  /////////////////////////// */}