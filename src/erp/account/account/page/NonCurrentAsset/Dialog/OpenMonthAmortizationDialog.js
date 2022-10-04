import React, { useState,useEffect} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  DialogActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AgGridReact } from "ag-grid-react";

const OpenCodeDialog = ({ open, close, value, }) => {
  const [positionGridApi, setPositionGridApi] = useState([]);
  const [dataList,setDataList] = useState([]); 
  const [normalAmortization1,setNormalAmortization1] = useState('');
  const [sumDepreciationFebruary,setSumDepreciationFebruary] = useState('');

  const accountColumnDefs = [
    { headerName: "상각월", field: "month", width: 180 },
    { headerName: "전월충당금이월", field: "depreciationFebruary", width: 210 },
    { headerName: "당월감가상각비", field: "accountCode", width: 180 },
  ];
    
  const Close = () => {
    close({
      division: "accountDialog",
    });
  };
 
  useEffect(()=>{
  
    let normalAmortization=value
    let monthNormalAmortization=value/12; 
    setDataList(Math.round(monthNormalAmortization));
    setNormalAmortization1(normalAmortization)
   
 
     
    
     
  },[value])

useEffect(()=>{   
  let depreciationFebruary=0;
  let depreciationFebruaryList =[];
  let sumDepreciationFebruaryList=0;
  if(positionGridApi.length!==0){
  for(var i=1; i<=12; i++){
    depreciationFebruaryList.push(depreciationFebruary)
    depreciationFebruary+=parseInt(dataList) 
      

    let newCol={
      month: '2020/'+i,
      depreciationFebruary:depreciationFebruaryList.splice(0,i)[0],
      accountCode:dataList,

    }
    positionGridApi.updateRowData({add:[newCol],addIndex:""});
  }
  positionGridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
    
    sumDepreciationFebruaryList+=rowNode.data.depreciationFebruary
    console.log("sumDepreciationFebruaryList",sumDepreciationFebruaryList)
    setSumDepreciationFebruary(sumDepreciationFebruaryList)
    
  })
 
  
} 
},[positionGridApi])

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});
const classes = useStyles();
function createData(name, calories, fat) {
  return { name, calories, fat };
}
useEffect(()=>{
  
})
const rows = [
  createData('합계', sumDepreciationFebruary,normalAmortization1),

];

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
    
      maxWidth={"80%"}
      
     
    >
      <DialogTitle id="simple-dialog-title" Align="center">
       
      </DialogTitle>
      <DialogContent dividers>
        <List>
          <div
            className={"ag-theme-material"} //그리드 모양
            style={{
              height: "400px",
              width: "600px",
              //paddingTop: "8px",
            }}
          >
            <AgGridReact
              columnDefs={accountColumnDefs} //컬럼명
              rowData={""} // 뿌릴 data
              rowSelection="single" // 하나만 선택 가능.
              getRowStyle={param => {
                return { "text-align": "center" }; //body 가운데 정렬
              }}
              onGridReady={params => setPositionGridApi(params.api)}
              onCellClicked={""} // cell을 클릭하면, handleClose가 실행된다.
            />
          </div>
        </List>
      </DialogContent>
      <TableContainer component={Paper}>
         <Table className={classes.table} size="small" aria-label="a dense table">
         <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
         </Table>
      </TableContainer>
      <DialogActions>
        <Button onClick={Close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default OpenCodeDialog;
