import React, { Component } from "react";
// import Teams from "./Teams";
import * as $ from "jquery";

export default class TeamDetails extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      teamDetails: [],
      isLoading: true,
    };
  }

  // getTeamProfileDetails(idTeam) {
  //   var url = `https://ergast.com/api/f1/2013/constructors/${idTeam}/results.json`;

  //   $.get(url, (data) => {
  //     console.log(data);
  //   });
  // }

  getTeamProfileDetails(idTeam) {
    var urlResults = $.ajax(
      `https://ergast.com/api/f1/2013/constructors/${idTeam}/results.json`
    );
    var urlTeamDetails = $.ajax(
      `http://ergast.com/api/f1/2013/constructors/${idTeam}/constructorStandings.json`
    );

    $.when(urlResults, urlTeamDetails).done(
      function (data1, data2) {
        console.log("data1", data1);
        console.log("data2", data2);
        this.setState({
          results: data1[0].MRData.RaceTable.Races,
          teamDetails:
            data2[0].MRData.StandingsTable.StandingsLists[0]
              .ConstructorStandings[0],
          isLoading: false,
        });
      }.bind(this)
    );
  }

  componentDidMount() {
    this.getTeamProfileDetails(this.props.match.params.id);
    // iz ovoga smo izvadili id gore
    // console.log(this.props);
    // console.log(this.props.match.params.id);
  }
  render() {
    if (this.state.isLoading) {
      return <h2>LOADING</h2>;
    }
    console.log(this.state.results);
    // console.log(this.state.teamDetails.Constructor.constructorId);
    // console.log(this.state.TeamDetails);
    console.log(this.state.results);
    return (
      <div>
        <div className="driverInfo">
          <div className="driversImg">
            <img src="" alt="drivers image" />
            <div>
              <div className="flag"></div>

              <p>{this.state.teamDetails.Constructor.name}</p>
            </div>
          </div>
          <div className="driversText">
            <table>
              <tbody>
                <tr>
                  <td>Country:</td>
                  <td>{this.state.teamDetails.Constructor.nationality}</td>
                </tr>
                <tr>
                  <td>Position:</td>
                  <td>{this.state.teamDetails.position}</td>
                </tr>
                <tr>
                  <td>Points: </td>
                  <td>{this.state.teamDetails.points}</td>
                </tr>
                <tr>
                  <td>History: </td>
                  <td>
                    <a href={this.state.teamDetails.Constructor.url}>ICO</a>
                  </td>
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
                <th>{this.state.results[0].Results[0].Driver.familyName}</th>
                <th>{this.state.results[0].Results[1].Driver.familyName}</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {this.state.results.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.round}</td>
                    <td>{item.Circuit.circuitName}</td>
                    <td>{item.Results[0].position}</td>
                    <td>{item.Results[1].position}</td>
                    <td>
                      {parseInt(item.Results[0].points) +
                        parseInt(item.Results[1].points)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
