import React from "react";
import * as $ from "jquery";


export default class RacesDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            results: [],
            qualifiers: [],
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

        console.log(urlResults);

        $.when(urlResults, urlQualifiers).done(
            function (data1, data2) {
                console.log("data1", data1);
                console.log("data2", data2);

                this.setState({
                    results: data1[0].MRData.RaceTable.Races,
                    qualifiers: data2[0].MRData.RaceTable.Races[0].QualifyingResults,
                    isLoading: false,
                });


            }.bind(this)
        );


    }

    render() {
        // console.log(this.state.results[0].Results[0])
        if (this.state.isLoading) {
            return <h2>Loading</h2>
        }

        return (
            <div>
                <div className="driverInfo">
                    <div className="driverImg"><img src="" alt="conutry flag"></img></div>
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
                                            <td>Flag</td>
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
                                    return (
                                        <tr key={i}>
                                            <td>{item.position}</td>
                                            <td>Flag</td>
                                            <td>{item.Driver.familyName}</td>
                                            <td>{item.Constructor.name}</td>
                                            {/* <td>{item.Time.time}</td> */}
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