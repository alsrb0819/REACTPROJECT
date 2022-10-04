import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useThemeSwitcher } from "mui-theme-switcher";

function FinancialStatementsGrid(props) {
  const { data } = useSelector(state => state.AccReducer.StatementReducer);
  //   const { error } = useSelector(state => state.AccReducer);
  const { isLoading } = useSelector(state => state.AccReducer.StatementReducer);
  const FinancialStatementGrid = [
    {
      headerName: "과목",
      field: "accountName",
      colId: "과목명",
      cellStyle: {
        textAlign: "left",
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
          field: "balanceDetail",
          colId: "당기",
          cellStyle: { textAlign: "right" },
          width: 150,
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
        {
          headerName: "합계금액",
          field: "balanceSummary",
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
          field: "preBalanceDetail",
          colId: "전기",
          cellStyle: {
            textAlign: "right",
            borderLeft: "0.1mm ridge #c2c2c2",
          },
          width: 150,
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
        {
          headerName: "합계금액",
          field: "preBalanceSummary",
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
    <div id="grid-wrapperr" style={{ width: "100%", height: "100%" }}>
      <div
        className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
        skipHeaderOnAutoSize="true"
        enableColResize="true"
        enableSorting="true"
        enableFilter="true"
        enableRangeSelection="true"
        rowStyle={{ "text-align": "center" }}
        style={{
          width: "100%",
          float: "center",
        }}
        cellStyle={{ textAlign: "center" }}
      >
        {!isLoading ? (
          <AgGridReact
            columnDefs={FinancialStatementGrid}
            rowData={data}
            rowSelection="single"
            getRowStyle={function(param) {
              if (param.data.lev === 0) {
                return { background: "#cfdfde" };
              } else if (param.data.lev === 1 || param.data.lev === 2) {
                return { background: "#d6e8d0" };
              }
            }}
            onGridReady={event => {
              event.api.sizeColumnsToFit();
            }}
            onGridSizeChanged={onGridSizeChanged}
            domLayout={"autoHeight"}
          />
        ) : (
          <h1 align="center">로딩중</h1>
        )}
      </div>
    </div>
  );
}

export default FinancialStatementsGrid;
