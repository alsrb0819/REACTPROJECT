import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

// components
import Layout from 'common/page/layout/layout';

// pages
//import 'Error' from "pages/'error'";
import LoginContainer from 'common/page/login/LoginContainer';

const App = ({ isAuthenticated }) => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/app" component={Layout} />
                <PublicRoute path="/login" component={LoginContainer} />
                <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
                <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
                {/* // 사용자 정의 컴포넌트 */}
                {/*<Route component={Error} />*/}
            </Switch>
        </BrowserRouter>
    );

    // #######################################################################

    function PrivateRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        React.createElement(component, props)
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
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

    function PublicRoute({ component, ...rest }) {
        console.log('component', component);
        console.log('...rest', rest);
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <Redirect
                            to={{
                                pathname: '/'
                            }}
                        />
                    ) : (
                        React.createElement(component, props)
                    )
                }
            />
        );
    }
};

export default App;
