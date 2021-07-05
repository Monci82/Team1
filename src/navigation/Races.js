import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { FlagSpinner } from "react-spinners-kit";

export default class Races extends React.Component {
    constructor() {
        super();
        this.state = {
            races: [],
            flags: [],
            isLoading: true,
        }
    }
    componentDidMount() {
        this.getRacesState();
    }
    getRacesState() {
        var url = $.ajax("http://ergast.com/api/f1/2013/results/1.json");
        var urlFlags = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");

        $.when(url, urlFlags).done(function (data1, data2) {
            console.log("data1", data1);
            console.log("data2", data2[0]);
            var flags = JSON.parse(data2[0]);
            this.setState({
                races: data1[0].MRData.RaceTable.Races,
                flags: flags,
                isLoading: false
            });
        }.bind(this));

    }

    render() {
        if (this.state.isLoading) {
            return (<FlagSpinner size={50} color="#00ff89" />)

        }
        console.log(this.state.races)
        return (
            <div className="mainScreen">
                <h1>Race Calendar</h1>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="7">Race Calendar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.races.map((item, i) => {
                            console.log(item);
                            return (
                                <tr key={i}>
                                    <td>{item.round}</td>
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
                                    <td><Link to={`/RacesDetails/${item.round}`}>{item.raceName}</Link></td>
                                    <td>{item.Circuit.circuitName}</td>
                                    <td>{item.date}</td>
                                    {this.state.flags.map((flag, i) => {

                                        if (item.Results[0].Driver.nationality === flag.nationality) {
                                            return (
                                                <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                            )
                                        }
                                        if (item.Results[0].Driver.nationality === "British" && flag.nationality === "British, UK") {
                                            return (
                                                <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                            )
                                        }
                                        if (item.Results[0].Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                                            return (
                                                <td key={i}><Flag country={flag.alpha_2_code} /></td>
                                            )
                                        }
                                    })}
                                    <td>{item.Results[0].Driver.familyName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}