import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import * as types from "../../reducer/StatementReducer";

const TotalTrialBalanceMenu = () => {
  let today = moment(new Date()).format("yyyy-MM-DD");

  const classes = useStyles();
  const dispatch = useDispatch();
  const [date, setDate] = useState(today);

  const searchData = () => {
    dispatch({
      type: types.SEARCH_TOTALTRIAL_REQUEST,
      params: {
        date: date,
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
              name="approvalDate"
              type={"date"}
              defaultValue={date}
              onChange={e => setDate(e.target.value)}
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

export default TotalTrialBalanceMenu;
