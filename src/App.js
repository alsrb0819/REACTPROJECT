import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

// components
import Layout from 'common/page/layout/layout';

// pages
//import 'Error' from "pages/'error'";
import LoginContainer from 'common/page/login/LoginContainer';

const App = ({ isAuthenticated }) => {
    return (
        <BrowserRouter> {/* path에 맞게 찾아감 */}
            <Switch> {/* path에 맞는 첫 번째 route만 응답 */}
                <PrivateRoute path="/app" component={Layout} />
                <PublicRoute path="/login" component={LoginContainer} />
                <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} /> {/* exact는 path명이 완벽히 일치해야함 */}
                <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
                {/* // 사용자 정의 컴포넌트 */}
                {/*<Route component={Error} />*/}
            </Switch>
        </BrowserRouter>
    );

    // #######################################################################

    function PrivateRoute({ component, ...rest }) {     // ...rest는 컴포넌트를 제외한 path 즉 /app이 담겨있다
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? ( // 1. AppContainer에 있지만 로그인을 하지않아서 현재 fsale
                        React.createElement(component, props)
                    ) : (
                        <Redirect   // 1. false라서 여기가 실행
                            to={{
                                pathname: '/login', // path에 맞게 실행
                                state: {
                                    from: props.location,
                                    explain: '로그인 인증 실패'
                                }
                            }}
                        />
                    )
                }
            />
        );
    }

    function PublicRoute({ component, ...rest }) {  // path가 login으로 받으면 실행
        console.log('component', component);
        console.log('...rest', rest);
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? ( // 1. 아직 로그인을 안했기에 false
                        <Redirect
                            to={{
                                pathname: '/'
                            }}
                        />
                    ) : (
                        React.createElement(component, props)   // false라서 여기가 실행(component는 LoginContainer이다.)
                    )
                }
            />
        );
    }
};

export default App;
