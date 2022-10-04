import React from 'react';
import { Route } from 'react-router-dom';
//************************************************생산 관리 ********************************************************
import { default as MpsContainer } from 'erp/logistic/production/page/MPS/MpsContainer'; //*****2020-12-04 정준혁 주생산계획(MPS)
import { default as WorkInstructionContainer } from 'erp/logistic/production/page/WorkInstruction/WorkInstructionContainer'; //*****2020-12-08 서원혁 작업지시
import { default as MrpContainer } from 'erp/logistic/production/page/MRP/MrpContainer'; //*****2020-12-08 강동욱 소요량(MRP)
import { default as MrpInfo } from 'erp/logistic/production/page/MRP/MrpInfo'; //*****2020-12-08 황경윤 소요량전개취합 조회(MRP)
import { default as WorkSite } from 'erp/logistic/production/page/WorkSite/WorkSite'; //*****2020-12-08 노원찬 작업장/작업장로그

function ProductionRoute() {
    return (
        <>
            {/* 생산 관리 */}
            <Route exact path="/app/logistic/production/mpsRegister" component={MpsContainer} />
            {/*2020-12-04 정준혁*/}

            <Route
                exact
                path="/app/logistic/production/mrpRegisterAndGather"
                component={MrpContainer}
            />
            {/*2020-12-08 강동욱*/}

            <Route
                exact
                path="/app/logistic/production/workInstruction"
                component={WorkInstructionContainer}
            />
            {/*2020-12-08 서원혁*/}

            <Route exact path="/app/logistic/production/workSite" component={WorkSite} />
            {/*2020-12-08 노원찬*/}

            <Route exact path="/app/logistic/production/mrpInfo" component={MrpInfo} />
            {/*2020-12-08 황경윤*/}
        </>
    );
}

export default ProductionRoute;
