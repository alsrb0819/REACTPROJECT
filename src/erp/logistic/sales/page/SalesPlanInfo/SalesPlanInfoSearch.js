import { Button, FormGroup } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyGrid from 'util/LogiUtil/MyGrid';
import moment from 'moment';
import Axios from 'axios';
import SalesPlanItemDialog from './SalesPlanItemDialog';
import SalesPlanSumDialog from './SalesPlanSumDialog';
import $ from 'jquery';
import jQuery from 'jquery';
import { AlternateEmailRounded } from '@material-ui/icons';
import { getDatePicker } from 'erp/hr/util/datePicker';

function SalesPlanInfoSearch(props) {
    const [list, setList] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [grid, setGrid] = useState();
    const [ItemRow, setItemRow] = useState('');
    const [sumRow, setSumRow] = useState('');
    const [nodeid, setNodeId] = useState('');
    const [salesPlanItemDialog, setSalesPlanItemDialog] = useState(false);
    const [salesPlanSumDialog, setSalesPlanSumDialog] = useState(false);
    const [size, setSize] = useState('50vh');

    const [sumOpen, setSumOpen] = useState('');

    //다이알로그에서 가져온 값
    const [selCustomer, setSelCutomer] = useState({
        detailCodeName: '',
        detailCode: ''
    });

    const onChangeDate = e => {
        console.log(e);
        if (e.target.id === 'startDate') {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }
    };

    console.log();
    const column = {
        columnDefs: [
            { headerName: '', field: 'check', width: 50, checkboxSelection: true },
            { headerName: '판매계획일련번호', field: 'salesPlanNo' },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfSales' },
            {
                headerName: '판매계획일',
                field: 'salesPlanDate',
                editable: true,
                cellEditor: 'datePicker'
            },
            { headerName: '계획수량', field: 'salesAmount' },
            { headerName: '계획단가', field: 'unitPriceOfSales' },
            { headerName: '합계액', field: 'sumPriceOfSales' },
            {
                headerName: '판매마감일',
                field: 'dueDateOfSales',
                editable: true,
                cellEditor: 'datePicker'
            },
            { headerName: 'MPS 적용여부', field: 'mpsApplyStatus' },
            { headerName: '비고', field: 'description', editable: true },
            { headerName: 'stauts', field: 'stauts', hide: true }
        ]
    };

    const addBtn = () => {
        const newItem = NewRowData(); //새로운 row를 변수에담음
        grid.updateRowData({ add: [newItem], addIndex: '' }); // ag그리드 api로 그리드에 add 함
    };
    //추가할 컬럼 선언
    const NewRowData = () => {
        let newData = {
            salesPlanNo: '지정시 저장됨',
            itemCode: '',
            itemName: '',
            unitOfSales: 'EA',
            salesPlanDate: '',
            salesAmount: '0',
            unitPriceOfSales: '0',
            sumPriceOfSales: '0',
            dueDateOfSales: '',
            mpsApplyStatus: '',
            description: '',
            stauts: ''
        };
        return newData;
    };
    const onCellClicked = e => {
        console.log(e);
        if (e.colDef.field === 'itemName' || e.colDef.field === 'itemCode') {
            setNodeId(e.rowIndex);
            setSalesPlanItemDialog(true);
        }
        if (
            e.colDef.field === 'salesAmount' ||
            e.colDef.field === 'unitPriceOfSales' ||
            e.colDef.field === 'sumPriceOfSales'
        ) {
            setNodeId(e.rowIndex);
            setSalesPlanSumDialog(true);
        }
    };
    const salesPlanItemClose = value => {
        console.log(value);
        setSalesPlanItemDialog(false);
        if (value.data === undefined) {
            return;
        } else {
            setItemRow(value.data);
            console.log(value.data, '@#@##@');
        }
    };
    const salesPlanSumClose = value => {
        console.log(value);
        setSalesPlanSumDialog(false);
        if (value.data === undefined) {
            return;
        } else {
            setSumRow(value.data);
            console.log(value.data, '!!!@#@##@');
        }
    };

    const salesPlanSearch = () => {
        console.log(startDate + 'StartDate');

        Axios.get('http://localhost:8282/logi/sales/searchSalesPlan', {
            params: {
                startDate: startDate,
                endDate: endDate,
                salesPlanDate: 'salesPlanDate'
            }
        })
            .then(response => {
                setList(response.data.gridRowJson);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const onSubmit = () => {
        let selectedRows = grid.getSelectedRows();
        if (selectedRows.length === 0) {
            alert('체크박스 선택 바랍니다');
            return;
        }
        if (
            selectedRows[0].itemCode === undefined ||
            selectedRows[0].itemCode === '' ||
            selectedRows[0].salesPlanDate === undefined ||
            selectedRows[0].salesPlanDate === '' ||
            selectedRows[0].salesAmount === undefined ||
            selectedRows[0].salesAmount === '' ||
            selectedRows[0].dueDateOfSales === undefined ||
            selectedRows[0].dueDateOfSales === ''
        ) {
            alert('빈칸기입하시오');
            return;
        }
        if (selectedRows[0].salesPlanNo === '지정시 저장됨') {
            selectedRows[0].status = 'INSERT';
        } else {
            if (selectedRows[0].mpsApplyStatus === 'Y') {
                alert('MPS 적용 된것은 변경 못합니다');
                return;
            }
            selectedRows[0].status = 'UPDATE';
        }
        submit(selectedRows[0]);
    };
    const removeBtn = () => {
        let selectedRows = grid.getSelectedRows();
        if (selectedRows.length === 0) {
            alert('체크박스 선택 바랍니다');
            return;
        }
        if (selectedRows[0].mpsApplyStatus === 'Y') {
            alert('MPS 적용 된것은 삭제 못합니다');
            return;
        } else {
            selectedRows[0].status = 'DELETE';
            submit(selectedRows[0]);
        }
    };
    const submit = data1 => {
        Axios.post('http://localhost:8282/logi/sales/batchSalesPlanListProcess', data1)
            .then(response => {
                setList(response.data.gridRowJson);
            })
            .catch(e => {
                console.log(e);
            });
        alert('완료 되었습니다');
    };
    const api = params => {
        setGrid(params.api);
    };

    const basicInfo = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    useEffect(() => {
        console.log('Ddddd', ItemRow);
        if (ItemRow[0] !== undefined) {
            let itemsToUpdate = [];
            grid.forEachNodeAfterFilterAndSort(function(rowNode, index) {
                console.log('##:::' + sumRow.amount);
                let rowData = rowNode.data;
                if (index !== nodeid) {
                    return;
                }

                rowData.itemCode = ItemRow[0].detailCode;
                rowData.itemName = ItemRow[0].detailCodeName;

                if (sumRow.amount !== undefined) {
                    rowData.salesAmount = sumRow.amount;
                    rowData.unitPriceOfSales = sumRow.price;
                    rowData.sumPriceOfSales = sumRow.sumPrice;
                }
                itemsToUpdate.push(rowData);
                setSumOpen(ItemRow[0].detailCode);
            });
            console.log(itemsToUpdate, 'itemsToUpdate');
            grid.updateRowData({ update: itemsToUpdate }); // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
        }
    }, [ItemRow, sumRow]);

    return (
        <>
            <div>
                <SalesPlanItemDialog open={salesPlanItemDialog} close={salesPlanItemClose} />
                <SalesPlanSumDialog
                    open={salesPlanSumDialog}
                    value={sumOpen}
                    close={salesPlanSumClose}
                />
                <MyGrid
                    column={column}
                    title={'판매 계획'}
                    list={list}
                    onCellClicked={onCellClicked}
                    components={{ datePicker: getDatePicker() }}
                    rowSelection="single"
                    size={size}
                    api={api}
                >
                    <div style={{ float: 'left' }}>
                        <FormGroup row>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ marginRight: '1vh', marginTop: '1vh' }}
                                onClick={addBtn}
                            >
                                새로운 계획 추가
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ marginRight: '1vh', marginTop: '1vh' }}
                                onClick={removeBtn}
                            >
                                삭제
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ marginRight: '1vh', marginTop: '1vh' }}
                                onClick={onSubmit}
                            >
                                저장
                            </Button>
                        </FormGroup>
                    </div>
                    <MyCalendar onChangeDate={onChangeDate} basicInfo={basicInfo} />
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh', marginTop: '1vh' }}
                        onClick={salesPlanSearch}
                    >
                        조회
                    </Button>
                </MyGrid>
            </div>
        </>
    );
}

export default SalesPlanInfoSearch;
