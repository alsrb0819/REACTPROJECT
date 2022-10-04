import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useThemeSwitcher } from "mui-theme-switcher";

const DetailTrialBalanceGrid = () => {
  const data = useSelector(
    ({ AccReducer }) => AccReducer.StatementReducer.detailTrialBalanceList,
  );

  const DetailTrialBalanceColumnDefs = [
    {
      headerName: "계층",
      field: "lev",
      width: 150,
      hide: "true",
    },
    {
      headerName: "계정내부코드",
      field: "accountInnerCode",
      width: 150,
      hide: "true",
    },
    {
      headerName: "차변",
      children: [
        {
          headerName: "계",
          field: "debitsSum",
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: { textAlign: "right" },
        },
        {
          headerName: "대체",
          field: "exceptCashDebits",
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: { textAlign: "right" },
        },
        {
          headerName: "현금",
          field: "cashDebits",
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: { textAlign: "right" },
        },
      ],
    },
    {
      headerName: "개정과목",
      field: "accountName",
      width: 180,
      cellStyle: {
        textAlign: "center",
        borderLeft: "0.1mm ridge #c2c2c2",
        borderRight: "0.1mm ridge #c2c2c2",
      },
      resizable: true,
    },
    {
      headerName: "대변",
      children: [
        {
          headerName: "현금",
          field: "cashCredits",
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: {
            textAlign: "right",
          },
        },
        {
          headerName: "대체",
          field: "exceptCashCredits",
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: {
            textAlign: "right",
            //background: "black"
          },
        },
        {
          headerName: "계",
          field: "creditsSum",
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: { textAlign: "right" },
        },
      ],
    },
  ];

  const onGridSizeChanged = params => {
    var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
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
      <div
        id="myGrid"
        className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
        style={{
          //height: "60%",
          width: "100%",
        }}
      >
        <AgGridReact
          columnDefs={DetailTrialBalanceColumnDefs}
          rowData={data}
          rowSelection="single"
          onGidReady={event => {
            event.api.sizeColumnsToFit();
            //event.api.setDomLayout("autoHeight");
            //document.querySelector("#myGrid").style.height = "";
          }}
          domLayout={"autoHeight"}
          onGridSizeChanged={event => {
            event.api.sizeColumnsToFit();
          }}
          // getRowStyle={param => {
          //   //console.log(param.data.accountName.trim());
          //   if (param.data.accountName.trim() === "합계") {
          //     return { background: "#f5f5f5" };
          //   }
          // }}
        />
      </div>
    </>
  );
};

export default DetailTrialBalanceGrid;
