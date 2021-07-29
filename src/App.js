import React, { Component } from 'react';
import Message from './components/Message';
import Crud from './components/Crud';
import Facebook from './components/Facebook';
import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';


class App extends Component {
  render(){
    return(
      <div>
      <BrowserRouter>
        <Redirect from="/" to="/home" />
        <Switch>
          <Route exact path="/home" component={Facebook} />
          <Route exact path="/Crud" component={Crud} />
        </Switch>
      </BrowserRouter>
      </div>
    )
  }
}

export default App;
