import React, { useState } from "react";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import * as types from "../../reducer/StatementReducer";

const CashJournalMenu = () => {
  let year = moment(new Date()).format("yyyy");
  let month = moment(new Date()).format("MM");
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format("yyyy-MM-DD");
  let monthFirstDay = year + "-" + month + "-01";

  const dispatch = useDispatch();
  const classes = useStyles();
  const [fromDate, setFromdate] = useState(monthFirstDay);
  const [toDate, setTodate] = useState(toDay);

  const searchData = () => {
    dispatch({
      type: types.SEARCH_CASHJOURNAL_REQUEST,
      params: {
        fromDate: fromDate,
        toDate: toDate,
      },
    });
  };

  return (
    <>
      <div align="center">
        <fieldset>
          <Typography variant="h5">[ 검색조건 ]</Typography>
          <div className={classes.margin}>
            <TextField
              label="fromDate"
              color="primary"
              name="fromDate"
              type={"date"}
              defaultValue={fromDate} //defaultValue : 초기값.
              onChange={e => setFromdate(e.target.value)} // onChange : 값이 변경되면 콜백이 발생.
            />
            <TextField
              label="toDate"
              color="primary"
              name="toDate"
              type={"date"}
              defaultValue={toDate}
              onChange={e => setTodate(e.target.value)}
            />
            <Button
              variant={"contained"}
              startIcon={<SearchIcon />}
              color="primary"
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

export default CashJournalMenu;
