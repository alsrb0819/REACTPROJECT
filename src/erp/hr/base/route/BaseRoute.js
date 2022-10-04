import React from 'react';
import { Route, withRouter } from 'react-router-dom';

// 시 스 템 관 리 =========================================================================================================================
import { default as HolidayContainer } from '../page/Holiday/HolidayContainer'; //2020-11-16 64rl 정준혁 휴일조회관리
import { default as DepartmentManageContainer } from '../page/DepartmentManage/DepartmentManageContainer'; //2020-11-18 64기 신수녕수정 --부서관리
import { default as BaseWorkTimeContainer } from '../page/BaseWorkTime/BaseWorkTimeContainer'; //2021-02-08 65기 임동하 --기본근무시간관리

const BaseRoute = () => {
    return (
        <>
            {/*******************2020-11-16 정준혁 *************************/}
            {/*휴일조회/관리*/}
            <Route exact path="/app/hr/sys/holidayManage" component={HolidayContainer} />{' '}
            {/*******************2020-11-16 정준혁 *************************/}
            {/*******************2020-02-08 임동하 *************************/}
            {/*기본근무시간/관리*/}
            <Route exact path="/app/hr/sys/baseWorkTime" component={BaseWorkTimeContainer} />{' '}
            {/*******************2021-02-08 임동하 *************************/}
            {/*******************2020-11-16 신수녕 *************************/}
            {/*부서관리*/}
            <Route exact path="/app/hr/sys/deptManage" component={DepartmentManageContainer} />{' '}
            {/*******************2020-11-16 신수녕 *************************/}
        </>
    );
};

export default withRouter(BaseRoute);
