import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import mpsListColumn from './mpsListColumn';
import { searchMpsInfo } from './mpsAxios';
const MpsDialog = ({ calendarDate }) => {
    const [mpsList, setMpsList] = useState([]);
    useEffect(() => {
        searchMpsInfo(setMpsList, calendarDate);
    }, []);
    return (
        <>
            <MyGrid column={mpsListColumn} title={'주생산계획(Mps)'} list={mpsList} />
        </>
    );
};

export default MpsDialog;
