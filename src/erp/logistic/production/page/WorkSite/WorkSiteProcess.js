import { Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import Axios from 'axios';
import WorkSiteSearch from './WorkSiteSearch';
import Swal from 'sweetalert2';

function WorkSiteProcess(props) {
    const [list, setList] = useState([]);
    const [clickedData, setClickedData] = useState();
    const [selWorkSite, setSelWorkSite] = useState();
    const [detailList, setDetailList] = useState([]);
    const [size, setSize] = useState('50vh');

    const column = {
        columnDefs: [
            { checkboxSelection: true, width: 30 },
            { headerName: '작업지시일련번호', field: 'workOrderNo', width: 250 },
            { headerName: '소요량취합번호', field: 'mrpGatheringNo', width: 250 },
            { headerName: '품목분류', field: 'itemClassification' },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfMrp' },
            { headerName: '생산공정코드', field: 'productionProcessCode', hide: true },
            { headerName: '생산공정명', field: 'productionProcessName' },
            { headerName: '작업장코드', field: 'workSiteCode', hide: true },
            { headerName: '작업장명', field: 'workStieName' },
            { headerName: '원재료검사', field: 'inspectionStatus' },
            { headerName: '제품제작', field: 'productionStatus' },
            { headerName: '제품검사', field: 'completionStatus' }
        ]
    };

    const onRowSelected = params => {
        if (params.node.selected) {
            console.log('params.data', params.node);
            setClickedData(params.data);
        } else if (!params.node.selected) {
            console.log('params.data선택안함', params.node);
            setClickedData();
        }
    };
    const errorMsg = val => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: val
        });
    };
    const examination = e => {
        var targetId = e.currentTarget.id;
        console.log('clickedData', clickedData);
        if (clickedData === undefined || clickedData === null) {
            errorMsg('체크 박스를 체크 한뒤 눌러주세요');
            return;
        }
        if (
            clickedData.inspectionStatus == 'Y' &&
            clickedData.productionStatus == 'Y' &&
            clickedData.completionStatus == 'Y'
        ) {
            errorMsg('모든 작업이 끝났습니다.<br>작업완료 등록을 해주세요');
            return;
        } else if (
            clickedData.inspectionStatus == 'Y' &&
            clickedData.productionStatus == 'Y' &&
            targetId == 'Production'
        ) {
            errorMsg('제품 제작은 끝났습니다.<br>판매제품 검사로 넘어가세요');
            return;
        } else if (clickedData.inspectionStatus == 'Y' && targetId == 'RawMaterials') {
            errorMsg('원재료 검사는 끝났습니다.<br>제품제작으로 넘어가세요');
            return;
        }

        if (clickedData.productionStatus != 'Y' && targetId == 'SiteExamine') {
            errorMsg('제품이 제작되지 않았습니다.제품제작 을 해주세요.');
            return;
        } else if (clickedData.inspectionStatus != 'Y' && targetId == 'Production') {
            errorMsg('원재료 검사가 시작되거나 끝나지 않았습니다.');
            return;
        }
        showWorkSite(targetId);
    };
    const showWorkSite = params => {
        console.log('clickedData', clickedData);
        setSelWorkSite(clickedData.workOrderNo);
        Axios.get('http://localhost:8282//logi/production/showWorkSiteSituation', {
            params: {
                workSiteCourse: params,
                workOrderNo: clickedData.workOrderNo,
                itemClassIfication: clickedData.itemClassification
            }
        })
            .then(response => {
                setDetailList(response.data.gridRowJson);
            })
            .catch(e => {
                console.log(e);
            });
        setSize('30vh');
    };

    const detailClose = () => {
        setSize('50vh');
        setSelWorkSite();
    };

    const workSiteSearch = () => {
        Axios.get('http://localhost:8282//logi/production/showWorkOrderInfoList')
            .then(response => {
                setList(response.data.gridRowJson);
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <>
            <div>
                <MyGrid
                    column={column}
                    title={'작업장'}
                    list={list}
                    onRowSelected={onRowSelected}
                    rowSelection="single"
                    size={size}
                >
                    <div style={{ float: 'left', paddingTop: '1vh' }}>
                        <Button variant="contained" color="secondary" onClick={workSiteSearch}>
                            작업장 조회
                        </Button>
                    </div>
                    <ButtonGroup variant="contained" color="secondary">
                        <Button onClick={examination} id="Production">
                            제품 제작
                        </Button>
                        <Button onClick={examination} id="SiteExamine">
                            판매 제품 검사
                        </Button>
                    </ButtonGroup>
                </MyGrid>
                {selWorkSite === undefined ? (
                    ''
                ) : (
                    <WorkSiteSearch
                        list={detailList}
                        detailClose={detailClose}
                        refresh={workSiteSearch}
                    />
                )}
            </div>
        </>
    );
}

export default WorkSiteProcess;
