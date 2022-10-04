import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useThemeSwitcher } from "mui-theme-switcher";

const CashFlowStatementGrid = () => {
  const data = useSelector(({ AccReducer }) => AccReducer.StatementReducer.CashFlowList, []);
  //const { error } = useSelector(state => state.AccReducer);
  const { isLoading } = useSelector(state => state.AccReducer.StatementReducer);

  const CashFlowStatementGrid = [
  {
    headerName: "과목",
    field: "accountName",
    colId: "과목명",
    cellStyle: {
      textAlign: "left",
      //borderLeft: "0.1mm ridge #c2c2c2",
      borderRight: "0.1mm ridge #c2c2c2",
    },
    width: 150,
  },
  {
    headerName: "당기",
    headerClass: "participant-group",
    marryChildren: true,
    children: [
      {
        headerName: "세부금액",
        field: "cashFlow",
        colId: "당기",
        cellStyle: { textAlign: "right" },
        width: 150,
        valueFormatter:
          ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
      },
      {
        headerName: "합계금액",
        field: "cashFlowSummary",
        colId: "당기",
        cellStyle: { textAlign: "right" },
        width: 150,
        valueFormatter:
          ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
      },
    ],
  },
  {
    headerName: "전기",
    headerClass: "participant-group",
    marryChildren: true,
    children: [
      {
        headerName: "세부금액",
        field: "earlyCashFlow",
        colId: "전기",
        cellStyle: {
          textAlign: "right",
          borderLeft: "0.1mm ridge #c2c2c2",
          //borderRight: "0.1mm ridge #c2c2c2",
        },
        width: 150,
        valueFormatter:
          ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
      },
      {
        headerName: "합계금액",
        field: "earlyCashFlowSummary",
        colId: "전기",
        cellStyle: { textAlign: "right" },
        width: 150,
        valueFormatter:
          ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
      },
    ],
  },
];

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
    <div>
    <div
        className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
        skipHeaderOnAutoSize="true"
        enableColResize="true"
        enableSorting="true"
        enableFilter="true"
        enableRangeSelection="true"
        rowStyle={{ "text-align": "center" }}
        style={{
          //height: "60vh",
          width: "100%",
          float: "center",
        }}
        cellStyle={{ textAlign: "center" }}
      >
        {!isLoading ? (
          <AgGridReact
            columnDefs={CashFlowStatementGrid}
            rowData={data}
            rowSelection="single"
            getRowStyle={function(param) {
              //가운데
              if (param.node.rowPinned) {
                return { "font-weight": "bold", background: "#dddddd" };
              }
              return { "text-align": "center" };
            }}
            onGridReady={event => {
              event.api.sizeColumnsToFit();
            }}
            onGridSizeChanged={event => {
              event.api.sizeColumnsToFit();
            }}
            domLayout={"autoHeight"}
          />
        ) : (
          <h1 align="center">로딩중</h1>
        )}
      </div>
    </div>
  );
};

export default CashFlowStatementGrid;
