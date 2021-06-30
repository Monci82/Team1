import React from "react";

<<<<<<< HEAD

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




=======
export default class DriverDetails extends React.Component{


    componentDidMount(){
        
        console.log(this.props.match.params.id);
    }
    render(){
        return(
            <div>
<h1>PROMENA</h1>
            </div>
        )
    }
>>>>>>> 3bb633fd1c2296409160f76975387749748031c1
}