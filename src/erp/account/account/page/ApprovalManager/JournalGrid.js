import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../../reducer/AccountReducer";
import { AgGridReact } from "ag-grid-react";
import { makeStyles, Typography, AppBar, Toolbar } from "@material-ui/core";
import JournalDetailDialog from "./JournalDetailDialog";
import { useThemeSwitcher } from "mui-theme-switcher";

const JournalGrid = ({ slipNo, flag }) => {
  // slipNo : SlipGrid 컴포넌트에서 넘어온 slipNo로 journal 조회함.
  // flag : 3개 버튼 활성화.

  const data = useSelector(
    ({ AccReducer }) => AccReducer.AccountReducer.approvalJournalList,
    [],
  );

  const dispatch = useDispatch();

  //========================== 그리드 객체 준비 ==========================
  const [gridApi, setGridApi] = useState();
  const [journalDetailDialogOpen, setJournalDetailDialogOpen] = useState(false);

  const onGridReady = params => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    if (!flag) return;
    initalBtn();
  }, [flag]);
  //========================== 그리드초기화 ==========================

  const initalBtn = () => {
    gridApi.selectAll(); // 그리드를 모두 선택해라.
    const allData = gridApi.getSelectedRows(); // 선택한 그리드 데이타 들고온나.
    gridApi.updateRowData({ remove: allData }); // 데이터 전부 지아라.
  };

  //========================== 분개조회 ==========================
  useEffect(() => {
    if (slipNo === "" || slipNo === "NEW") return;
    dispatch({
      type: types.SEARCH_AM_JOURNAL_REQUEST,
      params: { slipNo: slipNo },
    });
  }, [slipNo]); // SlipGrid 컴포넌트에서 보낸 slipNo 가 바뀔 때마다, slipNo 를 파라미터로 분개 List를 가져와라. setData 해라.

  //========================== 그리드내용 ==========================
  const accountColumnDefs = [
    { headerName: "", field: "check", width: 50, checkboxSelection: true },
    { headerName: "분개일련번호", field: "journalNo", width: 230 },
    { headerName: "계정코드", field: "accountCode", width: 100 },
    { headerName: "계정명", field: "accountName", width: 130 },
    { headerName: "대차구분", field: "balanceDivision", width: 100 },
    { headerName: "적요", field: "summaryComment", width: 230 },
    { headerName: "거래처코드", field: "customerCode", width: 110 },
    { headerName: "거래처명", field: "customerName", width: 110 },
    {
      headerName: "금액",
      field: "price",
      width: 110,
      valueFormatter: currencyFormatter,
    },
    // valueFormatter : 그리드의 표시형식.
    { headerName: "전표번호", field: "slipNo", width: 110, hide: true },
    { headerName: "차변", field: "leftDebtorPrice", width: 110, hide: true },
    { headerName: "대변", field: "rightCreditsPrice", width: 110, hide: true },
    { headerName: "적요번호", field: "summaryNumber", width: 110, hide: true },
  ];

  //========================== 통화표시 포매터 ==========================
  function currencyFormatter(params) {
    return "￦" + formatNumber(params.value);
  }
  function formatNumber(number) {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } // 몰라. 통화표시 형식임.

  const onCellClicked = id => {
    // cell을 클릭했을 때마다 일어나는 event.
    setJournalDetailDialogOpen(true);
    dispatch({
      type: types.SET_JOURNAL_NO_REQUEST,
      journalNo: id.data.journalNo,
    });
  };

  const handleClose = value => {
    // Dialog가 닫힐 때마다 handleClose 이 메서드가 실행됨. value라는 객체를 가지고 있음.
    setJournalDetailDialogOpen(false);
  };

  const { dark } = useThemeSwitcher();

  return (
    <>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h4">분개</Typography>
        </Toolbar>
      </AppBar>
      <div
        className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
        style={{
          height: "200px",
          width: "100%",
          //paddingTop: "20px",
        }}
      >
        <AgGridReact
          columnDefs={accountColumnDefs}
          rowData={data} // 그리드에 data 뿌림.
          rowSelection="multiple" // 여러 줄 선택가능.
          onGridReady={onGridReady} // 그리드가 초기화 되면.
          onCellClicked={onCellClicked} // cell 한개 클릭했을 때 발생 event
        />
        <JournalDetailDialog
          open={journalDetailDialogOpen}
          onClose={handleClose}
        />
      </div>
    </>
  );
};

export default JournalGrid;
