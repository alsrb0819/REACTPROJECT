import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ContractSearch from './ContractSearch';
import ContractRegist from './ContractRegist';
//test
function Contract(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
        },
    }));
    const classes = useStyles();
    return (
        <>
        <AppBar position="static" style={{marginBottom:'1vh'}} >
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="수주 조회" />
            <Tab label="수주 등록" />
          </Tabs>
        </AppBar>
        {value===0&& <ContractSearch/> } 
        {value===1&& <ContractRegist/> }
        </>
    );
}

export default Contract;