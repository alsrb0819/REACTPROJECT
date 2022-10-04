import React,{useState,useCallback} from 'react';
import OrderInfo from './OrderInfo';
import OrderRegist from './OrderResist';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const OrderContainer = ()=> {

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

return(
    <>
                <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="외주 발주 조회" />
                    <Tab label="외주 발주 등록" />
                </Tabs>
            </AppBar>
            {value === 0 && (
                <OrderInfo/>
            )}
            {value === 1 && (
                <OrderRegist/>
            )}
    </>
);
}

export default OrderContainer;