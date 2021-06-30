import React from "react";


export default class DriverDetails extends React.Component {
constructor(){
    super();

}


componentDidMount(){
    console.log("componentDidMount");
    console.log(this.props.match.params.id);
}


render(){
    return(
        <div>
            <h1>NA RUTI DRIVERDETAILS</h1>
        </div>
    )
}




}