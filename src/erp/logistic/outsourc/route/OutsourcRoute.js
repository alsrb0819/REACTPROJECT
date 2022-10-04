import React from 'react';
import { Route } from 'react-router-dom';
//************************************************생산 관리 ********************************************************
import { default as OrderContainer } from 'erp/logistic/outsourc/page/Order/OrderContainer'; //*****2020-12-04 정준혁 주생산계획(MPS)
import { default as ForwardContainer } from 'erp/logistic/outsourc/page/Forward/ForwardContainer'; //*****2020-12-04 정준혁 주생산계획(MPS)
import { default as InspectionContainer } from 'erp/logistic/outsourc/page/Inspection/InspectionContainer'; //*****2020-12-04 정준혁 주생산계획(MPS)

function OutsourcRoute() {
    return (
        <>
            <Route exact path="/app/logistic/outsourc/order" component={OrderContainer} />
            <Route exact path="/app/logistic/outsourc/forward" component={ForwardContainer} />
            <Route exact path="/app/logistic/outsourc/inspection" component={InspectionContainer} />
        </>
    );
}

export default OutsourcRoute;
