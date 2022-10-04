import React, { useState } from "react";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { SEARCH_FINANCIAL_REQUEST } from "../../reducer/StatementReducer";

const FinancialStatementsMenu = () => {
  let today = moment(new Date()).format("yyyy-MM-DD");

  const classes = useStyles();
  const dispatch = useDispatch();
  const [approvalDate, setApprovalDate] = useState(today);

  const searchData = () => {
    dispatch({
      type: SEARCH_FINANCIAL_REQUEST,
      params: { date: approvalDate },
    });
  };

  return (
    <>
      <div align="center">
        <fieldset>
          <Typography variant="h5">[ 검색조건 ]</Typography>
          <div className={classes.margin}>
            <TextField
              color="secondary"
              name="approvalDate"
              type={"date"}
              defaultValue={approvalDate}
              onChange={e => setApprovalDate(e.target.value)}
            />
            <Button
              variant={"contained"}
              color="primary"
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

export default FinancialStatementsMenu;
