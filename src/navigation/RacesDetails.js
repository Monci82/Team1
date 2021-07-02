import React from "react";
import * as $ from "jquery";


export default class RacesDetails extends React.Component{
    constructor(){
        super();

        this.state={
            results: [],
            qualifiers: [],
            isLoading: true
        }


    }

componentDidMount(){
    this.getRacesDetails(this.props.match.params.id);
    console.log(this.props);

}

getRacesDetails(id){
    var urlResults=$.ajax(`https://ergast.com/api/f1/2013/${id}/results.json`);
    var urlQualifiers= $.ajax(`https://ergast.com/api/f1/2013/${id}/qualifying.json`);

    console.log(urlResults);

    $.when(urlResults, urlQualifiers).done(
        function (data1, data2){
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

render(){
if(this.state.isLoading){
    return <h2>Loading</h2>
}

    return(
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



           <div></div>
           <div></div>

        </div>
    )
}

}