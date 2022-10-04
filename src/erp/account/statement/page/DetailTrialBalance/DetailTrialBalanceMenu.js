import React, { useCallback, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as types from "../../reducer/StatementReducer";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const DetailTrialBalanceMenu = () => {
  let year = moment(new Date()).format("yyyy");
  let month = moment(new Date()).format("MM");
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format("yyyy-MM-DD");
  let monthFirstDay = year + "-" + month + "-01";

  const classes = useStyles();
  const dispatch = useDispatch();
  const [fromDate, setFromdate] = useState(monthFirstDay);
  const [toDate, setTodate] = useState(toDay);

  // const searchData = useCallback(() => {
  //   dispatch({
  //     type: types.SEARCH_DETAILTRIAL_REQUEST,
  //     params: {
  //       fromDate: fromDate,
  //       toDate: toDate,
  //     },
  //   });
  // }, [dispatch]);

  const searchData = () => {
    dispatch({
      type: types.SEARCH_DETAILTRIAL_REQUEST,
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
              name="fromDate"
              type={"date"}
              defaultValue={fromDate}
              onChange={e => setFromdate(e.target.value)}
            />
            <TextField
              name="toDate"
              type={"date"}
              defaultValue={toDate}
              onChange={e => setTodate(e.target.value)}
            />
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={searchData}
              startIcon={<SearchIcon />}
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

export default DetailTrialBalanceMenu;
