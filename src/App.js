import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import "../sass/style.scss";
import Home from "./navigation/Home";
import Drivers from "./navigation/Drivers";
import Races from "./navigation/Races";
import Teames from "./navigation/Teams";
import DriverDetails from "./navigation/DriverDetails";




export default class App extends React.Component{
    
    render(){

        return(
            <div>
                <div className="menu">
                    <Router>
                        <nav>
                            <div><Link to="/">Home</Link></div>
                            <div><Link to="/drivers" >Drivers</Link></div>
                            <div><Link to="/teams" >Teams</Link></div>
                            <div><Link to="/races" >Races</Link></div>
                        </nav>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/drivers" exact component={Drivers} />
<<<<<<< HEAD
                            <Route path="/driverDetails/:id" exact component={DriverDetails} />
=======
                            <Route path ="/driverDetails/:id" exact component={DriverDetails} />
>>>>>>> 3bb633fd1c2296409160f76975387749748031c1
                            <Route path="/teams" exact component={Teames} />
                            <Route path="/races" exact component={Races} />
                        </Switch>
                    </Router>

                </div>
                <div className="mainScreen">
                  
                </div>
            </div>
        )
    }
}