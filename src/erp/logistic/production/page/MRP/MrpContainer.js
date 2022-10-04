import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MrpRegister from './MrpRegister';
import MrpDialog from './MrpDialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//index.js로 나눠 사용하므로 각 saga에서 액션함수를 가지고 와 주어야 한다. 21.12.14 cys
import { searchGatherList, GatherInsert } from 'erp/logistic/production/saga/gatherSaga';
import { searchMpsList } from 'erp/logistic/production/saga/mpsSaga';
import { searchGetMrpList } from 'erp/logistic/production/saga/mrpSaga';
import { searchMrpList, MrpRegisterList } from 'erp/logistic/production/saga/mrpSimulatorSaga';
import MrpGather from './MrpGather';

const MrpContainer = props => {
    const {
        searchMpsList,
        MrpList,
        searchMrpList,
        MrpSimulatorList,
        MrpRegisterList,
        searchGetMrpList,
        MrpGetList,
        searchGatherList,
        GatherList,
        GatherInsert
    } = props;

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="MRP등록" />
                    <Tab label="소요량취합" />
                </Tabs>
            </AppBar>
            {value === 0 && (
                <MrpRegister
                    searchMpsList={searchMpsList}
                    MrpList={MrpList}
                    searchMrpList={searchMrpList}
                    MrpSimulatorList={MrpSimulatorList}
                    MrpRegisterList={MrpRegisterList}
                />
            )}
            {value === 1 && (
                <MrpGather
                    searchGetMrpList={searchGetMrpList}
                    MrpGetList={MrpGetList}
                    searchGatherList={searchGatherList}
                    GatherList={GatherList}
                    GatherInsert={GatherInsert}
                />
            )}
        </div>
    );
};

//수진
const mapStateToProps = state => {
    return {
        MrpList: state.logistic.ProductionReducerCombine.mpslist.MrpList,
        MrpSimulatorList: state.logistic.ProductionReducerCombine.mrpsimulatorlist.MrpSimulatorList,
        MrpGetList: state.logistic.ProductionReducerCombine.mrplist.MrpGetList,
        GatherList: state.logistic.ProductionReducerCombine.gatherlist.GatherList
    };
};

export default connect(mapStateToProps, {
    searchMpsList,
    searchMrpList,
    MrpRegisterList,
    searchGetMrpList,
    searchGatherList,
    GatherInsert
})(withRouter(MrpContainer));
