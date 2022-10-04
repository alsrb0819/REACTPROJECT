
import { Button } from '@material-ui/core';
import React, { useState,useCallback, useEffect, } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import MyDialog from 'util/LogiUtil/MyDialog';
import Axios from 'axios';
import ForwardOrderDialog from './ForwardOrderDialog';
import Swal from 'sweetalert2';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useAsync from 'util/useAsync';
import * as api from '../../api';

function Forward(props) {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    const [searchOpenDialog, setSearchOpenDialog] = useState(false);
    const [data, setData] = useState([]);

    let today = moment(new Date()).format('yyyy-MM-DD');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [condition, setCondition] = useState('claimDate');
    const [outsoutcInfoList, outsoutcInfoListFetch] = useAsync((param) =>api.searchForwardableList(param), [], true);
    const [gridApi, setGridApi] = useState();
    const [seq, setSeq] = useState(null);
    const [id, setId] = useState(null);
 
    const column = {
        columnDefs: [
            {
                headerName: '외주발주번호',
                field: 'outsourcNo',
                suppressSizeToFit: true,
                headerCheckboxSelection: false,
                headerCheckboxSelectionFilteredOnly: true,
                suppressRowClickSelection: true,
                checkboxSelection: true},
           
            {
                headerName: '소요량취합번호',
                field: 'mrpGatheringNo'
            },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfMrpGathering' },
            { headerName: '필요수량', field: 'outsourcAmount' },
            { headerName: '작업지시기한', field: 'claimDate' },
            { headerName: '작업완료기한', field: 'dueDate' },
            { headerName: 'status', field: 'forwardStatus', hide :true  }
        ]
    };

    const basicInfo = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const onChangeDate = e => {
        console.log(e);
        if (e.target.id === 'startDate') {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }
    };

    const conditionChange = e => {
        setCondition(e.target.value);
    };

    const onRowSelected = params => {
        setData(params);
    
    };

    const onClick = () => {
        let selectNodes = gridApi.getSelectedNodes();
        if (selectNodes.length === 0) {
            return alert("선택하셈")
        }else{
            customerSearchClick();
        }
    };

    const customerSearchClick = () => {
        setSearchOpenDialog(true);
    };

    const close = () => {
        setSearchOpenDialog(false);
        const rows = gridApi.getSelectedRows();
        gridApi.updateRowData({remove:rows});
    };

    const onClicked = () => {
        const param = {
            searchDateCondition: condition,
            startDate: startDate,
            endDate: endDate
        }
        outsoutcInfoListFetch(param);
    };

    function onGridReadyEstimateDetail(params) {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    }

    const onClicked2 = useCallback(() =>{
        console.log(sessionStorage.getItem('empCodeInfo_token'));
        console.log(seq);
    },[seq]);

    useEffect(() => {
        let seq = localStorage.getItem('seq');
        if(!seq){
            seq = 0;
        }else{
            seq++; 
        }
        localStorage.setItem('seq', seq);
        console.log(localStorage.getItem('seq'));
        setSeq(seq);
    },[]);

    useEffect(() => {
        setId(sessionStorage.getItem('empCodeInfo_token'));
    },[]);

    const forwardTempDelete = useCallback(() => {

        Axios.delete('http://localhost:8282/logi/outsourc/forwardTempDelete', {
            params: {
                id: id,
                seq: seq
            }
        })

    },[id, seq]);

    window.onbeforeunload = useCallback(() =>{
        forwardTempDelete();
    },[forwardTempDelete]);
    
    return (
        <>
            <div>
                <MyGrid
                    column={column}
                    title={'외주 자재 출고 필요 리스트 ( MRP 취합 기반 )'}
                    list={outsoutcInfoList.data?outsoutcInfoList.data.gridRowJson:null}
                    onRowSelected={onRowSelected}
                    rowSelection="single"
                    size={size}
                    api={onGridReadyEstimateDetail}
                >
                      <div align="left" style={{ float: 'left' }}>
                    <RadioGroup
                        row
                        aria-label="searchDateCondition"
                        name="searchDateCondition"
                        defaultValue="claimDate"
                    >
                        <FormControlLabel
                            value="claimDate"
                            control={<Radio />}
                            label="발주/작업지시 기한"
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                            onChange={conditionChange}
                        />
                        <FormControlLabel
                            value="dueDate"
                            control={<Radio />}
                            label="발주/작업지시 완료기한"
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                            onChange={conditionChange}
                        />
                    </RadioGroup>
                </div>

                    <MyCalendar onChangeDate={onChangeDate} basicInfo={basicInfo}/>
                    <Button variant="contained" color="secondary"  onClick={onClick}>
                    외주 자재 출고 모의전개
                    </Button>
                    <Button variant="contained" color="secondary"  onClick={onClicked}>
                    외주 자재 출고 필요 목록조회
                    </Button>
                    <Button variant="contained" color="secondary"  onClick={onClicked2}>
                    로컬스토리지 확인하기
                    </Button>
                </MyGrid>
                <MyDialog open={searchOpenDialog} close={close} maxWidth={'200px'}
                forwardTempDelete={forwardTempDelete}>
                    <ForwardOrderDialog 
                    data={data} 
                    id={sessionStorage.getItem('empCodeInfo_token')}
                    seq={seq}
                    close={close} 
                    setList={setList}
                    gridApi={gridApi}
                    />
                </MyDialog>
            </div>
        </>
    );
}

export default Forward;
