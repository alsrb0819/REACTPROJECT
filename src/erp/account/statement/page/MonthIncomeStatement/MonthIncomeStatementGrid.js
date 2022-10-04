import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useThemeSwitcher } from "mui-theme-switcher";

const MonthIncomeStatementGrid = () => {
  const data = useSelector(({ AccReducer }) => AccReducer.StatementReducer.MonthIncomeList, []);
  //const { error } = useSelector(state => state.AccReducer);
  const { isLoading } = useSelector(state => state.AccReducer.StatementReducer);

  const MonthIncomeStatementGrid = [
    {
      headerName: "연도",
      field: "year",
      hide: true,
      width:"150",
    },
    {
      headerName: "월",
      field: "month",
      sortable: true, //컬럼눌러서 정렬가능하게하기
      cellClass: "grid-cell-centered",
      width: "100"
    },
    {
      headerName: "매출액",
      field: "salesSummary",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "매출원가",
      field: "salesCostSummary",
      background: "red",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "매출총액",
      field: "grossMargin",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "판관비",
      field: "salesManageCostSummary",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "영업이익",
      field: "operatingProfit",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "영업외수익",
      field: "nonOperatingProfitSummary",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "영업외비용",
      field: "nonOperatingCostSummary",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "법인세차감전이익",
      field: "ordinaryProfit",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "법인세",
      field: "corporateTaxSummary",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
    {
      headerName: "당기순이익",
      field: "netIncome",
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
            columnDefs={MonthIncomeStatementGrid}
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

export default MonthIncomeStatementGrid;
