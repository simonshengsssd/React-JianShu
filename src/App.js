import React, { Component } from 'react';
// import { GlobalStyle } from './style';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Write from './pages/write'
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}> 
        <BrowserRouter>
          <div>
          <Header />
            {/* <Route path='/' render = {()=><div>home</div>}></Route> */}
            {/*  /detail包含了'/',所以这里detail的路径带着home，即
            输出detail的时候也会输出一遍home */}
            {/* <Route path='/detail' render = {()=><div>detail</div>}></Route> */}
            <Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
            <Route path='/detail/:id' exact component={Detail}></Route>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;