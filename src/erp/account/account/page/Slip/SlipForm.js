import React, { useState } from "react";
import moment from "moment";
import useStyles from "./Theme";
import { AgGridReact } from "ag-grid-react";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../../reducer/AccountReducer";
import { useThemeSwitcher } from "mui-theme-switcher";
//import {handleSearchJournal} from './Combine';
//========================================== 2020-09-14 조편백 일반전표 전표 =========================================
const SlipForm = props => {
  let toDate = moment(new Date()).format("yyyy-MM-DD");

  const data = useSelector(({ AccReducer }) => AccReducer.AccountReducer.slipFormList);

  const theme = useStyles(); //CSS
  const dispatch = useDispatch();
  const [slipGrid, setSlipGrid] = useState([]); //그리드 동적 값

  //======================================== Grid cell 변경 유효성검사  =========================================
  // [품의내역] 수정시 승인상태가 승인,반려 면 text 편집못하게함
  const rowCellChanged = params => {
    console.log("slipStatus", params.data.slipStatus);
    if (
      params.data.slipStatus === "승인" ||
      params.data.slipStatus === "반려"
    ) {
      alert("  승인or 반려 전표는 수정이 불가능합니다  ");
      slipGrid.stopEditing(); //편집 중지
      return;
    }
  };
  //=================================== 전표 Grid row클릭시 분개 그리드 select ======================================
  const onCellClicked = params => {
    props.setVisibleState(false); //분개추가 버튼 비활성화, false가 활성화
    const selectedRows = params.api.getSelectedRows(); //선택한 전표 Grid row 1줄을 들고옴
    console.log("이것이것이것-"+selectedRows[0].slipNo)
    props.handleSearchJournal(selectedRows[0].slipNo); // 선택한 전표그리드 slipNo 로 분개 그리드 띄움
    console.log("selectedRows", selectedRows);
    dispatch({
      type: types.SELECT_JOURNAL_START,
      payload: {
        slipNo: selectedRows[0].slipNo,
      },
    });
    props.setSilpRow(selectedRows); //분개로 넘기는 전표Row

    //분개추가버튼 유효성 검사
    if (
      selectedRows[0].slipStatus === "승인" ||
      selectedRows[0].slipStatus === "반려"
    ) {
      props.setVisibleState(true); //분개추가 버튼 비활성화, false가 활성화
      //return;
    }
  };
  //=================================================== Grid컬럼선언 =========================================
  const column = {
    columnDefs: [
      { width: "60", headerCheckboxSelection: true, checkboxSelection: true }, //체크박스
      { width: "150", headerName: "기수일련번호", field: "accountPeriodNo" },
      { width: "250", headerName: "전표일련번호", field: "slipNo" },
      { headerName: "작성날짜", field: "reportingDate" },
      { headerName: "작성자코드", field: "reportingEmpCode" },
      { headerName: "품의내역", field: "expenseReport", editable: true }, // editable : 편집가능
      { headerName: "승인자", field: "reportingEmpName" },
      { headerName: "승인상태", field: "slipStatus" },
    ],
  };
  //=================================================== 전표추가 버튼   =========================================
  const addBtn = () => {
    slipGrid.selectAll(); // 그리드 전체 값
    const rows = slipGrid.getSelectedRows(); // 그리드의 모든 값을 반환
    //전표 추가갯수는 1개만가능하게끔 (그리드에 row가 있을때 if문 실행)
    // console.log(
    //   "dd",
    //   slipGrid.getDisplayedRowAtIndex(slipGrid.getLastDisplayedRow()).data,
    // );
    if (rows.length !== 0) {
      alert("전표는 한개만 등록가능합니다.");
      if (
        slipGrid.getDisplayedRowAtIndex(slipGrid.getLastDisplayedRow()).data
          .slipNo === "NEW"
      ) {
        return;
      }
    }
    const newItem = NewRowData(); //새로운 row를 변수에담음
    slipGrid.updateRowData({ add: [newItem], addIndex: "" }); // ag그리드 api로 그리드에 add 함
  };

  //추가할 컬럼 선언
  const NewRowData = () => {
    let newData = {
      slipNo: "NEW",
      accountPeriodNo: "5", //2020년은 기수일련번호 ->  4
      slipType: "결산",
      reportingDate: toDate,
      reportingEmpCode: sessionStorage.getItem("empCodeInfo_token"), //작성사코드
      expenseReport: "",
      approvalDate: "",
      reportingEmpName: sessionStorage.getItem("empNameInfo_token"), //로그인 이름
      slipStatus: "미결",
      deptCode: "DPT-01",
      status: "",
    };
    return newData;
  };

  //=================================================== 전표삭제 버튼  ==========================================
  const deleteBtn = () => {
    const deleteList = slipGrid.getSelectedRows();
    if (deleteList.length === 0) {
      alert("삭제할 항목을 선택해주세요. ");
      return;
    } else if (
      deleteList[0].slipStatus === "승인" ||
      deleteList[0].slipStatus === "반려"
    ) {
      alert(
        deleteList[0].slipStatus +
          "된 전표는 수정도 불가능한데 삭제는 되겠어 ? ",
      );
      return;
    } else if (!window.confirm(" 삭제 ? ")) {
      alert("취소되었습니다.");
      return;
    } else {
      const slipNo = deleteList[0].slipNo; //걍 변수에담음
      console.log(slipNo);
      //props.handleDeleteSlip(slipNo);
      dispatch({
        type: types.DELETE_SLIP_START,
        payload: {
          slipNo: slipNo,
        },
      });
      slipGrid.updateRowData({ remove: deleteList }); // 선택된 row 삭제
      alert("삭제완료");
    }
  };
  //=================================================== 전표저장 버튼  ==========================================
  const saveBtn = () => {
    //slipGrid.stopEditing(); //편집 중지

    const slipRow = slipGrid.getSelectedRows(); // 선택된 row 1줄
    if (slipRow.length === 0) {
      alert(" 저장할 전표를 선택해주세요 ");
      return;
    } else if (
      slipRow[0].slipStatus === "승인" ||
      slipRow[0].slipStatus === "반려"
    ) {
      alert("승인상태가 " + slipRow[0].slipStatus + " 된 전표는 변경 불가능 ");
      return;
    } else if (slipRow[0].slipNo !== "NEW") {
      //품의내역 수정후 전표저장누르면 db가서 UPDATE 함
      // props.handleUpdateSlip(
      //   slipRow[0].slipType,
      //   slipRow[0].expenseReport,
      //   slipRow[0].slipNo,
      // );
      dispatch({
        type: types.UPDATE_SLIP_START,
        payload: {
          slipType: slipRow[0].slipType,
          expenseReport: slipRow[0].expenseReport,
          slipNo: slipRow[0].slipNo,
        },
      });
      alert(" 업데이트 되었습니다. ");
    } else {
      props.setVisibleState(false); //분개추가 버튼 활성화
      props.setSilpRow(slipRow); //분개로 넘기는 전표Row (전표,분개랑 같이넘겨서 번호를 만듬)
      alert(" 분개추가 Button 활성화 ");
    }
  };

  const { dark } = useThemeSwitcher();

  return (
    <>
      <div>
        <div className={theme.root}>
          <AppBar color="primary" position="static">
            <Toolbar>
              <Typography variant="h4">전표</Typography>
              <Typography variant="h6" className={theme.title}></Typography>
              <Button
                className={theme.menuButton}
                variant="contained"
                color="secondary"
                onClick={addBtn}
              >
                전표추가
              </Button>
              <Button
                className={theme.menuButton}
                variant="contained"
                color="secondary"
                onClick={deleteBtn}
              >
                전표삭제
              </Button>
              <Button
                className={theme.menuButton}
                variant="contained"
                color="secondary"
                onClick={saveBtn}
              >
                전표저장
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <div
          className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
          enableColResize="true" //칼럼 리사이즈 허용 여부
          enableSorting="true" //렬 옵션 허용 여부
          enableFilter="true" //필터 옵션 허용 여부
          style={{
            //height: "200px",
            width: "100%",
            //paddingTop: "25px",
            float: "center",
          }}
        >
          <AgGridReact
            columnDefs={column.columnDefs} //정의된 컬럼
            //rowData={props.slipFormList} //Reduce에서 받아온 데이터
            rowData={data} //Reduce에서 받아온 데이터
            rowSelection="single" //하나만 선택하거나 복수개를 선택할 수 있음
            onGridReady={params => {
              //onload 이벤트와 유사한 것
              setSlipGrid(params.api);
              //동적으로변하는 그리드 값 useState 담음
              params.api.sizeColumnsToFit();
            }}
            onGridSizeChanged={event => {
              event.api.sizeColumnsToFit();
            }}
            getRowStyle={function(param) {
              return { "text-align": "center" };
            }} //body 가운데 정렬
            onCellEditingStarted={rowCellChanged} //편집 허용인 칼럼을 더블 클릭할 때 발생하는 이벤트.
            onCellClicked={onCellClicked} //셀 한번클릭
            domLayout={"autoHeight"}
          />
        </div>
      </div>
    </>
  );
};
export default SlipForm;
