import React, { Component } from 'react';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import { HashRouter, Route, Routes } from 'react-router-dom'
import Routers from './router';
import Login from './pages/user/Login'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            session: JSON.parse(window.sessionStorage.getItem('session')),
        }
    }

    render() {
        return (
            <div className='div-container-main'>
                {
                    this.state.session ?
                        <div className='admin-control'>
                            <Header></Header>
                            <div className='div-router-main'>
                                <HashRouter>
                                    <Routes>
                                        {
                                            Routers.map((item) => {
                                                return <Route path={item.path} exact={item.exact} element={item.element}></Route>
                                            })
                                        }
                                    </Routes>
                                </HashRouter>
                            </div>
                            <Footer></Footer>
                        </div>
                        :
                        <Login>{this.props}</Login>
                }
            </div>
        )
    }
}

export default App;                                                                                                 