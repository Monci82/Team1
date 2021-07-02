import React from "react";
import * as $ from "jquery";
import Flag from "react-flagkit";

export default class DriverDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            driverProfile: [],
            driversRaces: [],
            flags: [],
            isLoading: true
        }

    }


    componentDidMount() {

        this.getDriversProfile(this.props.match.params.id);

    }
    getDriversProfile(id) {

        var urlDriversProfile = $.ajax(`http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`);
        var urlRaces = $.ajax(`http://ergast.com/api/f1/2013/drivers/${id}/results.json`);
        var urlFlags = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");


        $.when(urlDriversProfile, urlRaces, urlFlags).done(function (data1, data2, data3) {

            console.log("data1", data1);
            console.log("data2", data2);
            var flags = JSON.parse(data3[0]);
            this.setState({
                driverProfile: data1[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[0],
                driversRaces: data2[0].MRData.RaceTable.Races,
                flags: flags,
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
                            <div className="flag">
                                {this.state.flags.map((flag, i) => {

                                    if (this.state.driverProfile.Driver.nationality === flag.nationality) {
                                        return (
                                            <Flag key={i} country={flag.alpha_2_code} />
                                        )
                                    }
                                    if (this.state.driverProfile.Driver.nationality === "British" && flag.nationality === "British, UK") {
                                        return (
                                            <Flag key={i} country={flag.alpha_2_code} />
                                        )
                                    }
                                })}
                            </div>

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
                                <th colSpan="2">Grand Prix</th>
                                <th>Team</th>
                                <th>Grid</th>
                                <th>Race</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.driversRaces.map((item, i) => {
                                console.log(item.Circuit.Location.country);
                                console.log((item.Circuit.Location.country).length);
                                return (
                                    <tr key={i}>
                                        <td>{item.round}</td>
                            {/* IF ZASTAVE POČETAK */}
                                        {this.state.flags.map((flag, i) => {
                                           
                                            if (item.Circuit.Location.country === flag.en_short_name) {
                                                return (
                                                    <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                                )
                                            }
                                           if(item.Circuit.Location.country === "UK" && flag.nationality==="British, UK"){
                                               return(
                                                <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                               )
                                            
                                           }
                                           if(item.Circuit.Location.country === "Korea" && flag.nationality==="South Korean"){
                                            return(
                                                <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                               )
                                           }
                                           if(item.Circuit.Location.country === "UAE" && flag.nationality==="Emirati, Emirian, Emiri"){
                                            return(
                                                <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                               )
                                           }
                                           if(item.Circuit.Location.country === "USA" && flag.en_short_name==="United States of America"){
                                               return(<td key={i}><Flag country={flag.alpha_2_code} /></td>)
                                           }
                                        })}
                     {/*IF ZASTAVE KRAJ  */}
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
