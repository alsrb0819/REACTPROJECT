//2020-12-04 64기 정준혁
import React, { useState, useCallback } from 'react';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyGrid from 'util/LogiUtil/MyGrid';
import { Button } from '@material-ui/core';
import contractListColumn from './contractListColumn';
import { searchContractDetailInMpsAvailable, convertContractDetailToMps } from './mpsAxios';
import { getDatePicker } from 'erp/hr/util/datePicker';
import { today } from 'erp/hr/util/lib';
import Swal from 'sweetalert2';
import MyDialog from 'util/LogiUtil/MyDialog';
import MpsDialog from './MpsDialog';
const MpsContainer = () => {
    const [contractList, setContractList] = useState([]);
    const [contractGridApi, setcontractGridApi] = useState();
    const [calendarDate, setCalendarDate] = useState({
        startDate: today,
        endDate: today
    });
    const [mpsDialog, setMpsDialog] = useState(false);
    const onChangeDate = e => {
        let nextCalendarDate = { ...calendarDate };
        nextCalendarDate[e.target.id] = e.target.value;
        setCalendarDate(nextCalendarDate);
    };

    const onClickSearchContract = useCallback(() => {
        searchContractDetailInMpsAvailable(setContractList, calendarDate);
    }, [calendarDate]);

    const orderGirdApi = params => {
        setcontractGridApi(params.api);
    };

    const onClickMpsInsert = () => {
        let selectNodes = contractGridApi.getSelectedNodes();
        if (selectNodes.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: '조회부터하셈'
            });
        }
        let row = selectNodes[0].data;
        if (
            row.mpsPlanDate === null ||
            row.scheduledEndDate === null ||
            row.mpsPlanDate === '' ||
            row.scheduledEndDate === ''
        ) {
            return Swal.fire({
                icon: 'error',
                title: '계획일자,출하예정일 \r\n 값을 입력해주세요'
            });
        }

        let newRow = {...row, planClassification : '수주상세'};

        console.log("newRow");
        console.log(newRow);
        console.log(selectNodes);
        convertContractDetailToMps(newRow);
        let selectRows = contractGridApi.getSelectedRows();
        contractGridApi.updateRowData({remove:selectRows});
    };

    const onClickSearchMps = () => {
        setMpsDialog(true);
    };

    const mpsClose = () => {
        setMpsDialog(false);
    };
    return (
        <>
            <MyGrid
                column={contractListColumn}
                title={'MPS 등록'}
                list={contractList}
                onCellClicked={undefined}
                rowSelection="single"
                api={orderGirdApi}
                components={{ datePicker: getDatePicker() }}
            >
                <div style={{ float: 'left' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh', marginTop: '1vh' }}
                        onClick={onClickMpsInsert}
                    >
                        MPS 등록
                    </Button>
                </div>
                <MyCalendar onChangeDate={onChangeDate} />
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                    onClick={onClickSearchContract}
                >
                    MPS등록 가능 조회
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                    onClick={onClickSearchMps}
                >
                    MPS 조회
                </Button>
            </MyGrid>

            <MyDialog open={mpsDialog} close={mpsClose} maxWidth={'150%'}>
                <div>
                    <MpsDialog calendarDate={calendarDate} />
                </div>
            </MyDialog>
        </>
    );
};

export default MpsContainer;
