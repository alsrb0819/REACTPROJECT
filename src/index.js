import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import Themes from 'util/StyleComponents/themes/index';
import { ThemeSwitcherProvider } from 'mui-theme-switcher';

//리덕스, 사가
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducers from 'root/RootReducer';
import RootSaga from 'root/RootSaga';
//컴포넌트
import AppContainer from 'AppContainer';
import Dashboard from 'common/page/dashboard/Dashboard';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(RootReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(RootSaga);

const render = () => {
    const state = store.getState();     // 현재 store의 상태를 state에 담음
    ReactDOM.render(
        <Provider store={store}>
            {state.dashReducer.startPrj === 'true' ? (  // 1. getItem이라서 상태는 false이다    2. 시작하기를 누르면 true로 바뀐다.
                <ThemeProvider theme={Themes.default}>
                    <ThemeSwitcherProvider
                        lightTheme={Themes.default}
                        darkTheme={Themes.darkTheme}    // 2. true이므로 여기가 실행이 된다.
                        defaultTheme={'light'}
                    >
                        <AppContainer />
                    </ThemeSwitcherProvider>
                </ThemeProvider>
            ) : (
                <Dashboard />   // 1. false라서 여기가 보이는 것이다. (comm->page->dashboard)
            )}
        </Provider>,

        document.getElementById('root')
    );
};
store.subscribe(render);
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
