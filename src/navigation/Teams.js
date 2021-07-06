import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { FlagSpinner } from "react-spinners-kit";

export default class Teames extends React.Component {
  constructor() {
    super();
    this.state = {
      teamsState: [],
      flags: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getTeamPosts();
  }

  getTeamPosts() {
    var url = $.ajax("http://ergast.com/api/f1/2013/constructorStandings.json");
    var urlFlags = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");
    $.when(url, urlFlags).done(function (data1, data2) {
      console.log("data1", data1);
      console.log("data2", data2[0]);
      var flags = JSON.parse(data2[0]);
      this.setState({
        teamsState:
          data1[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
        flags: flags,
        isLoading: false
      });
    }.bind(this));

  }

  render() {
    if (this.state.isLoading) {
      return (
          <div className="spiner">
            <FlagSpinner color={"#333"} />
            </div>
        );}
    console.log(this.state.teamsState);
    return (
      <div>
        <h1>Constructors Championship</h1>
        <table>
          <thead>
            <tr>
              <th colSpan="5">Constructors Championship Standings -2013</th>
            </tr>
          </thead>
          <tbody>
            {this.state.teamsState.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.position}</td>
                  {this.state.flags.map((flag, i) => {

                    if (item.Constructor.nationality === flag.nationality) {
                      return (
                        <td className="flagTable" key={i}><Flag country={flag.alpha_2_code} /></td>
                      )
                    }
                    if (item.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                      return (
                        <td className="flagTable" key={i}><Flag country={flag.alpha_2_code} /></td>
                      )
                    }
                    if (item.Constructor.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                      return (
                        <td className="flagTable" key={i}><Flag country={flag.alpha_2_code} /></td>
                      )
                    }
                  })}
                  <td className="leftBorder">
                    <Link to={`/TeamDetails/${item.Constructor.constructorId}`}>
                      {item.Constructor.name}
                    </Link>
                  </td>
                  <td>
                    <a href={item.Constructor.url}>Details</a>
                  </td>
                  <td>{item.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
