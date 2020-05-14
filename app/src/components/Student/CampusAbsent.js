import React from 'react';
import { NavLink } from 'react-router-dom'
import StudentImage from './StudentImage';
import StudentName from './StudentName';
import StudentDesc from './StudentDesc';
import '../../css/Students.css';

// ADD FUNCTIONALITY
// this component is rendered when a student is not enrolled in any campuses
function CampusAbsent(props){
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
        <p>This student is not registered to a campus.</p>
        <div className="box box3">
          <div className="item item3">
            <select>
              <option value="">Select campus...</option>
              <option value="">Campus 1</option>
              <option value="">Campus 2</option>
            </select>
            <NavLink to="/Campus"><button>Add to Campus</button></NavLink>
          </div>
        </div>
      </div>
  );
}

export default CampusAbsent;
