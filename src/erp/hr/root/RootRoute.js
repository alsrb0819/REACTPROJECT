import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AttdRoute from '../attendance/route/AttdRoute';
import BaseRoute from '../base/route/BaseRoute';
import SalaryRoute from '../salary/route/SalaryRoute';
import EmpRoute from '../affair/route/EmpRoute';
import DayWorkerRoute from '../dayworker/route/DayWorkerRoute'

const HrRootRoute = () => {
    return (
        <>
            <AttdRoute />
            <BaseRoute />
            <SalaryRoute />
            <EmpRoute />
            <DayWorkerRoute />
        </>
    );
};

export default withRouter(HrRootRoute);
