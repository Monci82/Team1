import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "../sass/style.scss";
import Home from "./navigation/Home";
import Drivers from "./navigation/Drivers";
import Races from "./navigation/Races";
import Teames from "./navigation/Teams";
import DriverDetails from "./navigation/DriverDetails";
import TeamDetails from "./navigation/TeamDetails";
import RacesDetails from "./navigation/RacesDetails";


export default class App extends React.Component {
  
  render() {
    
    return (
      <div>
        <div className="menu">
          <Router>
            <nav>
              {/* <div><Link to="/">Home</Link></div> */}
              <div><Link to="/">Drivers</Link></div>
              <div><Link to="/teams">Teams</Link></div>
              <div><Link to="/races">Races</Link></div>
            </nav>
            <div className="mainScreen">
            <Switch>
              {/* <Route path="/" exact component={Home} /> */}
              <Route path="/" exact component={Drivers } />
              <Route path="/driverDetails/:id" exact component={DriverDetails }
              />
              <Route path="/teams" exact component={Teames} />
              <Route path="/TeamDetails/:id" exact component={TeamDetails} />
              <Route path="/races" exact component={Races} />
              <Route path="/racesDetails/:id" exact component={RacesDetails} />

            </Switch>
            </div>
          </Router>
        </div>
        
      </div>
    );
  }
}


{/* Ovo je sintaksa za prosleđivanje stejta kroz Route
<Route path="/lectures" exact render={() => <Lectures config={this.state.config} />} /> */}
