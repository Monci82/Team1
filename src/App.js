import React from "react";
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from "react-router-dom";
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
            
          <div className="leftSide">
            <Link to="/"><img  className="f1Img" src="../img/pravilogo.jpg" /></Link>
  {/* Promenjen Link uNavLink i dodata aktiv klasa*/}
            <nav>
              {/* <div><Link to="/">Home</Link></div> */}
              <div><NavLink className="link" activeClassName="navActiveLink" exact to="/"><img className="menuImg" src={"../img/helmet.png"}/>Drivers</NavLink></div>
              <div><NavLink className="link" activeClassName="navActiveLink" exact to="/teams"><div><img className="menuImg" src={"../img/timovi.png"}/><img className="menuImg formula" src={"../img/timovi.png"}/></div>Teams</NavLink></div>
              <div><NavLink className="link" activeClassName="navActiveLink" exact to="/races"><img className="menuImg" src={"../img/checkered-flag.png"}/>Races</NavLink></div>
            </nav>
            </div>
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
