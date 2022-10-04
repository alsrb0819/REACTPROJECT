import React, { useState } from 'react';
import { connect } from 'react-redux';
import Combine from './Combine';

import {
    selectSlipStart,
    deleteSlipStart,
    saveJournalStart,
    updateSlipStart, //전표
    selectJournalStart,
    deleteJournalStart,
    updateJournalStart, //분개
    searchJournalDetailStart,
    saveJournalDetailStart //분개상세
} from '../../reducer/AccountReducer';
import { closeSalaryWithSlipRequest } from 'erp/hr/salary/saga/CloseSalarySaga'; //임금 2020-11-19 박미노
import { deliveryDivisionStart } from 'erp/logistic/sales/action/SalesAction'; //납품 2021-06-22 PGW
import { orderDivisionStart } from 'erp/logistic/sales/action/SalesAction'; //발주 2021-06-22 PGW
//=================================================== 2020-09-10 조편백 일반전표 컨테이너 =========================================

const Container = ({
    selectSlipStart,
    slipFormList,
    saveJournalStart,
    updateSlipStart,
    deleteSlipStart, //전표
    selectJournalStart,
    journalList,
    deleteJournalStart,
    updateJournalStart, //분개
    searchJournalDetailStart,
    journalDetailList,
    saveJournalDetailStart, //분개상세
    closeSalaryWithSlipRequest,
    deliveryDivisionStart,
    orderDivisionStart,
    error
}) => {
    const [visibleState, setVisibleState] = useState(true); //분개추가버튼 활성화 비활성화
    const [silpRow, setSilpRow] = useState(); //선택한 전표그리드 Row

    //=============================전표==========================
    const handleSearchSlip = (startDate, endDate, slipStatus) => {
        //console.log("컨테이너 -> 전표조회 ");
        selectSlipStart({
            startDate: startDate,
            endDate: endDate,
            slipStatus: slipStatus
        });
    };
    const handleDeleteSlip = slipNo => {
        //console.log("컨테이너 -> 전표삭제 " + slipNo);
        deleteSlipStart({ slipNo: slipNo });
    };
    const handleUpdateSlip = (slipType, expenseReport, slipNo) => {
        //console.log("컨테이너  -> 전표 update " + slipType, expenseReport, slipNo)
        updateSlipStart({
            slipType: slipType,
            expenseReport: expenseReport,
            slipNo: slipNo
        });
    };
    //=============================분개==========================
    const handleSearchJournal = slipNo => {
        // console.log("컨테이너 -> 분개 " + slipNo);
        selectJournalStart({ slipNo: slipNo });
    };
    const handleDeleteJournal = (slipNo, journalNo) => {
        // console.log("컨테이너  -> 분개 삭제" + slipNo, journalNo)
        deleteJournalStart({ slipNo: slipNo, journalNo: journalNo });
    };
    const handleSaveJournal = slipData => {
        console.log('컨테이너 -> 분개저장 insert ', slipData);
        saveJournalStart({ slipData: slipData });
    };
    const handleUpdateJournal = updateJournalList => {
        console.log('컨테이너  -> 분개 저장 update' + JSON.stringify(updateJournalList));
        updateJournalStart({ updateJournalList: updateJournalList });
    };
    //=============================분개상세==========================
    const handleSearchJournalDetail = journalNo => {
        //console.log("컨테이너  -> 분개 상세" + journalNo)
        searchJournalDetailStart({ journalNo: journalNo });
    };
    const handlSaveJournalDetailList = SaveJournalDetailList => {
        //console.log("컨테이너 -> 분개상세저장 " + JSON.stringify(SaveJournalDetailList));
        saveJournalDetailStart({ SaveJournalDetailList: SaveJournalDetailList });
    };
    //임금 인설트 박미노===========================================================
    const handlCloseSalaryWithSlipRequest = salaryInsert => {
        console.log('salaryInsert', salaryInsert);
        closeSalaryWithSlipRequest({ empcode1: salaryInsert });
    };
    //납품 인설트 박미노===========================================================
    const handlCloseDeliveryWithStart = DeliveryInsert => {
        console.log('DeliveryInsert', DeliveryInsert);
        deliveryDivisionStart({ DeliveryInsert: DeliveryInsert });
    };
    const handlCloseOrderWithStart = OrderInsert => {
        console.log('OrderInsert', OrderInsert);
        orderDivisionStart({ OrderInsert: OrderInsert });
    };
    return (
        <div>
            <Combine
                handleSearchSlip={handleSearchSlip} //전표조회
                slipFormList={slipFormList} //전표조회 리듀서
                handleDeleteSlip={handleDeleteSlip} //전표삭제
                handleSearchJournal={handleSearchJournal} //분개조회
                journalList={journalList} //분개 조회 리듀서
                setVisibleState={setVisibleState} //버튼값담는 함수
                visibleState={visibleState} //버튼 true,false
                setSilpRow={setSilpRow} //전표List담는 함수  ( 추가,수정된 내용도있어서 또 담아줌 분개에서 유효성검사해야함 )
                silpRow={silpRow} //전표그리드에 선택한 ROW 한줄
                handleDeleteJournal={handleDeleteJournal} //분개 삭제
                handleSearchJournalDetail={handleSearchJournalDetail} //분개상세조회
                journalDetailList={journalDetailList} //분개상세 조회 리듀서
                handleUpdateSlip={handleUpdateSlip} //전표 update
                handleSaveJournal={handleSaveJournal} //분개저장 (1:N) 전표:분개1,분개2,분개3,분개4
                handlSaveJournalDetailList={handlSaveJournalDetailList}
                handleUpdateJournal={handleUpdateJournal}
                handlCloseSalaryWithSlipRequest={handlCloseSalaryWithSlipRequest}
                handlCloseDeliveryWithStart={handlCloseDeliveryWithStart}
                handlCloseOrderWithStart={handlCloseOrderWithStart}
            ></Combine>
        </div>
    );
};
const mapStateToProps = state => {
    console.log('분개 리턴 컨테이너' + JSON.stringify(state.AccReducer.AccountReducer.journalList));
    return {
        slipFormList: state.AccReducer.AccountReducer.slipFormList,
        journalList: state.AccReducer.AccountReducer.journalList,
        error: state.AccReducer.AccountReducer.error,
        journalDetailList: state.AccReducer.AccountReducer.journalDetailList
       
    };
};
export default connect(mapStateToProps, {
    selectSlipStart,
    deleteSlipStart,
    updateSlipStart,
    saveJournalStart,
    selectJournalStart,
    deleteJournalStart,
    updateJournalStart,
    searchJournalDetailStart,
    saveJournalDetailStart,
    closeSalaryWithSlipRequest,
    deliveryDivisionStart,
    orderDivisionStart
})(Container);
