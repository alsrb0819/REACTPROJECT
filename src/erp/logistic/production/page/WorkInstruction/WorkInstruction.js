import { Button } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import MyDialog from 'util/LogiUtil/MyDialog';
import Axios from 'axios';
import WorkOrderDialog from './WorkOrderDialog';
import Swal from 'sweetalert2';

function WorkInstruction(props) {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    const [searchOpenDialog, setSearchOpenDialog] = useState(false);
    const [data, setData] = useState(null);
    const [workOderableGridApi, setWorkOderableGridApi] = useState(null);

    const column = {
        columnDefs: [
            {
                headerName: '소요량취합번호',
                field: 'mrpGatheringNo',
                suppressSizeToFit: true,
                headerCheckboxSelection: false,
                headerCheckboxSelectionFilteredOnly: true,
                suppressRowClickSelection: true,
                checkboxSelection: true
            },
            { headerName: '품목분류', field: 'itemClassification' },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfMrp' },
            { headerName: '필요수량', field: 'requiredAmount' },
            { headerName: '작업지시기한', field: 'orderDate' },
            { headerName: '작업완료기한', field: 'requiredDate' }
        ]
    };

    const onCellClicked = params => {
        console.log('onCellClicked');
        setData(params);
    };

    const workSimul = useCallback(() => {

        const data = workOderableGridApi.getSelectedRows()[0];

        setData(data);

        if(!data){
            return Swal.fire('오류','작업목록선택','error');
        }
        customerSearchClick();
    },[workOderableGridApi]);

    const customerSearchClick = () => {
        setSearchOpenDialog(true);
    };

    const close = () => {
        setSearchOpenDialog(false);
    };

    const contractSearch = () => {
        Axios.get('http://localhost:8282/logi/production/getWorkOrderableMrpList')
            .then(response => setList(response.data.result))
            .catch(e => {
                Swal.fire('오류', e, 'error');
            });
    };

    const orderGirdApi = params => {
        setWorkOderableGridApi(params.api);
    };

    return (
        <>
            <div>
                <MyGrid
                    column={column}
                    title={'작업지시 필요 리스트 ( MRP 취합 기반 )'}
                    list={list}
                    onCellClicked={onCellClicked}
                    rowSelection="single"
                    size={size}
                    api={orderGirdApi}
                >
                    <Button variant="contained" color="secondary" onClick={workSimul}
                                        style={{ marginRight: '1vh', marginTop: '1vh' }}
                                        >
                        작업지시모의전개
                    </Button>
                    <Button variant="contained" color="secondary" onClick={contractSearch}
                                        style={{ marginRight: '1vh', marginTop: '1vh' }}
                                        >
                        작업지시필요목록조회
                    </Button>
                </MyGrid>
                <MyDialog open={searchOpenDialog} close={close} maxWidth={'200px'}>
                    <WorkOrderDialog data={data} close={close} setList={setList}/>
                </MyDialog>
            </div>
        </>
    );
}

export default WorkInstruction
;
