import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import HrAppBar from 'erp/hr/util/HrAppBar'
import MySelect from 'erp/hr/util/MySelect'
import MyGrid from 'erp/hr/util/MyGrid'
import columnDefinition from './columnDefinition'
import { SEARCH_MONTH_SALARY_LIST_REQUEST } from "../../saga/SearchMonthSalSaga";
import { thisYear } from 'erp/hr/util/lib'
import { FormControl } from "@material-ui/core";
//-- 64 정준혁 2020-12-01 
const MonthSalaryContainer = () => {
    const [selectData, setSelectData] = useState(
        {
            dept: [
                { key: '전체부서', value: 'ALL' }
            ],
            calendar: [
                { key: '전체날짜', value: 'ALL' },
                ...thisYear()
            ]
        }
    );
    const [selectDeptTitle, setSelectDeptTitle] = useState(selectData.dept[0].value)
    const [selectCalendar, setSelectCalendar] = useState(selectData.calendar[0].value)
    const [rowData, setRowData] = useState([]);
    const monthSalaryListDispatch = useDispatch();
    const data = useSelector(({ hr }) => hr.salary.searchmonthsal.monthSalary, []);
   // console.log("@@@@@@@@data=="+data);
    const selectHandleChange = useCallback((e) => {
        const selectValue = e.target.value;
        const selectName = e.target.name;
        if (selectName === '부서') {
            setSelectDeptTitle(selectValue);
        } else if (selectName === '달력') {
            setSelectCalendar(selectValue)
        }
    }, []);

    useEffect(() => {
        monthSalaryListDispatch({
            type: SEARCH_MONTH_SALARY_LIST_REQUEST,
            payload: {
                applyYearMonth: 'ALL',
                deptCode: 'ALL'
            },
        });
    }, []);

    useEffect(() => {
        if (selectDeptTitle === 'ALL' && selectCalendar === 'ALL') {
            setRowData(data);
            return;
        }
        let filterData = data;
        if (selectDeptTitle !== 'ALL') {
            filterData = filterData.filter(e => e.deptCode === selectDeptTitle);
           // console.log("@@@@@@@@@@@@@filterData=="+filterData);
        }
        if (selectCalendar !== 'ALL') {
            filterData = filterData.filter(e => e.applyYearMonth === selectCalendar);
        }
        setRowData(filterData)
    }, [selectDeptTitle, selectCalendar, data]);

    useEffect(() => {
        axios.get(
            "http://localhost:8282/hr/base/deptList"
        ).then(({ data }) => {
            console.log('~~~~~~~~~~~~~~~~~~~');
            console.log(data);
            const dataList = data.list.map(e => {
                return {
                    key: e.deptName,
                    value: e.deptCode
                }
            })

            setSelectData({
                ...selectData, dept: [...selectData.dept, ...dataList]
            })
        }).catch(e => {
            alert(e);
        });
    }, []);
    return (
        <>
            <HrAppBar title="월 급여 조회" />
            <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'부서'}
                    selectValue={selectDeptTitle}
                    selectonChange={selectHandleChange}
                    menuItemMap={selectData.dept} />
            </FormControl>
            <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'달력'}
                    selectValue={selectCalendar}
                    selectonChange={selectHandleChange}
                    menuItemMap={selectData.calendar} />
            </FormControl>
            <MyGrid
                columnDefinition={columnDefinition}
                rowData={rowData}
                paginationAutoPageSize={true}
                pagination={true} />
        </>
    );
}

export default React.memo(MonthSalaryContainer);