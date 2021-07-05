import React, { Component } from "react";
import * as $ from "jquery";
import Flag from "react-flagkit";
import { FlagSpinner } from "react-spinners-kit";

export default class TeamDetails extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      teamDetails: [],
      flags: [],
      isLoading: true,
    };
  }

  getTeamProfileDetails(idTeam) {
    var urlResults = $.ajax(
      `https://ergast.com/api/f1/2013/constructors/${idTeam}/results.json`
    );
    var urlTeamDetails = $.ajax(
      `http://ergast.com/api/f1/2013/constructors/${idTeam}/constructorStandings.json`
    );
    var urlFlags = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");

    $.when(urlResults, urlTeamDetails, urlFlags).done(
      function (data1, data2, data3) {
        console.log("data1", data1);
        console.log("data2", data2);
        var flags = JSON.parse(data3[0]);
        this.setState({
          results: data1[0].MRData.RaceTable.Races,
          teamDetails:
            data2[0].MRData.StandingsTable.StandingsLists[0]
              .ConstructorStandings[0],
          flags: flags,
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
      return (<FlagSpinner size={50} color="#00ff89" />)

  }
    console.log(this.state.results);
    // console.log(this.state.teamDetails.Constructor.constructorId);
    // console.log(this.state.TeamDetails);
    console.log(this.state.teamDetails.Constructor);
    return (
      <div>
        <div className="driverInfo">
          <div className="driversImg">
            <img src={this.state.teamDetails.Constructor.constructorId === "lotus_f1" ? `../../img/teams/Lotus.png` : `../../img/teams/${this.state.teamDetails.Constructor.constructorId}.png`} alt="drivers image" />
            <div>
              <div className="flag">
                {this.state.flags.map((flag, i) => {

                  if (this.state.teamDetails.Constructor.nationality === flag.nationality) {
                    return (
                      <Flag key={i} country={flag.alpha_2_code} />
                    )
                  }
                  if (this.state.teamDetails.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                    return (
                      <Flag key={i} country={flag.alpha_2_code} />
                    )
                  }
                })}
              </div>

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
                <th colSpan="6">Formula 1 2013 Results</th>
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
                    {this.state.flags.map((flag, i) => {

                      if (item.Circuit.Location.country === flag.en_short_name) {
                        return (
                          <td key={i}><Flag country={flag.alpha_2_code} /></td>
                        )
                      }
                      if (item.Circuit.Location.country === "UK" && flag.nationality === "British, UK") {
                        return (
                          <td key={i}><Flag country={flag.alpha_2_code} /></td>
                        )

                      }
                      if (item.Circuit.Location.country === "Korea" && flag.nationality === "South Korean") {
                        return (
                          <td key={i}><Flag country={flag.alpha_2_code} /></td>
                        )
                      }
                      if (item.Circuit.Location.country === "UAE" && flag.nationality === "Emirati, Emirian, Emiri") {
                        return (
                          <td key={i}><Flag country={flag.alpha_2_code} /></td>
                        )
                      }
                      if (item.Circuit.Location.country === "USA" && flag.en_short_name === "United States of America") {
                        return (<td key={i}><Flag country={flag.alpha_2_code} /></td>)
                      }
                    })}
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
