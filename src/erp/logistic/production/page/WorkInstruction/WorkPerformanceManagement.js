import React, { useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import Swal from 'sweetalert2';

function WorkPerformanceManagement(props) {
    const [size, setSize] = useState('50vh');
    const [list, setList] = useState([]);

    const column = {
        columnDefs: [
            {
                headerName: '생산완료날짜',
                field: 'workOrderCompletionDate',
                sortable: true
            },
            { headerName: '작업지시일련번호', field: 'workOrderNo' },
            { headerName: '주생산계획번호', field: 'mpsNo' },
            {
                headerName: '수주상세일련번호',
                field: 'contractDetailNo'
            },
            { headerName: '품목구분', field: 'itemClassification' },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unit' },
            { headerName: '작업지시수량', field: 'workOrderAmount' },
            {
                headerName: '실제제작수량',
                field: 'actualCompletionAmount'
            },
            { headerName: '공정성공율', field: 'workSuccessRate' }
        ]
    };

    const onClick = e => {
        Axios.get('http://localhost:8282/logi/production/getProductionPerformanceInfoList')
            .then(response => {
                setList(response.data.gridRowJson);
            })
            .catch(e => {
                Swal.fire('오류', e, 'error');
            });
    };

    return (
        <MyGrid list={list} column={column} title={'생산실적관리'} size={size}>
            <Button
                variant="contained"
                color="secondary"
                //style={{ marginTop: "1vh" }}
                onClick={onClick}
            >
                생산실적조회
            </Button>
        </MyGrid>
    );
}

export default WorkPerformanceManagement;
