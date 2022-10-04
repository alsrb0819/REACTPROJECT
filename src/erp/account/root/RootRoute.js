import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import AccountRoute from '../account/route/AccountRoute';
import StatementRoute from '../statement/route/StatementRoute';
import BaseRoute from '../base/route/BaseRoute';

const AccRootRoute = () => {
    return(
        <>
            <AccountRoute/>
            <StatementRoute/>
            <BaseRoute/>
        </>
    );
}
export default withRouter(AccRootRoute);
{/* ///////////////////////// 2021-02-23 이은기  /////////////////////////// */}