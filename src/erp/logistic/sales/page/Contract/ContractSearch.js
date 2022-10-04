import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyGrid from 'util/LogiUtil/MyGrid';
import MyDialog from 'util/LogiUtil/MyDialog';
import moment from 'moment';
import Axios from 'axios';
import CustomerSearchDialog from './CustomerSearchDialog';
import ContractDetailSearch from './ContractDetailSearch';
import * as api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';

function ContractSearch(props) {
    const [list, setList] = useState([]);
    const [selList, setSelList] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [customerSearch, setCustomerSearch] = useState(false);
    const [dateSearch, setDateSearch] = useState(true);
    const [searchOpenDialog, setSearchOpenDialog] = useState(false);
    const [selContract, setSelContract] = useState();
    const [size, setSize] = useState('calc(100vh - 290px)');

    //다이알로그에서 가져온 값
    const [selCustomer, setSelCutomer] = useState({
        detailCodeName: '',
        detailCode: ''
    });

    const onChangeDate = e => {
        console.log(e);
        if (e.target.id === 'startDate') {
            setStartDate(e.target.value);
        }
        if (e.target.id === 'endDate') {
            setEndDate(e.target.value);
        }
    };

    const column = {
        columnDefs: [
            { headerName: '수주번호', field: 'contractNo' },
            { headerName: '견적번호', field: 'estimateNo' },
            { headerName: '유형', field: 'contractTypeName' },
            { headerName: '거래처코드', field: 'customerCode', hide: true },
            { headerName: '거래처명', field: 'customerName' },
            { headerName: '견적일자', field: 'contractDate', hide: true },
            { headerName: '수주일자', field: 'contractDate' },
            { headerName: '수주요청자', field: 'contractRequester' },
            { headerName: '수주담당자명', field: 'empNameInCharge' },
            { headerName: '비고', field: 'description' },
            { headerName: '납품완료여부', field: 'deliveryCompletionStatus' },
            { headerName: 'contractType', field: 'contractType', hide: true },
            { headerName: 'personCodeInCharge', field: 'personCodeInCharge', hide: true }
        ]
    };

    const onDialogCellClicked = params => {
        setSelCutomer({
            detailCodeName: params.data.detailCodeName,
            detailCode: params.data.detailCode
        });
    };

    const [detailList, searchDetailListFetch] = 
    useAsync((param) =>api.searchDetailList(param), [], true);
    const onCellClicked = params => {
        setSelContract(params.data.contractNo);
        setSelList([params.data]);

        searchDetailListFetch(params);
        
        setSize('30vh');
        params.api.sizeColumnsToFit();
    };

    const detailClose = () => {
        setSize('calc(100vh - 290px)');
        setSelContract();
    };

    const customerSearchClick = () => {
        setSearchOpenDialog(true);
    };

    const close = () => {
        setSearchOpenDialog(false);
    };

    const basicInfo = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const checkBoxChange = e => {
        if (e.target.name === 'customerSearch') {
            setCustomerSearch(true);
            setDateSearch(false);
        }
        if (e.target.name === 'dateSearch') {
            setCustomerSearch(false);
            setDateSearch(true);
        }
    };

    const [contractList, searchContractFetch] = 
    useAsync(param => api.searchContractList(param),[],true);
    const contractSearch = () => {
        let param;
        if (customerSearch === true) {
            param = {
                startDate: 'null',
                endDate: 'null',
                searchCondition: 'searchByCustomer',
                customerCode: selCustomer.detailCode
            };
        }
        if (dateSearch === true) {
            param = {
                startDate: startDate,
                endDate: endDate,
                searchCondition: 'searchByDate',
                customerCode: 'null'
            };
        }

        searchContractFetch(param);
    };

    return (
        <>
            <div>
                <MyGrid
                    column={column}
                    title={'수주 조회'}
                    list={contractList.data ? contractList.data.gridRowJson : null}
                    onCellClicked={onCellClicked}
                    rowSelection="single"
                    size={size}
                >
                    <div style={{ float: 'left', paddingTop: '1vh' }}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={customerSearch}
                                        onChange={checkBoxChange}
                                        name="customerSearch"
                                    />
                                }
                                label="거래처명"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={dateSearch}
                                        onChange={checkBoxChange}
                                        name="dateSearch"
                                    />
                                }
                                label="날짜"
                            />
                        </FormGroup>
                    </div>
                    {dateSearch === true ? (
                        <MyCalendar onChangeDate={onChangeDate} basicInfo={basicInfo} />
                    ) : (
                        <TextField
                            id="customerName"
                            label="거래처명"
                            value={selCustomer.detailCodeName}
                            style={{ marginRight: '1vw' }}
                            disabled
                            onClick={customerSearchClick}
                        />
                    )}
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: '1vh' }}
                        onClick={contractSearch}
                    >
                        조회
                    </Button>
                </MyGrid>
                {selContract === undefined ? (
                    ''
                ) : (
                    <ContractDetailSearch list={detailList.data ? detailList.data.gridRowJson : null} detailClose={detailClose} />
                )}
                <MyDialog open={searchOpenDialog} close={close}>
                    <CustomerSearchDialog close={close} onCellClicked={onDialogCellClicked} />
                </MyDialog>
            </div>
        </>
    );
}

export default ContractSearch;
