import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WorkSiteProcess from './WorkSiteProcess';
import WorkSiteLog from './WorkSiteLog';

function WorkSite(props) {
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
            <AppBar position="static" style={{ marginBottom: '1vh' }} >
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="작업장" />
                    <Tab label="작업장 로그" />
                </Tabs>
            </AppBar>
            {value === 0 && <WorkSiteProcess />}
            {value === 1 && <WorkSiteLog />}
        </>
    );
}

export default WorkSite;