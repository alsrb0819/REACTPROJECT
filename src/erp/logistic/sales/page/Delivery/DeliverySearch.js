import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    makeStyles,
    TextField
} from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyDialog from 'util/LogiUtil/MyDialog';
import MyGrid from 'util/LogiUtil/MyGrid';
import moment from 'moment';
import CustomerSearchDialog from '../Contract/CustomerSearchDialog';
import Axios from 'axios';
import DeliveryDetailGrid from './DeliveryDetailGrid';
import Swal from "sweetalert2";

function DeliverySearch(props) {
    const [list, setList] = useState([]);
    const [detailList, setDetailList] = useState([]);
    let today = moment(new Date()).format('yyyy-MM-DD');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [size, setSize] = useState('50vh');
    const [customerSearch, setCustomerSearch] = useState(false);
    const [dateSearch, setDateSearch] = useState(true);
    const [searchOpenDialog, setSearchOpenDialog] = useState(false);
    const [selDelivery, setSelDelivery] = useState();
    const [contractDetailNo, setContractDetailNo] = useState();
    const [deliveryGrid, setDeliveryGrid] = useState();
    const [deliveryDetailGrid, setDeliveryDetailGrid] = useState();

    //다이알로그에서 가져온 값
    const [selCustomer, setSelCutomer] = useState({
        detailCodeName: '',
        detailCode: ''
    });

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
            { headerName: '비고', field: 'description' }
        ]
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

    const onCellClicked = param => {
        //console.log(param.data.contractDetailTOList)
        setDetailList(param.data.contractDetailTOList);
        setSelDelivery('select');
        setSize('30vh');
        deliveryGrid.sizeColumnsToFit();

        if(deliveryDetailGrid){
            deliveryDetailGrid.setRowData(param.data.contractDetailTOList);
        }
    };

    const onChangeDate = e => {
        //console.log(e);
        if (e.target.id === 'startDate') {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }
    };

    const onDialogCellClicked = params => {
        setSelCutomer({
            detailCodeName: params.data.detailCodeName,
            detailCode: params.data.detailCode
        });
    };

    const customerSearchClick = () => {
        setSearchOpenDialog(true);
    };

    const close = () => {
        setSearchOpenDialog(false);
    };

    const detailClose = () => {
        setSize('50vh');
        setSelDelivery();
        deliveryGrid.sizeColumnsToFit();
    };

    const updateDetail = contractDetailNo => {
        setContractDetailNo(contractDetailNo);
    };

    const delivery = useCallback(() => {
        if (contractDetailNo === undefined) {
            return alert('납품할 제품을 먼저 선택해주세요..');
        }

        if(deliveryDetailGrid.getSelectedRows()[0].deliveryCompletionStatus==='Y'){
            return Swal.fire({
                icon: "error",
                text: "이미 발주된 항목입니다.",
              });
        }


        Axios.get('http://localhost:8282/logi/logistics/sales/deliver', {
            params: {
                contractDetailNo: contractDetailNo
            }
        })
            .then(response => {
                if (parseInt(response.data.errorCode) === 0) {
                    window.alert(response.data.errorMsg);
                }
            })
            .catch(e => {
                console.log(e);
            });

            deliveryDetailGrid.setRowData(null);
            deliveryGrid.setRowData(null);

    },[contractDetailNo, deliveryDetailGrid, deliveryGrid]);
    const api = params => {
        setDeliveryGrid(params.api);
    };

    const detailApi = params => {
        setDeliveryDetailGrid(params.api);
        
    };

    const basicInfo = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const deliverySearch = useCallback(() => {
        if (customerSearch === true) {
            var param = {
                startDate: 'null',
                endDate: 'null',
                searchCondition: 'searchByCustomer',
                customerCode: selCustomer.detailCode
            };
        }
        if (dateSearch === true) {
            var param = {
                startDate: startDate,
                endDate: endDate,
                searchCondition: 'searchByDate',
                customerCode: 'null'
            };
        }
        Axios.get('http://localhost:8282/logi/logistics/sales/searchDeliverableContractList', {
            params: param
        })
            .then(response => {
                setList(response.data.gridRowJson);
                
                if(deliveryGrid){
                    deliveryGrid.setRowData(response.data.gridRowJson);
                }
            })
            .catch(e => {
                console.log(e);
            });
    },[customerSearch, dateSearch, endDate, list, selCustomer.detailCode, startDate]);

    return (
        <div>
            <MyGrid
                column={column}
                title={'수주 조회'}
                list={list}
                onCellClicked={onCellClicked}
                rowSelection="single"
                size={size}
                api={api}
            >
                <div style={{ float: 'left' }}>
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
                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                    onClick={deliverySearch}
                >
                    조회
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: '1vh' }}
                    onClick={delivery}
                >
                    납품
                </Button>
            </MyGrid>
            {selDelivery === undefined ? (
                ''
            ) : (
                <DeliveryDetailGrid
                    list={detailList}
                    detailClose={detailClose}
                    updateDetail={updateDetail}
                    detailApi={detailApi}
                />
            )}
            <MyDialog open={searchOpenDialog} close={close}>
                <CustomerSearchDialog close={close} onCellClicked={onDialogCellClicked} />
            </MyDialog>
        </div>
    );
}

export default DeliverySearch;
