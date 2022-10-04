import React, { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { AgGridReact } from "ag-grid-react";
//import { SEARCH_ACCOUNT_LIST_REQUEST } from "../../ActionType/ActionType";
import useStyles from "erp/account/statement/page/AccountLedger/Theme";


const OpenCodeDialog = ({ open, close, value }) => {
    const [positionGridApi, setPositionGridApi] = useState([]);
  const [dataList,setDataList] = useState([]);

  const accountColumnDefs = [
    { headerName: "코 드", field: "accountCode", width: 180 },
    { headerName: "계 정 과 목", field: "accountName", width: 210 },
  ];

  const handleClose = () => {
    close({
      data: positionGridApi.getSelectedRows(), // data는 클릭한 row의 정보이고,
    });
  };
  console.log(value)
  const Close = () => {
    close({
      division: "accountDialog",
    });
  };

  useEffect(
    ()=>{
       axios.get("http://localhost:8282/acc/CurrentAsset/CurrentAssetCode",
       ).then(response => {
                setDataList(response.data); 
              
            })
            .catch(e => {
                console.log(e);
        }); 
        return () => {setDataList({})}
    }
,[])


 
 

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle id="simple-dialog-title" Align="center">
        계 정 과 목
      </DialogTitle>
      <DialogContent dividers>
        <List>
          <div
            className={"ag-theme-material"} //그리드 모양
            style={{
              height: "300px",
              width: "80%",
              paddingTop: "8px",
            }}
          >
            <AgGridReact
              columnDefs={accountColumnDefs} //컬럼명
              rowData={dataList} // 뿌릴 data
              rowSelection="single" // 하나만 선택 가능.
              getRowStyle={param => {
                return { "text-align": "center" }; //body 가운데 정렬
              }}
              onGridReady={params => setPositionGridApi(params.api)}
              onCellClicked={handleClose} // cell을 클릭하면, handleClose가 실행된다.
            />
          </div>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={Close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default OpenCodeDialog;
