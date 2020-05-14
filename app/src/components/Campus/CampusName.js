import React from 'react';
import '../../css/Campus.css';

// this component displays the name of a campus which is passed in as a prop
function CampusName(props){
  //const image = this.props.name;
  const name = props.name;
  return (
    <h1>{name}</h1>
  );
}

export default CampusName;
