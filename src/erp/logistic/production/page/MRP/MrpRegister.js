import React, { useState, useCallback, memo, useEffect } from 'react';
import {
    Paper,
    TextField,
    Button,
    Grid,
    AppBar,
    InputLabel,
    Typography,
    Toolbar,
    MenuItem,
    Select,
    FormControl,
    OutlinedInput,
    NativeSelect
} from '@material-ui/core';
import axios from 'axios';
import UseStyles from './UseStyles';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import useInput from 'util/useInput';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import mpsColumn from './MpsColumn';
import { today } from 'erp/hr/util/lib';
import { useThemeSwitcher } from 'mui-theme-switcher';
import MyDialog from 'util/LogiUtil/MyDialog';
import MrpDialog from './MrpDialog';
import Swal from 'sweetalert2';

const MrpRegister = props => {
    console.log(today);
    const classes = UseStyles();
    const fromDate = useInput(today);
    const toDate = useInput(today);
    const columnDefs = mpsColumn;
    const [rowData, setRowData] = useState(null);
    const [checkData, setCheckData] = useState(null);
    const [mrpDialog, setMrpDialog] = useState(false);
    const [gridApi, setGridApi] = useState(null);

    const searchMps = useCallback(() => {
        if (fromDate.value == '' || toDate.value == '') {
            Swal.fire('알림', ' MRP 조회할 일정을 입력해주세요.', 'info');
            return;
        }

        props.searchMpsList({ startDate: fromDate.value, endDate: toDate.value });

    },[fromDate.value, props, toDate.value]);

    useEffect(()=>{
        setRowData(props.MrpList);
    },[props.MrpList])

    const mrpRegister = useCallback(() => {
        console.log(checkData);

        if (!checkData) {
            Swal.fire('알림', '모의전개할 mps를 선택하십시오.', 'info');
            return;
        }

        setMrpDialog(true);
    },[checkData]);

    const mrpClose = () => {
        setMrpDialog(false);
    };

    const onRowSelected = useCallback(e => {
        setCheckData(e.api.getSelectedRows());
        console.log(checkData);
    }, [checkData]);

    const { dark } = useThemeSwitcher();
    const onGridSizeChanged = params => {
        var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
        var columnsToShow = [];
        var columnsToHide = [];
        var totalColsWidth = 0;
        var allColumns = params.columnApi.getAllColumns();
        for (var i = 0; i < allColumns.length; i++) {
            var column = allColumns[i];
            totalColsWidth += column.getMinWidth();
            // console.log('totalColsWidth',totalColsWidth)
            if (column.colDef.hide === true) {
                //if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.colId);
                //}
            } else {
                columnsToShow.push(column.colId);
            }
        }
        params.columnApi.setColumnsVisible(columnsToShow, true);
        params.columnApi.setColumnsVisible(columnsToHide, false);
        params.api.sizeColumnsToFit();
        // console.log('columnsToHide',columnsToHide)
        //console.log('columnsToShow',columnsToShow)
    };

    const onGridReady = useCallback(event => {
        console.log("onGridReady");
        setGridApi(event.api);
        setRowData([]);
        event.api.sizeColumnsToFit();

    },[]);


    return (
        <Grid item xs={12}>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h5">MRP주생산계획</Typography>
                </Toolbar>
            </AppBar>
            <br />
            <div id="grid-wrapper">
                <FormControl variant="outlined" className={classes.searchTextField}></FormControl>
                <TextField
                    id={'fromDate'}
                    label={'신청일자'}
                    type={'date'}
                    defaultValue={fromDate.value}
                    onChange={fromDate.onChange}
                    className={classes.textField}
                    variant="outlined"
                />
                ~
                <TextField
                    id={'toDate'}
                    label={'신청일자'}
                    type={'date'}
                    defaultValue={toDate.value}
                    onChange={toDate.onChange}
                    className={classes.textField}
                    variant="outlined"
                />
                <Button
                    variant={'contained'}
                    color={'primary'}
                    className={dark ? classes.whiteButton : classes.searchButton}
                    onClick={searchMps}
                >
                    MPS조회
                </Button>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    name={'confirm'}
                    onClick={mrpRegister}
                    className={dark ? classes.whiteButton : classes.searchButton}
                >
                    MRP모의전개
                </Button>
            </div>

            <br />
            <div
                className={dark ? 'ag-theme-alpine-dark' : 'ag-theme-material'}
                style={{
                    height: '400px',
                    width: '100%'
                }}
            >
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    onRowSelected={onRowSelected}
                    onGridSizeChanged={onGridSizeChanged}
                    //suppressRowClickSelection={'true'}
                    onGridReady={onGridReady}
                    rowSelection="single" //여러개선택가능
                />

                <MyDialog open={mrpDialog} close={mrpClose} maxWidth={'90%'}>
                    <div>
                        <MrpDialog
                            searchMrpList={props.searchMrpList}
                            checkData={checkData}
                            setCheckData={setCheckData}
                            MrpSimulatorList={props.MrpSimulatorList}
                            MrpRegisterList={props.MrpRegisterList}
                            mrpRegisterGridApi={gridApi}
                        />
                    </div>
                </MyDialog>
            </div>
        </Grid>
    );
};
export default MrpRegister;
