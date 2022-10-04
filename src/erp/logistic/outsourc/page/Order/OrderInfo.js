import React, { useState, useCallback } from 'react';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyGrid from 'util/LogiUtil/MyGrid';
import { Button } from '@material-ui/core';
import { getDatePicker } from 'erp/hr/util/datePicker';
import { today } from 'erp/hr/util/lib';
import Swal from 'sweetalert2';
import OutSourcInfoColumn from './OutSourcInfoColumn';
import useAsync from 'util/useAsync';
import moment from 'moment';
import * as api from '../../api';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";

const OrderInfo = () => {

    let today = moment(new Date()).format('yyyy-MM-DD');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [condition, setCondition] = useState('claimDate');

    const [outsoutcInfoList, outsourcInfoListFetch] = useAsync((param) =>api.searchOutsourcInfoList(param), [], true);

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

    const onClicked = useCallback(() =>{
        const param = {
            searchDateCondition: condition,
            startDate: startDate,
            endDate: endDate
        }
       outsourcInfoListFetch(param);

    },[condition, endDate, outsourcInfoListFetch, startDate]);

    const conditionChange = e => {
        setCondition(e.target.value);
    };

    return (
        <>
            <MyGrid
                column={OutSourcInfoColumn}
                title={'외주 발주 조회'}
                onCellClicked={undefined}
                rowSelection="single"
                components={{ datePicker: getDatePicker() }}
                list={outsoutcInfoList.data?outsoutcInfoList.data.gridRowJson:null}
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
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                    onClick={onClicked}
                >
                    외주 발주 조회
                </Button>
            </MyGrid>
        </>
    );
};

export default OrderInfo;