import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from 'react-flagkit';
import { FlagSpinner } from "react-spinners-kit";

export default class Drivers extends React.Component {
    constructor() {
        super();

        this.state = {
            driversState: [],
            flags: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        this.getPosts();
    }
   
    getPosts() {
        var url = $.ajax("http://ergast.com/api/f1/2013/driverStandings.json");
        var urlFlags= $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");

        $.when(url, urlFlags).done( function(data1, data2)  {
            console.log("data1", data1);
            console.log("data2", data2[0]);
            var flags = JSON.parse(data2[0]);
            this.setState({ 
                driversState: data1[0].MRData.StandingsTable.StandingsLists[0].DriverStandings,
                flags: flags,
                isLoading: false
            });
        }.bind(this));

    }
    
    render() {
        if (this.state.isLoading) {
            return (<FlagSpinner size={50} color="#00ff89" />)

        }
console.log(this.state.flags);
console.log(typeof this.state.flags)
        return (
            <div className="mainScreen">
                <h1>Driver Championship</h1>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="5">Drivers Championshim Standings -2013 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.driversState.map((item, i) => {
                            console.log(item.Driver.nationality)
                            return (
                                <tr key={i}>
                                    <td>{item.position}</td>
                                    {this.state.flags.map((flag, i) =>{

                                        if(item.Driver.nationality === flag.nationality){
                                            return(
                                               <td key={i}><Flag country = {flag.alpha_2_code} /></td>
                                            )
                                        }
                                        if(item.Driver.nationality === "British" && flag.nationality === "British, UK"){
                                            return(
                                               <td key={i}><Flag country = {flag.alpha_2_code} /></td>
                                            )
                                        }
                                        if(item.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic"){
                                            return(
                                               <td key={i}><Flag country = {flag.alpha_2_code} /></td>
                                            )
                                        } 
                                    })}
                                    <td><Link to={`/driverDetails/${item.Driver.driverId}`}>{item.Driver.givenName + " " + item.Driver.familyName}</Link></td>
                                    <td>{item.Constructors[0].name}</td>
                                    <td>{item.points}</td>
                                </tr>
                    )
                        })

                        }

                    </tbody>
                </table>


            </div >
        )
    }
}
