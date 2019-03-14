import React, { Component } from 'react';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/movie' component={MovieDetail}/>
            <Route render={() => <p>Not found</p>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;