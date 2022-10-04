import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import * as types from "../../reducer/AccountReducer";
import {
  Toolbar,
  AppBar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useThemeSwitcher } from "mui-theme-switcher";

const SlipGrid = ({ setSlipNo, setFlag }) => {
  const classes = useStyles(); // 스타일 먹임

  const data = useSelector(({ AccReducer }) => AccReducer.AccountReducer.approvalSlipList);
  const dispatch = useDispatch();

  //========================== 그리드 객체 준비 ==========================
  const [positionGridApi, setPositionGridApi] = useState();
  const onGridReady = params => {
    setPositionGridApi(params.api);
    params.api.sizeColumnsToFit(); // 그리드 초기화 시 칼럼 사이즈 자동조절.
  }; // 여긴 그냥 ag Grid의 api를 사용하기 위해 선언. 그리고 이곳은 ag Grid 초기화 시 실행된다.

  //========================== 그리드내용 ==========================
  const accountColumnDefs = [
    { headerName: "", field: "check", width: 50, checkboxSelection: true }, // checkboxSelection : 체크박스 추가함
    { headerName: "전표일련번호", field: "slipNo", width: 150 },
    { headerName: "기수일련번호", field: "accountPeriodNo", width: 100 },
    { headerName: "전표유형", field: "slipType", width: 100 },
    { headerName: "작성날짜", field: "reportingDate", width: 100 },
    { headerName: "작성자명", field: "reportingEmpName", width: 100 },
    {
      headerName: "작성자코드",
      field: "reportingEmpCode",
      width: 100,
      hide: true,
    },
    {
      headerName: "품의내역",
      field: "expenseReport",
      width: 180,
      editable: true,
    }, // editable : 편집가능
    { headerName: "승인날짜", field: "approvalDate", width: 100 },
    { headerName: "승인자", field: "approvalEmpCode", width: 100 },
    { headerName: "승인상태", field: "slipStatus", width: 80 },
    { headerName: "부서코드", field: "deptCode", hide: true },
    { headerName: "status", field: "status", hide: true },
  ];

  //========================== 그리드초기화 ==========================
  const initalBtn = () => {
    positionGridApi.selectAll(); // 그리드에 뿌려진 모든 데이터를 선택해라.
    const allData = positionGridApi.getSelectedRows(); // 선택된 데이터를 담아라.
    positionGridApi.updateRowData({ remove: allData }); // 그리드에서 제거해라
  };

  //========================== 전표승인 ===============================
  const approvalBtn = async () => {
    let selectedData = positionGridApi.getSelectedRows();
    let approvalData = selectedData.map(cv => {
      cv.slipStatus = "승인"; // 뒷단에서 반려도 추가를 할경우  전표 등록할때 사용하는 FormControl 을 사용 하여 승인이면 true 반려면 false 를 하고 넘겨 주길 바랍니다 ㅎㅎ
      cv.approvalDate = moment(new Date()).format("yyyy-MM-DD");
      cv.approvalEmpCode = sessionStorage.getItem("empCodeInfo_token");
      cv.approvalEmpName = sessionStorage.getItem("empNameInfo_token");
      return cv;
    });
    dispatch({
      type: types.UPDATE_AM_SLIP_REQUEST,
      params: { approvalData: approvalData },
    });
    alert(` ${approvalData.length} 건 의 전표가 승인이 되었습니다. `);
    positionGridApi.updateRowData({ remove: selectedData });
    setFlag(true);
  };
  //========================== 전표반려 ===============================
  const companionBtn = async () => {
    let selectedData = positionGridApi.getSelectedRows();
    let companionData = selectedData.map(cv => {
      cv.slipStatus = "반려"; // 뒷단에서 반려도 추가를 할경우  전표 등록할때 사용하는 FormControl 을 사용 하여 승인이면 true 반려면 false 를 하고 넘겨 주길 바랍니다 ㅎㅎ
      cv.companionDate = moment(new Date()).format("yyyy-MM-DD");
      cv.companionEmpCode = sessionStorage.getItem("empCodeInfo_token");
      cv.companionEmpName = sessionStorage.getItem("empNameInfo_token");
      return cv;
    });
    dispatch({
      type: types.UPDATE_AM_SLIP_REQUEST,
      params: { approvalData: companionData },
    });
    alert(` ${companionData.length} 건 의 전표가 승인이 되었습니다. `);
    positionGridApi.updateRowData({ remove: selectedData });
    setFlag(true);
  };
  //========================== 전표그리드 row를 눌렀을 때, 이벤트 ==========================
  const slipChange = () => {
    const rowData = positionGridApi.getSelectedRows(); // 선택된 row 정보
    setSlipNo(rowData[0].slipNo); // row 정보의 slipNo를 세팅해라. JournalGrid 컴포넌트로 보내기 위함.
  };

  const onGridSizeChanged = params => {
    var gridWidth = document.getElementById("grid-wrapperr").offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      var column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  };

  const { dark } = useThemeSwitcher();

  return (
    <>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h4">전표</Typography>
          <Typography variant="h6" className={classes.title}></Typography>
          <Button
            className={classes.menuButton}
            variant="contained"
            color="secondary"
            onClick={approvalBtn}
          >
            전표승인
          </Button>
          <Button
            className={classes.menuButton}
            variant="contained"
            color="secondary"
            onClick={companionBtn}
          >
            반려
          </Button>
          <Button
            className={classes.menuButton}
            variant="contained"
            color="secondary"
            onClick={initalBtn}
          >
            그리드초기화
          </Button>
        </Toolbar>
      </AppBar>
      <div id="grid-wrapperr" style={{ width: "100%", height: "100%" }}>
        <div
          className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
          style={{
            height: "250px",
            width: "100%",
            //paddingTop: "20px",
          }}
        >
          <AgGridReact
            columnDefs={accountColumnDefs}
            rowData={data} // setData된 state를 결국 여기 넣어서 그리드에 표현함.
            rowSelection="multiple" // 그리드 여러개 선택가능
            onGridReady={onGridReady}
            onCellClicked={slipChange} // 그리드 cell 하나 클릭할 때,
            getRowStyle={function(param) {
              if (param.node.rowPinned) {
                return { "font-weight": "bold", background: "#CEFBC9" };
              }
              return { "text-align": "center" }; // bady 값 가운데정렬
            }}
            //onGridSizeChanged={onGridSizeChanged}
            //onFirstDataRendered={params => params.api.sizeColumnsToFit()}
          />
        </div>
      </div>
      <br />
    </>
  );
};

// 스타일 관련
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    height: 330,
    width: 1190,
  },
  subCategory: {
    background: "#232f3e",
    color: "white",
  },
  margin: {
    margin: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));
export default SlipGrid;
