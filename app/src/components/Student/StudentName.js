import React from 'react';
import '../../css/Student.css';

// this function returns the JSX to display student name
function StudentName(props){
  //const image = this.props.name;
  const name = props.name;
  return (
    <h1>{name}</h1>
  );
}

export default StudentName;
