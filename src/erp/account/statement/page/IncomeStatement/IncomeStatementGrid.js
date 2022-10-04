import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useThemeSwitcher } from "mui-theme-switcher";

const IncomeStatementGrid = () => {
  const data = useSelector(({ AccReducer }) => AccReducer.StatementReducer.IncomeList, []);
  //const { error } = useSelector(state => state.AccReducer);
  const { isLoading } = useSelector(state => state.AccReducer.StatementReducer);

  const IncomeStatementGrid = [
    {
      headerName: "번호",
      field: "accountInnerCode",
      sortable: true,
      hide: true,
    },
    {
      headerName: "계정명",

      field: "accountName",
      sortable: true, //컬럼눌러서 정렬가능하게하기
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "당기 합계금액",
      field: "incomeSummary",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "전기 합계금액",
      field: "earlyIncomeSummary",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
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
          height: "60vh",
          width: "100%",
          float: "center",
        }}
        cellStyle={{ textAlign: "center" }}
      >
        {!isLoading ? (
          <AgGridReact
            columnDefs={IncomeStatementGrid}
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
            // onGridReady={onGridReady}
            // onCellClicked={onCellClicked}
            onGridSizeChanged={onGridSizeChanged}
          />
        ) : (
          <h1 align="center">로딩중</h1>
        )}
      </div>
    </div>
  );
};

export default IncomeStatementGrid;
