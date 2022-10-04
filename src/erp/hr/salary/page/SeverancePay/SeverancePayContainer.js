import React, { useCallback, useEffect, useState } from 'react';
import { formatNumber } from 'erp/hr/util/lib'
import HrAppBar from 'erp/hr/util/HrAppBar'
import MySelect from 'erp/hr/util/MySelect'
import MyGrid from 'erp/hr/util/MyGrid'
import { FormControl } from "@material-ui/core";
import Axios from 'axios';


//*********** 퇴직금조회 21/09/15 고범석  종료 *************/
export const SeveranceContainer = () => {
    const columnDefinition = [
        { headerName: "사원코드", field: "empCode", sortable: true, resizable: true },
        { headerName: "사원명", field: "empName", sortable: true, resizable: true },
        { headerName: "입사일", field: "hireDate" },
        { headerName: "적용연월", field: "sysDate" },
        // { headerName: "부서명", field: "deptName", sortable: true, resizable: true },
        // { headerName: "부서코드", field: "deptCode", hide: true },
        { headerName: "퇴직금", field: "severancePay", valueFormatter: formatNumber },
        { headerName: "비고", field: "text" },
    ];

    // 부서 selector 띄우기
    useEffect(() => {
        Axios.get(
            "http://localhost:8282/hr/base/deptList"
        ).then(({ data }) => {
            console.log(data);
            const dataList = data.list.map(e => {
                return {
                    key: e.deptName,
                    value: e.deptCode
                }
            })
            setSelectDeptData({
                // dept: dataList
                ...selectDeptData, dept: [...selectDeptData.dept, ...dataList]
            })
        }).catch(e => {
            alert(e);
        });
    }, []);


    const [selectDeptData, setSelectDeptData] = useState(
        {
            dept: [
                { key: '부서선택해주세요', value: 'ALL' }
            ]
        }
    );

    const [selectEmpData, setSelectEmpData] = useState(
        {
            emp: [
                { key: '사원선택해주세요', value: 'ALL' },
            ]
        }
    );


    // console.log('!!!!!EmpData.emp.value값!!!!');
    // console.log(selectEmpData.emp[0].value);
    // console.log(selectDeptData.dept[0].value);

    const [selectDeptTitle, setSelectDeptTitle] = useState(selectDeptData.dept[0].value)
    const [selectEmpCode, setSelectEmpCode] = useState(selectEmpData.emp[0].value)
    const [rowData, setRowData] = useState("");


    // 부서명 , 사원명 change될시
    const selectHandleChange = e => {
        console.log('체인지!!!!!!!!!!!!!');
        console.log(e);
        const selectValue = e.target.value;
        setSelectDeptTitle(selectValue);
        console.log('!!!!!!!!');
        console.log(selectDeptData);

        // 사원명
        Axios.get(
            "http://localhost:8282/hr/affair/memberList",
            {
                params: {
                    value: selectValue
                }
            }
        ).then(response => {
            console.log('response.data!!!!!!');
            console.log(response.data);
            console.log(response.data.list);
            const empList = response.data.list.map(e => {
                return {
                    key: e.empName,
                    value: e.empCode
                }
            })

            // 승훈이행님 도움
            setSelectEmpData({
                emp: empList
            })

            // 범석 소스코드
            // setSelectEmpData({
            //     ...selectEmpData, emp: [...selectEmpData.emp, ...empList]
            // })

        }).catch(() => {
            alert('해당부서에는 사원이 존재하지 않습니다');
            window.location.reload(true);
        })
    };

    // 사원명을 change했을 경우
    const selectSearchEmpChange = (e) => {
        const selectName = e.target.value;
        setSelectEmpCode(selectName);
        console.log(e);
        console.log('사원명~~~!!!');
        console.log(selectName);

        // 사원명 변경시 퇴직금 찍는
        Axios.get(
            "http://localhost:8282/hr/salary/severancePay",
            {
                params: {
                    empName: selectName
                }
            }
        ).then(
            response => {
                console.log(response.data)
                console.log(response.data.severancePayList[0]);
                console.log(response.data.gridRowJson);
                setRowData(response.data.severancePayList);
            }
        )
    }


    return (
        <>
            <HrAppBar title="퇴직금 조회" />
            <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'부서'}
                    selectValue={selectDeptTitle}
                    selectonChange={selectHandleChange}
                    menuItemMap={selectDeptData.dept} />
            </FormControl>
            <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'사원명'}
                    selectValue={selectEmpCode}
                    selectonChange={selectSearchEmpChange}
                    menuItemMap={selectEmpData.emp}
                />
            </FormControl>
            <MyGrid
                columnDefinition={columnDefinition}
                rowData={rowData}
                paginationAutoPageSize={true}
                pagination={true} />
        </>
    )
};



export default React.memo(SeveranceContainer);
