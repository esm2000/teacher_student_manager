import React from 'react';
import { NavLink } from 'react-router-dom'
import StudentImage from './StudentImage';
import StudentName from './StudentName';
import StudentDesc from './StudentDesc';
import '../../css/Students.css';

// ADD FUNCTIONALITY
// PROPS
  // ------
  // ------
  // name - student name
  // imageurl - student imageurl
  // gpa - student gpa
  // handleEditClick() - allows for the render of EditCampusForm
  // handleDeleteClick() - allows for the deletion of the campus
  // changeIsSingle() - being passed to StudentCard component
  //                  - tells Campus to render Student component
  // changeSingleInfo() - being passed to StudentCard component
  //                    - passes information for Student component back to Campus component
  // ------
function CampusPresent(props){
  return (
      <div className="container">
        <div className="box box1">
          <div className="item item1">
            <StudentImage imageurl={props.imageurl}/>
          </div>
          <div className="item item2">
            <StudentName name={props.name}/>
            <StudentDesc gpa={props.gpa}/>
            <div className="buttons">
              <button onClick={props.handleEditClick}>Edit</button>
              <button onClick={props.handleDeleteClick}>Delete</button>
            </div>
          </div>
        </div>
        <p>This student is registered to a campus.</p> 
        {/* LIST CAMPUSES THAT STUDENT ARE ENROLLED IN */}
        {/*STUDENT'S CURR CAMPUSES*/}
        {/*DROPDOWN TO ADD NEW CAMPUS*/}
      </div>
  );
}

export default CampusPresent;
