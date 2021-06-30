import React from "react";
import * as $ from "jquery";

export default class DriverDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            driverProfile: {},
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
                driverProfile: data1[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver,
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

            </div>
        )
    }
}