import React from "react";
import * as $ from "jquery";
import Flag from "react-flagkit";


export default class RacesDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            results: [],
            qualifiers: [],
            flags: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.getRacesDetails(this.props.match.params.id);
        console.log(this.props);

    }

    getRacesDetails(id) {
        var urlResults = $.ajax(`https://ergast.com/api/f1/2013/${id}/results.json`);
        var urlQualifiers = $.ajax(`https://ergast.com/api/f1/2013/${id}/qualifying.json`);
        var urlFlags = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");

        console.log(urlResults);

        $.when(urlResults, urlQualifiers, urlFlags).done(
            function (data1, data2, data3) {
                console.log("data1", data1);
                console.log("data2", data2);
                var flags = JSON.parse(data3[0]);
                this.setState({
                    results: data1[0].MRData.RaceTable.Races,
                    qualifiers: data2[0].MRData.RaceTable.Races[0].QualifyingResults,
                    isLoading: false,
                    flags: flags
                });


            }.bind(this)
        );


    }

    render() {
        console.log(this.state.results[0])
        if (this.state.isLoading) {
            return <h2>Loading</h2>
        }

        return (
            <div>
                <div className="driverInfo">
                    
                    
                    {this.state.flags.map((flag, i) => {
                                           
                                           if (this.state.results[0].Circuit.Location.country === flag.en_short_name) {
                                               return (
                                                   <td className="driverImg" key={i}><Flag country={flag.alpha_2_code} /></td>
                                               )
                                           }
                                          if(this.state.results[0].Circuit.Location.country === "UK" && flag.nationality==="British, UK"){
                                              return(
                                               <td className="driverImg" key={i}><Flag country={flag.alpha_2_code} /></td>
                                              )
                                           
                                          }
                                          if(this.state.results[0].Circuit.Location.country === "Korea" && flag.nationality==="South Korean"){
                                           return(
                                               <td className="driverImg" key={i}><Flag country={flag.alpha_2_code} /></td>
                                              )
                                          }
                                          if(this.state.results[0].Circuit.Location.country === "UAE" && flag.nationality==="Emirati, Emirian, Emiri"){
                                           return(
                                               <td className="driverImg" key={i}><Flag country={flag.alpha_2_code} /></td>
                                              )
                                          }
                                          if(this.state.results[0].Circuit.Location.country === "USA" && flag.en_short_name==="United States of America"){
                                              return(<td className="driverImg" key={i}><Flag country={flag.alpha_2_code} /></td>)
                                          }
                                       })}
                    
                    <p>{this.state.results[0].Circuit.circuitName}</p>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Country:</td>
                                    <td>{this.state.results[0].Circuit.Location.country}</td>

                                </tr>
                                <tr>
                                    <td>Location:</td>
                                    <td>{this.state.results[0].Circuit.Location.locality}</td>

                                </tr>

                                <tr>
                                    <td>Date:</td>
                                    <td>{this.state.results[0].date}</td>

                                </tr>
                                <tr>
                                    <td>Full report:</td>
                                    <td><a href={this.state.results[0].url}>ICO</a></td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>

                    <div className="driversInfoTable">
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan="5">Qualifiying Result</th>

                                </tr>
                                <tr>

                                    <th>Pos</th>
                                    <th colSpan="2">Driver</th>
                                    <th>Team</th>
                                    <th>Best Time</th>


                                </tr>
                            </thead>

                            <tbody>
                                {this.state.qualifiers.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.position}</td>
                                            {this.state.flags.map((flag, i) => {

                                                if (item.Driver.nationality === flag.nationality) {
                                                    return (
                                                        <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                                    )
                                                }
                                                if (item.Driver.nationality === "British" && flag.nationality === "British, UK") {
                                                    return (
                                                        <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                                    )
                                                }
                                                if (item.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                                                    return (
                                                        <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                                    )
                                                }
                                            })}
                                            <td>{item.Driver.familyName}</td>
                                            <td>{item.Constructor.name}</td>
                                            <td>{item.Q1}</td>

                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>


                    <div className="driversInfoTable">

                        <table>
                            <thead>
                                <tr>
                                    <th>Race Results</th>
                                </tr>

                                <tr>
                                    <th>Position</th>
                                    <th>Driver</th>
                                    <th>Team</th>
                                    <th>Results</th>
                                    <th>Points</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.results[0].Results.map((item, i) => {
                                    console.log(item.Time);
                                    return (
                                        <tr key={i}>
                                            <td>{item.position}</td>
                                            {this.state.flags.map((flag, i) => {

                                                if (item.Driver.nationality === flag.nationality) {
                                                    return (
                                                        <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                                    )
                                                }
                                                if (item.Driver.nationality === "British" && flag.nationality === "British, UK") {
                                                    return (
                                                        <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                                    )
                                                }
                                                if (item.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                                                    return (
                                                        <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                                    )
                                                }
                                            })}
                                            <td>{item.Driver.familyName}</td>
                                            <td>{item.Constructor.name}</td>
                                            <td>{item.Time !== undefined ? item.Time.time : ""}</td>
                                            <td>{item.points}</td>

                                        </tr>
                                    )

                                })}

                            </tbody>

                        </table>
                    </div>

                </div>

            </div>
        )
    }

}