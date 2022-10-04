import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../../reducer/AccountReducer";
import moment from "moment";

const GeneralAccountLedgerMenu = props => {
  let year = moment(new Date()).format("yyyy");
  let month = moment(new Date()).format("MM");
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format("yyyy-MM-DD");
  let monthFirstDay = year + "-" + month + "-01";
  const data = useSelector(
    ({ AccReducer }) => AccReducer.AccountReducer.generalAccountLedgerList,
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(monthFirstDay);
  const [endDate, setEndDate] = useState(toDay);

  const searchData = () => {
    dispatch({
      type: types.SELECT_GENERAL_ACCOUNT_LEDGER_START,
      params: {
        startDate: moment(startDate).format("yyyy-MM-DD"),
        endDate: moment(endDate).format("yyyy-MM-DD"),
      },
    });
  };

  const set = Array.from(new Set(data.map(value => value.accountName)));

  const setFilteredData = value => {
    const filterComponent = props.generalAccountLedgerGrid.getFilterInstance(
      "accountName",
    );
    filterComponent.setModel({
      type: "contains",
      filter: value,
    });
    props.generalAccountLedgerGrid.onFilterChanged();
    //props.generalAccountLedgerGrid.setQuickFilter(value);
  };

  // const inputFilterData = value => {
  //   props.generalAccountLedgerGrid.setQuickFilter(value);
  // };

  return (
    <>
      <div align="center">
        <fieldset>
          <Typography variant="h5">[ 검색조건 ]</Typography>
          <div className={classes.margin}>
            <TextField
              style={{ width: "20ch" }}
              disabled={data.length === 0 ? true : false}
              //required
              id="outlined-select-currency"
              //select
              label="조건내 검색"
              variant="outlined"
              name="division"
              onChange={e =>
                props.generalAccountLedgerGrid.setQuickFilter(e.target.value)
              }
              margin="normal"
              size="small"
            />
            <TextField
              style={{ width: "20ch" }}
              disabled={data.length === 0 ? true : false}
              //required
              id="outlined-select-currency-native"
              select
              label="계정별 정렬"
              variant="outlined"
              name="division"
              onChange={e => setFilteredData(e.target.value)}
              margin="normal"
              size="small"
            >
              <option value={null} key={0}>
                전체
              </option>
              {set.map((value, inedx) => {
                return (
                  <option value={value} key={inedx + 1}>
                    {value}
                  </option>
                );
              })}
            </TextField>
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

export default GeneralAccountLedgerMenu;
