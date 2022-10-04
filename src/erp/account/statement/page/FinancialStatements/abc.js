import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Axios from "axios";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const Abc = () => {
  const [data, setData] = useState([
    { make: "존나", model: "Celica", price: 35000 },
    { make: "하기", model: "Mondeo", price: 32000 },
    { make: "싫다", model: "Boxter", price: 72000 },
  ]);

  const [datee, setDatee] = useState("1");

  const [date, setDate] = useState({
    approvalDate: "",
  });

  const onChange = event => {
    setDate({
      ...date,
      [event.target.name]: event.target.value,
    });
  };
  console.log(date);

  const buttonsize = {
    marginLeft: 500,
  };

  const searchData = ({ datee }) => {
    setData([
      { make: "물류", model: "프로시저", price: { datee } },
      { make: "회계", model: "왜", price: 60000 },
      { make: "인사", model: "안나와?", price: 70000 },
    ]);
  };

  const FinancialStatementscolumnDefs = [
    // 칼럼정의
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
  ];

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <font color="green" size="50" face="돋움체">
          (❤'◡'❤) 😀재무상태표🍕 💢┗|｀O′|┛💢
        </font>
        <br />
        <br />
        <TextField type="date" name="approvalDate" onChange={onChange} />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FindInPageIcon />}
          style={buttonsize}
          onClick={searchData}
        >
          조회
        </Button>
        <br />
      </Grid>
      <div
        className={"ag-theme-balham"}
        style={{
          height: "700px",
          width: "100%",
          paddingTop: "25px",
        }}
      >
        <AgGridReact
          columnDefs={FinancialStatementscolumnDefs}
          rowData={data}
        ></AgGridReact>
      </div>
    </React.Fragment>
  );
};

export default Abc;
