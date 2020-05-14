import React from 'react';
import '../../css/Campus.css';

// this component displays the address of a campus which is passed in as a prop
function CampusAddress(props){
  //const address = this.props.address;
  const address = props.address;
  return (
    <p>{address}</p>
  );
}

export default CampusAddress;
