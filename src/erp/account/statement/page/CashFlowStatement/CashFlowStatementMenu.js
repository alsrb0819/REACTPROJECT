import React, { useState } from "react";
import moment from "moment";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import * as types from "../../reducer/StatementReducer";

const CashFlowStatementMenu = () => {
  let today = moment(new Date()).format("yyyy-MM-DD");

  const classes = useStyles();
  const dispatch = useDispatch();
  const [approvalDate, setApprovalDate] = useState(today);

  const searchData = () => {
    dispatch({
      type: types.SEARCH_CASHFLOW_REQUEST,
      params: { date: approvalDate },
    });
  };

  return (
    <>
      <div Align="center">
        <fieldset>
          <Typography variant="h5">[ 검색조건 ]</Typography>
          <div className={classes.margin}>
            <TextField
              name="approvalDate"
              type={"date"}
              defaultValue={approvalDate}
              onChange={e => setApprovalDate(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              disableElevation
              startIcon={<SearchIcon />}
              onClick={searchData}
            >
              조회
            </Button>
          </div>
        </fieldset>
      </div>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  margin: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export default CashFlowStatementMenu;
