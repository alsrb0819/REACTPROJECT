import React from "react";
import { Route,withRouter } from "react-router-dom";

import { default as AccountForm } from "../page/AccountForm/AccountForm"; // 계정과목관리
import { default as WorkplaceManagement } from "../page/WorkplaceManagement/WorkplaceManagement"; //거래처관리 ======  2020-08-31 조편백  추가 =======

const BaseRoute = () => {
    return (
        <>
            {/* 계정과목 */}
            <Route
                exact
                path="/app/acc/account/accountForm"
                component={AccountForm}
            />{" "}
            {/* 거래처관리 */}
            <Route
                exact
                path="/app/acc/company/WorkplaceManagement"
                component={WorkplaceManagement}
            />
        </>
    );
}
export default withRouter(BaseRoute);
{/* ///////////////////////// 2021-03-02 이은기  /////////////////////////// */}