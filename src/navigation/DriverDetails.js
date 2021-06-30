import React from "react";

export default class DriverDetails extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <h1>PROMENA</h1>
      </div>
    );
  }
}
