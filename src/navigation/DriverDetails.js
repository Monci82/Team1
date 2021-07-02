import React from "react";
import * as $ from "jquery";

export default class DriverDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            driverProfile: [],
            driversRaces: [],
            isLoading: true
        }

    }


    componentDidMount() {

        this.getDriversProfile(this.props.match.params.id);

    }
    getDriversProfile(id) {

        var urlDriversProfile = $.ajax(`http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`);
        var urlRaces = $.ajax(`http://ergast.com/api/f1/2013/drivers/${id}/results.json`);



        $.when(urlDriversProfile, urlRaces).done(function (data1, data2) {

            console.log("data1", data1);
            console.log("data2", data2);
            this.setState({
                driverProfile: data1[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[0],
                driversRaces: data2[0].MRData.RaceTable.Races,
                isLoading: false
            });

        }.bind(this));
    }


    render() {
        if (this.state.isLoading) {
            return <h2>LOADING</h2>

        }
        console.log(this.state.driverProfile);
        console.log(this.state.driversRaces);
        

        return (
            <div>
                <div className="driverInfo">
                    <div className="driversImg">
                        <img src="" alt="drivers image" />
                        <div>
                        <div className="flag"></div>
                        
                        <p>{this.state.driverProfile.Driver.givenName}</p>
                        <p>{this.state.driverProfile.Driver.familyName}</p>
                       
                        </div>

                    </div>
                    <div className="driversText">
                    <table>
                            <tbody>
                                <tr>
                                    <td>Nationality</td>
                                    <td>{this.state.driverProfile.Driver.nationality}</td>
                                </tr>
                                <tr>
                                    <td>Team:</td>
                                    <td>{this.state.driverProfile.Constructors[0].name}</td>
                                </tr>
                                <tr>
                                    <td>Birth:</td>
                                    <td>{this.state.driverProfile.Driver.dateOfBirth}</td>
                                </tr>
                                <tr>
                                    <td>Biography:</td>
                                    <td><a href={this.state.driverProfile.Driver.url}>ICO</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="driversInfoTable">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="5">Formula 1 2013 Results</th>
                            </tr>
                            <tr>
                                <th>Round</th>
                                <th>Grand Prix</th>
                                <th>Team</th>
                                <th>Grid</th>
                                <th>Race</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.driversRaces.map((item, i) =>{
                            return(
                                <tr key={i}>
                                    <td>{item.round}</td>
                                    <td>{item.raceName}</td>
                                    <td>{item.Results[0].Constructor.name}</td>
                                    <td>{item.Results[0].grid}</td> 
                                    <td>{item.Results[0].position}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}
