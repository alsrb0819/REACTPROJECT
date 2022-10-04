import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as types from "../../reducer/AccountReducer";
import moment from "moment";

const JournalFormMenu = () => {
  let year = moment(new Date()).format("yyyy");
  let month = moment(new Date()).format("MM");
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format("yyyy-MM-DD");
  let monthFirstDay = year + "-" + month + "-01";

  const classes = useStyles();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(monthFirstDay);
  const [endDate, setEndDate] = useState(toDay);

  const searchData = () => {
    dispatch({
      type: types.SEARCH_JOURNAL_DOUBLE_REQUEST,
      params: {
        startDate: moment(startDate).format("yyyy-MM-DD"),
        endDate: moment(endDate).format("yyyy-MM-DD"),
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
              name="startDate"
              type={"date"}
              defaultValue={startDate}
              onChange={e => setStartDate(e.target.value)}
            />

            <TextField
              name="endDate"
              type={"date"}
              defaultValue={endDate}
              onChange={e => setEndDate(e.target.value)}
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

export default JournalFormMenu;
