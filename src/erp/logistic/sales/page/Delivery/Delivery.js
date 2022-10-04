import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import DeliverySearch from './DeliverySearch';
import DeliveryInfo from './DeliveryInfo';

function Delivery(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const useStyles = makeStyles
    ((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
        },
    }));
    const classes = useStyles();
    return (
       <>
        <AppBar position="static" style={{marginBottom:'1vh'}}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="납품" />
            <Tab label="납품현황" />
          </Tabs>
        </AppBar>
        {value===0&& <DeliverySearch/> } 
        {value===1&&  <DeliveryInfo/>}
       </>
    );
}

export default Delivery;