import { Button } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import Swal from 'sweetalert2';
function worksitesearch(props) {
    const list = props.list;

    const column = {
        columnDefs: [
            { headerName: '작업지시번호', field: 'workOrderNo' },
            { headerName: '작업장명', field: 'workSieteName' },
            { headerName: '제작품목분류', field: 'wdItem' },
            { headerName: '제작품목코드', field: 'parentItemCode' },
            { headerName: '제작품목명', field: 'parentItemName' },
            { headerName: '작업품목분류', field: 'itemClassIfication' },
            { headerName: '작업품목코드', field: 'itemCode' },
            { headerName: '작업품목명', field: 'itemName' },
            { headerName: '작업량', field: 'requiredAmount' },
        ],
    }


    const workCompletion = () => {
        console.log("@@", list);
        Axios.post("http://localhost:8282/logi/production/workCompletion", {
            workOrderInfo: list
        })
            .then(response => {
                props.refresh()
                Swal.fire({
                    icon: 'success',
                    title: '작업 성공',
                    timer: 1500
                })
                detailClose();
            })
            .catch(e => {
                console.log(e);
            });
    }

    const detailClose = () => {
        props.detailClose();
    }
    return (
        <MyGrid
            column={column}
            title={'원재료 검사'}
            list={list}
            rowSelection="single"
            size={'30vh'}
        >
            <Button variant="contained" color="secondary" style={{ marginRight: "3vh" }} onClick={workCompletion}>검사 및 제작 완료</Button>
            <Button variant="contained" color="secondary" onClick={detailClose}>상세 닫기</Button>
        </MyGrid>
    );
}

export default worksitesearch;