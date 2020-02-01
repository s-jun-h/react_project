import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { createStore } from 'redux';
import rootReducer from './store';
import { Provider } from 'react-redux' ;

// import Button from '@material-ui/core/Button'
// import Pricing from './templates/Pricing'

import RootRouter from './routers/RootRouter'
import MyNavbar from './templates/MyNavbar'

import { connect } from 'react-redux';
import { logIn, regEmail } from './store/loginState';
import Singin from './pages/SignIn'
import Main from './pages/Main'
import FundInfo from './pages/FundInfo'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
    }
  }

  render() {
      return (
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
      { 
        this.props.logedIn
        ?
        <div>
            <div className = "header-location" color = "red"><MyNavbar/></div>
            <div className = "main">
                <RootRouter/>
                {/* <Switch>
                    <Route path="/" component={Main}/>
                    <Route path="/"><Main/></Route>
                    <Route path="/FundInfo" component={FundInfo}/>
                    <Route path="/FundInfo"><FundInfo/></Route>
                </Switch> */}
            </div>
        </div>
        :
        <Switch>
          <Route path="/"><div className="singin"><Singin/></div></Route>
        </Switch>        
      }
       </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({  //2
  logedIn : state.loginState.logedIn,
  upperUserEmail : state.loginState.userEmail,
});

const mapDispatchToProps = dispatch => {
  return {
    logIn : () => dispatch(logIn()),
    regEmail : email => dispatch(regEmail(email)),
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);
