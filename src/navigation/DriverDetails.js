import React from "react";

export default class DriverDetails extends React.Component{


    componentDidMount(){
        
        console.log(this.props.match.params.id);
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}