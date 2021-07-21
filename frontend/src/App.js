import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Insert from './components/Insert';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h2>Footy</h2>
          <nav>
          <ul>
            <li><Link to={'/'}> Home </Link></li>
            <li><Link to={'/insert'}>Insert</Link></li>
            <li><Link to={'/search'}>Search</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route path='/insert' component={Insert} />
              <Route path='/search' component={Search} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
