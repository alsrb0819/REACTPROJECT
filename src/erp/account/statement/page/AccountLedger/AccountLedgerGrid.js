import React from "react";
import { AgGridReact } from "ag-grid-react";
import useStyles from "./Theme";
import { useSelector } from "react-redux";
import { useThemeSwitcher } from "mui-theme-switcher";

//AccountSearch 선택한 코드 넘겨받음 {code}
const AccountLedgerSearch = () => {
  const classes = useStyles(); //스타일적용

  const { data } = useSelector(state => state.AccReducer.StatementReducer); //DB에서 받아온 값을 그리드에뿌리려고 데꼬옴
  const { isLoading } = useSelector(state => state.AccReducer.StatementReducer); // 그리드뿌릴때 쓸 LOADING....

  // 그리드 컬럼 정의
  const AccountLedgerGrid = [
    {
      headerName: "작성일자",
      field: "reportingDate",
      sortable: true, //컬럼 눌러서 정렬가능하게 함
    },
    {
      headerName: "차변",
      field: "leftDebtorPrice",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"', // 3칸마다 , 찍고 마지막에 원 붙임
    },
    {
      headerName: "대변",
      field: "rightCreditsPrice",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
    },
    {
      headerName: "잔액금",
      field: "totalPrice",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
    },
  ];

  const { dark } = useThemeSwitcher();

  return (
    <div align="center" className={classes.margin}>
      <div
        className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
        style={{
          height: "100vh",
          //width: "100%",
          //paddingTop: "25px",
        }}
      >
        {!isLoading ? (
          <AgGridReact
            columnDefs={AccountLedgerGrid}
            rowData={data}
            rowSelection="single"
            getRowStyle={function(param) {
              if (param.node.rowPinned) {
                return { "font-weight": "bold", background: "#CEFBC9" };
              }
              return { "text-align": "center" }; // bady 값 가운데정렬
            }}
            onGridReady={event => {
              //그리드 크기자동조절
              event.api.sizeColumnsToFit();
            }}
          />
        ) : (
          <h1 align="center">Loading...</h1>
        )}
      </div>
    </div>
  );
};
export default AccountLedgerSearch;
