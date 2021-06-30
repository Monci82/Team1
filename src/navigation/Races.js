import React from "react";
import * as $ from "jquery";

export default class Races extends React.Component{
    constructor(){
        super();
        this.state = {
            races : []
        }
    }
    componentDidMount(){
        this.getRacesState();
    }
    getRacesState(){
        var url ="http://ergast.com/api/f1/2013/results/1.json";
        $.get(url, (data) => {
            this.setState({races : data.MRData.RaceTable.Races})
            console.log(data);
        })
        
    }
    render (){
        console.log(this.state.races)
        return(
            <div className="mainScreen">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="4">Race Calendar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.races.map((item, i) => {
                            return(
                                <tr key={i}>
                                <td>{item.round}</td>
                                <td>{item.raceName}</td>
                                <td>{item.Circuit.circuitName}</td>
                                <td>{item.date}</td>
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