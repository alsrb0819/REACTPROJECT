import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AccRoute from 'erp/account/root/RootRoute';
import HrRootRoute from 'erp/hr/root/RootRoute';
import LogiRootRoute from '../erp/logistic/root/RootRoute';
import Main from '../common/page/dashboard/components/Main';
import Covid19 from '../common/page/dashboard/covid/Covid19';
import CompanyMap from '../common/page/dashboard/map/CompanyMap';

function RootRoute() {
    return (
        <>
            <Switch>
                {/* 메 인 */}
                <Route exact path="/app/dashboard" component={Main} />
                {/* 메 인 */}
            </Switch>
            <Switch>
                {/* 메 인 */}
                <Route exact path="/app/dashboard/covid19" component={Covid19} />
                {/* 메 인 */}
            </Switch>
            <Switch>
                {/* 메 인 */}
                <Route exact path="/app/dashboard/map" component={CompanyMap} />
                {/* 메 인 */}
            </Switch>
            <Switch>
                {/* 회 계 */}
                <AccRoute />
                {/* 회 계 */}
            </Switch>

            <Switch>
                {/* 인 사 */}
                <HrRootRoute />
                {/* 인 사 */}
            </Switch>

            <Switch>
                {/* 물 류 */}
                <LogiRootRoute />
                {/* 물 류 */}
            </Switch>
        </>
    );
}

export default RootRoute;
