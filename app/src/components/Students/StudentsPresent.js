import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../css/Students.css';

// this component is rendered if there are students in the database, 
// this displays the JSX for the StudentCards component or
// a single Student page if a Student's name is clicked on in a StudentCard 
function StudentsPresent(props){
  return (
    <div className="students-container">
      <div className="students-header">
        <h3>All Students</h3>
        <NavLink to="/Students/NewStudentForm"><button>Add Student</button></NavLink>
      </div>
      <div className="studentcard-container">
        {/* PATH: Students -> STUDENTSPRESENT */}
        {props.getStudents()}
      </div>
    </div>
  )
}

export default StudentsPresent;
